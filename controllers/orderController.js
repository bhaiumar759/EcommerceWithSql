const { Order, User, Address, Role } = require('../config/database');
const http_status_codes = require('http-status-codes');
const { Op } = require("sequelize");


// This is for creation of the order
// ================================

async function createOrder(req, resp, next) {
    try {
        const {
            tracking_number,
            order_status,
            total,
            userId,
            addressId
        } = req.body;

        // Validate userId and addressId
        if (!userId || !addressId) {
            return resp.status(http_status_codes.StatusCodes.BAD_REQUEST).json({
                statusCodes: http_status_codes.StatusCodes.BAD_REQUEST,
                isSuccess: false,
                message: "userId and addressId are required"
            });
        }

        // Check if the user and address exist
        const user = await User.findByPk(userId);
        const address = await Address.findByPk(addressId);

        if (!user || !address) {
            return resp.status(http_status_codes.StatusCodes.NOT_FOUND).json({
                statusCodes: http_status_codes.StatusCodes.NOT_FOUND,
                isSuccess: false,
                message: "User or Address not found"
            });
        }

        // Create the order
        const newOrder = await Order.create({
            tracking_number: tracking_number,
            order_status: order_status,
            total: total,
            userId: userId,
            addressId: addressId
        });

        return resp.status(http_status_codes.StatusCodes.CREATED).json({
            statusCodes: http_status_codes.StatusCodes.CREATED,
            isSuccess: true,
            message: "Order created successfully",
            data: newOrder
        });
    } catch (error) {
        console.error(error);
        return resp.status(http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({
            statusCodes: http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR,
            isSuccess: false,
            message: "Internal server error",
        });
    }
}




// This is for getting one Id
// ++++++++++++++++++++++++++++

async function getOrderById(req, resp, next) {
    try {
        const { orderId } = req.params;

        // Validate orderId
        if (!orderId || isNaN(parseInt(orderId))) {
            return resp.status(http_status_codes.StatusCodes.BAD_REQUEST).json({
                statusCodes: http_status_codes.StatusCodes.BAD_REQUEST,
                isSuccess: false,
                message: "Invalid orderId provided"
            });
        }

        // Find the order by orderId
        const order = await Order.findByPk(orderId);

        if (!order) {
            return resp.status(http_status_codes.StatusCodes.NOT_FOUND).json({
                statusCodes: http_status_codes.StatusCodes.NOT_FOUND,
                isSuccess: false,
                message: "Order not found"
            });
        }

        return resp.status(http_status_codes.StatusCodes.OK).json({
            statusCodes: http_status_codes.StatusCodes.OK,
            isSuccess: true,
            message: "Order retrieved successfully",
            data: order
        });
    } catch (error) {
        console.error(error);
        return resp.status(http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({
            statusCodes: http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR,
            isSuccess: false,
            message: "Internal server error",
        });
    }
}


// Get all orders
// +++++++++++++++++++

async function getAllOrders(req, resp, next) {
    try {
        // Find all orders
        const orders = await Order.findAll();

        return resp.status(http_status_codes.StatusCodes.OK).json({
            statusCodes: http_status_codes.StatusCodes.OK,
            isSuccess: true,
            message: "All orders retrieved successfully",
            data: orders
        });
    } catch (error) {
        console.error(error);
        return resp.status(http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({
            statusCodes: http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR,
            isSuccess: false,
            message: "Internal server error",
        });
    }
}


// Get order by user Id
// +++++++++++++++++++++++++

async function getOrdersByUserId(req, resp, next) {
    try {
        const { userId } = req.params;

        // Validate userId
        if (!userId || isNaN(parseInt(userId))) {
            return resp.status(http_status_codes.StatusCodes.BAD_REQUEST).json({
                statusCodes: http_status_codes.StatusCodes.BAD_REQUEST,
                isSuccess: false,
                message: "Invalid userId provided"
            });
        }

        // Find all orders for the given userId
        const orders = await Order.findAll({
            where: {
                userId: userId
            }
        });

        return resp.status(http_status_codes.StatusCodes.OK).json({
            statusCodes: http_status_codes.StatusCodes.OK,
            isSuccess: true,
            message: "Orders for the specified userId retrieved successfully",
            data: orders
        });
    } catch (error) {
        console.error(error);
        return resp.status(http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({
            statusCodes: http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR,
            isSuccess: false,
            message: "Internal server error",
        });
    }
}

// This is for updating the order
// ++++++++++++++++++++++++++++++

async function deleteOrderById(req, resp, next) {
    try {
        const { orderId } = req.params;

        // Validate orderId
        if (!orderId || isNaN(parseInt(orderId))) {
            return resp.status(http_status_codes.StatusCodes.BAD_REQUEST).json({
                statusCodes: http_status_codes.StatusCodes.BAD_REQUEST,
                isSuccess: false,
                message: "Invalid orderId provided"
            });
        }

        // Find the order by orderId
        const order = await Order.findByPk(orderId);

        if (!order) {
            return resp.status(http_status_codes.StatusCodes.NOT_FOUND).json({
                statusCodes: http_status_codes.StatusCodes.NOT_FOUND,
                isSuccess: false,
                message: "Order not found"
            });
        }

        // Delete the order
        await Order.destroy({
            where: {
                id: orderId
            }
        });

        return resp.status(http_status_codes.StatusCodes.NO_CONTENT).json({
            statusCodes: http_status_codes.StatusCodes.NO_CONTENT,
            isSuccess: true,
            message: "Order deleted successfully"
        });
    } catch (error) {
        return resp.status(http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({
            statusCodes: http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR,
            isSuccess: false,
            message: "Internal server error",
        });
    }
}



// This is gettin of order on the base of addressId
// ================================================

async function getOrdersByAddressId(req, resp, next) {
    try {
        const { addressId } = req.params;

        // Validate addressId
        if (!addressId || isNaN(parseInt(addressId))) {
            return resp.status(http_status_codes.StatusCodes.BAD_REQUEST).json({
                statusCodes: http_status_codes.StatusCodes.BAD_REQUEST,
                isSuccess: false,
                message: "Invalid addressId provided"
            });
        }


        // Find all orders for the given addressId
        const orders = await Order.findAll({
            where: {
                addressId: addressId
            }
        });

        return resp.status(http_status_codes.StatusCodes.OK).json({
            statusCodes: http_status_codes.StatusCodes.OK,
            isSuccess: true,
            message: "Orders for the specified addressId retrieved successfully",
            data: orders
        });
    } catch (error) {
        console.error(error);
        return resp.status(http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({
            statusCodes: http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR,
            isSuccess: false,
            message: "Internal server error",
        });
    }
}



async function updateRole(req, resp, next) {
    try {
        const userId = req.params.userId;
        const roleId = req.params.roleId;
        // Corrected the parameter name
        if (userId && roleId) {
            const user = await User.findByPk(userId);
            const role = await Role.findByPk(roleId);

            if (user && role) {
                await user.addRole(role);
                return resp.status(http_status_codes.StatusCodes.OK).json({
                    statusCodes: http_status_codes.StatusCodes.OK,
                    isSuccess: true,
                    user: user,
                    role: role
                });
            } else {
                return resp.status(http_status_codes.StatusCodes.NOT_FOUND).json({
                    statusCodes: http_status_codes.StatusCodes.NOT_FOUND,
                    isSuccess: false,
                    message: "User or Role not found"
                });
            }
        } else {
            return resp.status(http_status_codes.StatusCodes.BAD_REQUEST).json({
                statusCodes: http_status_codes.StatusCodes.BAD_REQUEST,
                isSuccess: false,
                message: "Invalid userId or roleId"
            });
        }
    } catch (error) {
        console.error("Error updating role:", error);
        return resp.status(http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({
            statusCodes: http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR,
            isSuccess: false,
            message: "Internal Server Error"
        });
    }
}




module.exports = {
    createOrder,
    updateRole
};
