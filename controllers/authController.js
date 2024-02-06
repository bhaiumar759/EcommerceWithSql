const { User } = require("../config/database");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const cookie = require('cookie');
const config = require('../config/config'); // Make sure to have a configuration file with your secret key
const http_status_codes = require('http-status-codes');


// This is for user log in
// =======================

async function logIn(req, resp, next) {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({
            where: { email: email }
        });

        if (!user) {
            return resp.status(http_status_codes.StatusCodes.UNAUTHORIZED).json({
                status: false,
                message: 'Invalid email or password'
            });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return resp.status(http_status_codes.StatusCodes.UNAUTHORIZED).json({
                status: false,
                message: 'Invalid email or password'
            });
        }

        // Generate a JWT for the user
        const token = jwt.sign({ userId: user.id }, config.secretKey, { expiresIn: '1h' });

        // Set the JWT as an HTTP-only cookie
        const cookieOptions = {
            httpOnly: true,
            expires: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour
        };

        resp.setHeader('Set-Cookie', cookie.serialize('token', token, cookieOptions));

        return resp.status(http_status_codes.StatusCodes.OK).json({
            status: true,
            message: 'Login successful',
            user: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                username: user.username,
                email: user.email,
                profile_pic: user.profile_pic,
            },
            token: token
        });
    } catch (error) {
        return resp.status(http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
}


async function logOut(req, resp, next) {
    try {
        // Clear the JWT cookie
        resp.clearCookie('token');
        return resp.status(http_status_codes.StatusCodes.OK).json({
            status: true,
            message: 'Logout successful'
        });
    } catch (error) {
        return resp.status(http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
}



async function forgetPassword(req, resp, next) {

    const { email } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return resp.status(404).json({ message: 'User not found' });
        }

        // Generate and store a reset token for the user
        const resetToken = crypto.randomBytes(20).toString('hex');
        const hashedToken = await bcrypt.hash(resetToken, 10);

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
        await user.save();

        // Send a password reset email to the user with the resetToken
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'bhaiumar7759@gmail.com',
                pass: 'umar.draz37759@',
            },
        });

        const mailOptions = {
            from: 'bhaiumar7759@gmail.com',
            to: user.email,
            subject: 'Password Reset',
            text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
          Please click on the following link, or paste this into your browser to complete the process:\n\n
          http://localhost:3000/reset-password?token=${resetToken}\n\n
          If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };

        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                console.error(error);
                return resp.status(500).json({ message: 'Error sending email' });
            }
            return resp.status(200).json({ message: 'Password reset email sent' });
        });
    } catch (error) {
        console.error(error);
        return resp.status(500).json({ message: 'Internal Server Error' });
    }
};






module.exports = {
    logIn,
    logOut,
    forgetPassword
};