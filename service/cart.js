const CartModel = require('../model/CartProduct')
var Mongoose = require('mongoose');

module.exports = {
    addCart: (req) => {
        // console.log("req",req);
        return new Promise(async (res, rej) => {
            try {
                let { productImage, productTitle, Price, pincode, quantity, category} = req.body
                console.log("productImage", productImage);
                let userId = req.user.user_id

                let saveData = await CartModel.create({
                    productImage,
                    productTitle,
                    Price,
                    pincode,
                    quantity,
                    category,
                    userId
                })
                if (saveData) {
                    res({ status: 200, data: "New Data added!!" });
                } else {
                    rej({ status: 500, message: "something went wrong!!" });
                }
            } catch (err) {
                console.log("err", err);
                rej({ status: 500, error: err, message: "something went wrong!!" });
            }
        })
    },

    getAllCart: async (req) => {
        return new Promise(async (res, rej) => {
            try {
                let { page, limit, str } = req.query
                console.log("str", str);
                let qry = {};
                page = parseInt(page);
                limit = parseInt(limit);
                  if (str) {
                    qry["$or"] = [{ category: { $regex: str, $options: "i" } }];
                  }
               
                let getData = await CartModel.aggregate([
                    { $match: qry },
                    {
                        $facet: {
                            total_count: [
                                {
                                    $group: {
                                        _id: null,
                                        count: { $sum: 1 },
                                    },
                                },
                            ],
                            result: [
                                {
                                    $project: {
                                        __v: 0,
                                    },
                                },
                                { $sort: { createdAt: -1 } },
                                { $skip: (page - 1) * limit },
                                { $limit: limit },
                            ],
                        },
                    },
                ]);
                getData = getData[0];
                if (getData.result.length > 0) {
                    res({
                        status: 200,
                        data: {
                            total_count: getData.total_count[0].count,
                            result: getData.result,
                        },
                    });
                } else {
                    rej({ status: 404, message: "No data found!!" });
                }
            } catch (err) {
                console.log(err);
                rej({ status: 500, error: err, message: "something went wrong!!" });
            }
        });
    },

    getCartBYId: (_id) => {
        return new Promise(async (res, rej) => {
            try {
                let saveData = await CartModel.findOne({ _id });
                console.log("saveData--->", saveData)
                if (saveData) {
                    res({ status: 200, data: saveData });
                } else {
                    rej({ status: 404, message: "no data found" });
                }
            } catch (err) {
                console.log("error-ssss---------->", err);
                rej({ status: 500, error: err, message: "something went wrong!!" });
            }
        });
    },

    AddedBy: async (req) => {
        try {
            const userId = req.user.user_id;
            const { _id } = req.params;

            const product = await CartModel.findById(_id);
            const userAlreadyLiked = product.addedBy.some((like) => like.user_id.toString() === userId);

            const updateObj = {
                $addToSet: {
                    addedBy: {
                        user_id: userId,
                    },
                },
                $pull: {
                    RemovedBy: {
                        user_id: userId,
                    },
                },
                ...req.body
            };
            if (!userAlreadyLiked) {
                let getData = await CartModel.findByIdAndUpdate(
                    { _id: new Mongoose.Types.ObjectId(_id) },
                    updateObj,
                    {
                        new: true,
                    }
                );

                if (getData) {
                    return { status: 200, data: getData };
                } else {
                    return { status: 404, message: "No data found" };
                }
            } else {
                return { status: 200, data: product };
            }
        } catch (err) {
            console.log("err", err);
            return { status: 500, error: err, message: "Something went wrong!!" };
        }
    },

    RemovedBy: (req) => {
        return new Promise(async (res, rej) => {
            try {
                const userId = req.user.user_id;
                const { _id } = req.params;
                req.body['modifiedBy'] = new Mongoose.Types.ObjectId(userId);

                const product = await CartModel.findById(_id);
                const userAlreadyLiked = product.RemovedBy.some((like) => like.user_id.toString() === userId);
                if (!userAlreadyLiked) {
                    let getData = await CartModel.findByIdAndUpdate(
                        { _id: new Mongoose.Types.ObjectId(_id) },
                        {
                            $addToSet: {
                                RemovedBy: {
                                    user_id: userId,
                                },
                            },
                            $pull: {
                                addedBy: {
                                    user_id: userId,
                                },
                            },
                        },
                        {
                            new: true,
                        }
                    );

                    if (getData) {
                        res({ status: 200, data: getData });
                    } else {
                        rej({ status: 404, message: "no data found" });
                    }
                } else {
                    res({ status: 200, data: product });
                }
            } catch (err) {
                console.log("err", err);
                rej({ status: 500, error: err, message: "something went wrong!!" });
            }
        });
    },

    getAllUserCart: async (req) => {
        return new Promise(async (res, rej) => {
            try {
                let userID = req.user.user_id;
                console.log("userid", userID);
                let { page, limit, str } = req.query
                // console.log("str", str);
                let qry = {};
                // qry.modifiedBy = new Mongoose.Types.ObjectId(userID)
                page = parseInt(page);
                limit = parseInt(limit);
                //   if (str) {
                //     qry['Is_fav'] = { $regex: str, $options: "i" };
                //   }
                //   if (str !== undefined) {
                // qry.Is_fav = true;
                //   }
                console.log("qry..............", qry);
                let getData = await CartModel.aggregate([
                    // { $match: qry },
                    {$match : {'addedBy.user_id': new Mongoose.Types.ObjectId(userID)}},
                    {
                        $facet: {
                            total_count: [
                                {
                                    $group: {
                                        _id: null,
                                        count: { $sum: 1 },
                                    },
                                },
                            ],
                            result: [
                                {
                                    $project: {
                                        __v: 0,
                                    },
                                },
                                { $sort: { createdAt: -1 } },
                                { $skip: (page - 1) * limit },
                                { $limit: limit },
                            ],
                        },
                    },
                ]);
                getData = getData[0];
                if (getData.result.length > 0) {
                    res({
                        status: 200,
                        data: {
                            total_count: getData.total_count[0].count,
                            result: getData.result,
                        },
                    });
                } else {
                    rej({ status: 404, message: "No data found!!" });
                }
            } catch (err) {
                console.log(err);
                rej({ status: 500, error: err, message: "something went wrong!!" });
            }
        });
    },
}