const { Product } = require("../config/database");
const http_status_codes = require('http-status-codes');
const { Op, where } = require("sequelize");

// This is for the creation of the product
// +++++++++++++++++++++++++++++++++++++++++


async function createProduct(req, resp, next) {

    try {

        const {
            name,
            slug,
            description,
            price,
            picture,
            stock,
        } = req.body;

        const productCountByName = await Product.count({
            where: {
                name: name
            }
        });

        if (productCountByName) {
            return resp.status(http_status_codes.StatusCodes.CONFLICT).json({
                statusCodes: http_status_codes.StatusCodes.CONFLICT,
                isSuccess: false,
                message: "Product name exist already"
            });
        }

        const createdProduct = await Product.create({
            name: name,
            slug: slug,
            description: description,
            price: price,
            picture: picture,
            stock: stock,
        });

        return resp.status(http_status_codes.StatusCodes.OK).json({
            statusCodes: http_status_codes.StatusCodes.OK,
            isSuccess: false,
            message: "Product created successfully",
            data: createdProduct
        });


    } catch (error) {

        return resp.status(http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({
            statusCodes: http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR,
            isSuccess: false,
            message: "Internal server error",
            error: error
        });
    }

}



// This is for the geting all products
// +++++++++++++++++++++++++++++++++++++++++


async function getAllProducts(req, resp, next) {
    try {
        const allProducts = await Product.findAll();
        if (allProducts.length === 0) {
            return resp.status(http_status_codes.StatusCodes.NOT_FOUND).json({
                statusCodes: http_status_codes.StatusCodes.NOT_FOUND,
                isSuccess: false,
                message: "Product data does not found"
            });
        }
        else {
            return resp.status(http_status_codes.StatusCodes.OK).json({
                statusCodes: http_status_codes.StatusCodes.OK,
                isSuccess: false,
                message: "Product data fetched successfully",
                data: allProducts
            });
        }

    } catch (error) {
        return resp.status(http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({
            statusCodes: http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR,
            isSuccess: false,
            message: "Internal server error"
        });
    }

}



// This is for the geting one products
// +++++++++++++++++++++++++++++++++++



async function getOneProduct(req, resp, next) {
    try {

        const productId = req.params.productId;

        const oneProduct = await Product.findOne({
            where: {
                id: productId
            }
        });

        if (!oneProduct) {
            return resp.status(http_status_codes.StatusCodes.NOT_FOUND).json({
                isSuccess: false,
                statusCodes: http_status_codes.StatusCodes.NOT_FOUND,
                message: "User does not found"
            });
        }
        else {
            return resp.status(http_status_codes.StatusCodes.OK).json({
                isSuccess: true,
                statusCodes: http_status_codes.StatusCodes.OK,
                message: "User found successfully",
                data: oneProduct
            });

        }

    } catch (error) {
        return resp.status(http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({
            isSuccess: true,
            statusCodes: http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Internal server error"
        });
    }
}


// This is for the geting one products
// +++++++++++++++++++++++++++++++++++


async function deleteProduct(req, resp, next) {
    try {

        const productId = req.params.productId;

        const oneProduct = await Product.destroy({
            where: {
                id: productId
            }
        });

        if (!oneProduct) {
            return resp.status(http_status_codes.StatusCodes.NOT_FOUND).json({
                isSuccess: false,
                statusCodes: http_status_codes.StatusCodes.NOT_FOUND,
                message: "Product does not found"
            });
        }
        else {
            return resp.status(http_status_codes.StatusCodes.OK).json({
                isSuccess: true,
                statusCodes: http_status_codes.StatusCodes.OK,
                message: "Product deleted successfully",
            });

        }

    } catch (error) {
        return resp.status(http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({
            isSuccess: true,
            statusCodes: http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Internal server error"
        });
    }
}



// This is for the geting one products
// +++++++++++++++++++++++++++++++++++


async function updateProduct(req, resp, next) {
    try {
        const {
            id,
            name,
            slug,
            description,
            price,
            picture,
            stock,
        } = req.body;


        const productCountByName = await Product.count({
            where: {
                [Op.not]: {
                    id: id
                },
                name: name
            }
        });

        if (productCountByName) {
            return resp.status(http_status_codes.StatusCodes.CONFLICT).json({
                isSuccess: false,
                statusCodes: http_status_codes.StatusCodes.CONFLICT,
                message: "Product name exist already",
            });
        }
        else {
            const updateProduct = await Product.update({
                name: name,
                slug: slug,
                description: description,
                price: price,
                picture: picture,
                stock: stock,
            },
                {
                    where: {
                        id: id
                    }
                });

            const updatedProduct = await Product.findOne({
                where: {
                    id: id
                }
            });
            if (updateProduct[0]) {
                return resp.status(http_status_codes.StatusCodes.OK).json({
                    isSuccess: true,
                    statusCodes: http_status_codes.StatusCodes.OK,
                    message: "Product updated successfully",
                    data: updatedProduct
                });
            }

            else {
                return resp.status(http_status_codes.StatusCodes.OK).json({
                    statusCodes: http_status_codes.StatusCodes.OK,
                    isSuccess: true,
                    message: 'Product was not updated',
                    data: updatedProduct
                });
            }
        }

    } catch (error) {
        return resp.status(http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({
            isSuccess: false,
            statusCodes: http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
        });
    }

}








module.exports = {
    createProduct,
    getAllProducts,
    getOneProduct,
    deleteProduct,
    updateProduct
};
