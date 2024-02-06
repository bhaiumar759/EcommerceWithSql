const { User } = require("../config/database");
const http_status_codes = require('http-status-codes');
const { Op } = require("sequelize");


// This function is for User Creation
// +++++++++++++++++++++++++++++++++++++


async function createUser(req, resp, next) {
    try {

        const {
            first_name,
            last_name,
            username,
            email,
            password,

        } = req.body;

        const userCountByEmail = await User.count({
            where: {
                email: email
            }
        });

        const userCountByUserName = await User.count({
            where: {
                username: username
            }
        });

        if (userCountByEmail) {
            return resp.status(http_status_codes.StatusCodes.CONFLICT).json({
                statusCodes: http_status_codes.StatusCodes.CONFLICT,
                isSuccess: false,
                message: "Email is already taken"
            });
        }
        else if (userCountByUserName) {
            return resp.status(http_status_codes.StatusCodes.CONFLICT).json({
                statusCodes: http_status_codes.StatusCodes.CONFLICT,
                isSuccess: false,
                message: "username is already taken"
            });
        }
        else {
            const createUser = await User.create({
                first_name: first_name,
                last_name: last_name,
                username: username,
                email: email,
                password: password,
            });

            return resp.status(http_status_codes.StatusCodes.CREATED).json({
                statusCodes: http_status_codes.StatusCodes.CREATED,
                status: true,
                message: "User Created successfully",
                user: createUser
            });
        }


    } catch (error) {
        return resp.status(http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({
            statusCodes: http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR,
            status: false,
            message: "Internal Server Error"
        })
    }

}


// This function is for getting all Users
// +++++++++++++++++++++++++++++++++++++



async function getAllUsers(req, resp, next) {
    try {
        let userData = await User.findAll({
            order: [["createdAt", "DESC"]]
        });

        if (userData.length === 0) {
            return resp.status(http_status_codes.StatusCodes.NOT_FOUND).json({
                statusCodes: http_status_codes.StatusCodes.NOT_FOUND,
                isSuccess: false,
                message: 'Users data not found'
            });
        } else {
            return resp.status(http_status_codes.StatusCodes.OK).json({
                statusCodes: http_status_codes.StatusCodes.OK,
                isSuccess: true,
                message: "All users fetched successfully",
                users: userData
            });
        }
    } catch (error) {
        return resp.status(http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({
            statusCodes: http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR,
            isSuccess: false,
            message: "Internal server error",
        });
    }
}




// This function is for getting One User
// +++++++++++++++++++++++++++++++++++++


async function getOneUser(req, resp, next) {
    try {
        const userId = req.params.userId;
        const oneUser = await User.findOne({
            where: {
                id: userId
            }
        });

        if (!oneUser) {
            return resp.status(http_status_codes.StatusCodes.NOT_FOUND).json({
                statusCodes: http_status_codes.StatusCodes.NOT_FOUND,
                message: 'User data not found',
                isSuccess: false
            });
        } else {
            return resp.status(http_status_codes.StatusCodes.OK).json({
                statusCodes: http_status_codes.StatusCodes.OK,
                message: 'User data fetched successfully',
                isSuccess: true,
                user: oneUser
            });
        }
    } catch (error) {
        return resp.status(http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({
            statusCodes: http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR,
            message: 'Internal server error',
            isSuccess: false,
        });
    }
}




// This function is for Update Users
// +++++++++++++++++++++++++++++++++++++


async function updateUser(req, resp, next) {

    try {

        const {
            id,
            first_name,
            last_name,
            username,
            email,
            password
        } = req.body;

        const userCountByEmail = await User.count({
            where: {
                [Op.not]: {
                    id: id
                },
                email: email
            }
        });


        const userCountByUserName = await User.count({
            where: {
                [Op.not]: {
                    id: id
                },
                username: username
            }
        });


        if (userCountByEmail) {
            return resp.status(http_status_codes.StatusCodes.CONFLICT).json({
                statusCodes: http_status_codes.StatusCodes.CONFLICT,
                isSuccess: false,
                message: 'Email is already taken by another account'
            });
        }
        else if (userCountByUserName) {
            return resp.status(http_status_codes.StatusCodes.CONFLICT).json({
                statusCodes: http_status_codes.StatusCodes.CONFLICT,
                isSuccess: false,
                message: 'Username is already taken by another account'
            });
        }
        else {

            const updateUser = await User.update({
                first_name: first_name,
                last_name: last_name,
                username: username,
                email: email,
                password: password,
            },
                {
                    where: {
                        id: id
                    }
                }
            );


            const myupdatedUser = await User.findOne({
                where: {
                    id: id
                }
            });

            if (updateUser[0]) {
                return resp.status(http_status_codes.StatusCodes.OK).json({
                    statusCodes: http_status_codes.StatusCodes.OK,
                    isSuccess: true,
                    message: 'User updated successfully',
                    data: myupdatedUser
                });
            }

            else {

                return resp.status(http_status_codes.StatusCodes.OK).json({
                    statusCodes: http_status_codes.StatusCodes.OK,
                    isSuccess: true,
                    message: 'User was not updated',
                    data: myupdatedUser
                });

            }



        }

    } catch (error) {

        return resp.status(http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({
            statusCodes: http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR,
            isSuccess: false,
            message: 'Internal server error',
        });

    }

}



// This function is for Delete Users
// +++++++++++++++++++++++++++++++++++++

async function deleteUser(req, resp, next) {
    try {
        const userId = req.params.userId;
        const user = await User.destroy({
            where: {
                id: userId
            }
        });

        if (!user) {
            return resp.status(http_status_codes.StatusCodes.NOT_FOUND).json({
                statusCodes: http_status_codes.StatusCodes.NOT_FOUND,
                isSuccess: false,
                message: 'User does not found'
            });
        }
        else {
            return resp.status(http_status_codes.StatusCodes.OK).json({
                statusCodes: http_status_codes.StatusCodes.OK,
                isSuccess: true,
                message: 'User deleted successfully'
            });
        }

    } catch (error) {
        return resp.status(http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({
            statusCodes: http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR,
            isSuccess: false,
            message: 'Internal server error'
        });
    }
}


module.exports = {
    createUser,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser
};
