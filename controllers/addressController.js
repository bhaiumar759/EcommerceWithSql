const { Address, User } = require("../config/database");
const http_status_codes = require('http-status-codes');
const { Op } = require("sequelize");




// This is for the creation of the address
// ++++++++++++++++++++++++++++++++++++++++


async function createAddress(req, resp, next) {
    try {
        const {
            userId,
            first_name,
            last_name,
            address,
            city,
            country,
            zip_code,
        } = req.body;

        const parsedUserId = parseInt(userId, 10);

        if (isNaN(parsedUserId) || parsedUserId <= 0) {
            return resp.status(http_status_codes.StatusCodes.NOT_FOUND).json({
                statusCodes: http_status_codes.StatusCodes.NOT_FOUND,
                isSuccess: false,
                message: "User id does not exist"
            });
        } else {
            const findUser = await User.findOne({
                where: {
                    id: userId
                },
            });

            if (!findUser) {
                return resp.status(http_status_codes.StatusCodes.NOT_FOUND).json({
                    statusCodes: http_status_codes.StatusCodes.NOT_FOUND,
                    isSuccess: false,
                    message: "User does not exist"
                });
            }

            const userCountByName = await Address.count({
                where: {
                    first_name: first_name,
                    userId: findUser.id
                }
            });

            if (userCountByName) {
                return resp.status(http_status_codes.StatusCodes.CONFLICT).json({
                    statusCodes: http_status_codes.StatusCodes.CONFLICT,
                    isSuccess: false,
                    message: "Address exists already for this user"
                });
            } else {
                const createAddress = await Address.create({
                    first_name: first_name,
                    last_name: last_name,
                    address: address,
                    city: city,
                    country: country,
                    zip_code: zip_code,
                    userId: findUser.id,
                });

                return resp.status(http_status_codes.StatusCodes.OK).json({
                    statusCodes: http_status_codes.StatusCodes.OK,
                    isSuccess: true,
                    message: "Address created successfully",
                    data: createAddress
                });
            }
        }
    } catch (error) {
        return resp.status(http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({
            statusCodes: http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR,
            isSuccess: false,
            message: "Internal server error",
        });
    }
}


// This is for getting address on the base of usrID
//  means all order of one user
// ++++++++++++++++++++++++++++++++++++++++++++++++++++










module.exports = {
    createAddress
};