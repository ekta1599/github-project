const ProductModel = require('../model/Product')
var Mongoose = require('mongoose');
const UserModel = require('../model/User')

module.exports = {
    AddProduct: (req) => {
        // console.log("req",req);
        return new Promise(async (res, rej) => {
            try {
                let { productImage, productTitle, Price, Weight } = req.body
                console.log("productImage", productImage);
                let userId = req.user.user_id

                let saveData = await ProductModel.create({
                    productImage,
                    productTitle,
                    Price,
                    Weight,
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
    getAllProducts: (req) => {
        return new Promise(async (res, rej) => {
            console.log("req", req.user.user_id);
            const userId = req.user.user_id
            // console.log("email", email);
            try {
                let getData;
                let getdata;
                let qry = {};
                let { page, limit } = req.query
                page = parseInt(page);
                limit = parseInt(limit);
                let FindData = await ProductModel.findOne({ modifiedBy: userId })
                // console.log("finddata",FindData);
                if (FindData) {
                    let data = await ProductModel.aggregate([
                        { $match: { modifiedBy: { "$nin": [new Mongoose.Types.ObjectId(userId)] } } },
                        {
                            $facet: {
                                total_count: [
                                    {
                                        $group: {
                                            _id: null,
                                            count: { $sum: 1 }
                                        }
                                    }
                                ],
                                result: [
                                    {
                                        $addFields: {
                                            "is_visible": true
                                        }
                                    },
                                    {
                                        $project: {
                                            __v: 0,
                                        }
                                    },
                                    // { $sort: { createdAt: -1 } },
                                    { $skip: (page - 1) * limit },
                                    { $limit: limit }
                                ]
                            }
                        },
                    ]);
                    let Data = await ProductModel.aggregate([
                        { $match: { modifiedBy: { "$in": [new Mongoose.Types.ObjectId(userId)] } } },
                        {
                            $facet: {
                                total_count: [
                                    {
                                        $group: {
                                            _id: null,
                                            count: { $sum: 1 }
                                        }
                                    }
                                ],
                                result: [
                                    {
                                        $project: {
                                            __v: 0,
                                        }
                                    },
                                    // { $sort: { createdAt: -1 } },
                                    { $skip: (page - 1) * limit },
                                    { $limit: limit }
                                ]
                            }
                        },
                    ]);
                    console.log("data", Data);
                    const flatdata = [
                        data[0].result,
                        Data[0].result
                    ]
                    console.log("flatdata", flatdata);
                    getdata = flatdata.flat(Infinity);
                    console.log("getdata", getdata);
                } else {
                    getData = await ProductModel.aggregate([
                        // { $match: { modifiedBy: new Mongoose.Types.ObjectId(userId) } },
                        {
                            $facet: {
                                total_count: [
                                    {
                                        $group: {
                                            _id: null,
                                            count: { $sum: 1 }
                                        }
                                    }
                                ],
                                result: [
                                    {
                                        $addFields: {
                                            "is_visible": true
                                        }
                                    },
                                    {
                                        $project: {
                                            __v: 0,
                                        }
                                    },
                                    // { $sort: { createdAt: -1 } },
                                    { $skip: (page - 1) * limit },
                                    { $limit: limit }
                                ]
                            }
                        },
                    ]);
                }
                // console.log("getdata",getData[0].result.length);
                if (getData) {
                    getData = getData[0]
                }
                if (FindData) {
                    res({ status: 200, data: { result: getdata } });
                } else if (getData.result.length > 0) {
                    res({ status: 200, data: { total_count: getData.total_count[0].count, result: getData.result } });
                }
                else {
                    rej({ status: 404, message: "No data found!!" });
                }
            }
            catch (err) {
                console.log(err)
                rej({ status: 500, error: err, message: "something went wrong!!" });
            }
        });
    },
    getAllPRODUCT: (req) => {
        return new Promise(async (res, rej) => {
            // console.log("req", req.user.user_id);
            // const userId = req.user.user_id
            // console.log("email", email);

            try {
                let getData;
                let qry = {};
                let { page, limit } = req.query
                page = parseInt(page);
                limit = parseInt(limit);

                // let userdata = await UserModel.findOne({ "email": email })
                // console.log("userdata", userdata);
                // if (!userdata) {
                //     rej({ status: 404, message: "No data found!!" })
                // } else {
                getData = await ProductModel.aggregate([
                    // { $match: { userId:new Mongoose.Types.ObjectId(userId) } },
                    {
                        $facet: {
                            total_count: [
                                {
                                    $group: {
                                        _id: null,
                                        count: { $sum: 1 }
                                    }
                                }
                            ],
                            result: [
                                {
                                    $project: {
                                        __v: 0,
                                    }
                                },
                                { $sort: { createdAt: -1 } },
                                { $skip: (page - 1) * limit },
                                { $limit: limit }
                            ]
                        }
                    },
                ]);
                // }
                getData = getData[0]
                if (getData.result.length > 0) {
                    res({ status: 200, data: { total_count: getData.total_count[0].count, result: getData.result } });
                }
                else {
                    rej({ status: 404, message: "No data found!!" });
                }
            }
            catch (err) {
                console.log(err)
                rej({ status: 500, error: err, message: "something went wrong!!" });
            }
        });
    },
    getProductBYId: (_id) => {
        return new Promise(async (res, rej) => {
            try {
                let saveData = await ProductModel.findOne({ _id });
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
    deleteProductByID: (_id) => {
        return new Promise(async (res, rej) => {
            try {
                let saveData = await ProductModel.findByIdAndDelete(_id)
                if (saveData) {
                    res({ status: 200, data: saveData });
                } else {
                    rej({ status: 500, message: "something went wrong!!" });
                }
            } catch (err) {
                rej({ status: 500, error: err, message: "something went wrong!!" });
            }
        })
    },
    getAllSearch: async (req) => {
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
                qry.Is_fav = true;
                //   }
                console.log("qry..............", qry);
                let getData = await ProductModel.aggregate([
                    { $match: qry },
                    {$match : {'likedBy.user_id': new Mongoose.Types.ObjectId(userID)}},
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

    updateProduct: (req) => {
        return new Promise(async (res, rej) => {
            try {
                const userId = req.user.user_id
                const { _id } = req.params
                req.body['modifiedBy'] = new Mongoose.Types.ObjectId(userId)
                let getData = await ProductModel.findByIdAndUpdate({ _id: new Mongoose.Types.ObjectId(_id) }, { $set: req.body },
                    {
                        new: true,
                    });
                if (getData) {
                    res({ status: 200, data: getData });
                } else {
                    rej({ status: 404, message: "no data found" });
                }
            } catch (err) {
                console.log("err", err);
                rej({ status: 500, error: err, message: "something went wrong!!" });
            }
        })
    },

    // likedBy: async (req) => {
    //     try {
    //         const userId = req.user.user_id;
    //         const { _id } = req.params;
    //         req.body['modifiedBy'] = new Mongoose.Types.ObjectId(userId);

    //         const product = await ProductModel.findById(_id);
    //         const userAlreadyLiked = product.likedBy.some((like) => like.user_id.toString() === userId);

    //         if (!userAlreadyLiked) {
    //             let getData = await ProductModel.findByIdAndUpdate(
    //                 { _id: new Mongoose.Types.ObjectId(_id) },

    //                 {
    //                     $addToSet: {
    //                         likedBy: {
    //                             user_id: userId,
    //                         },
    //                     },
    //                     $pull: {
    //                         DislikedBy: {
    //                             user_id: userId,
    //                         },
    //                     },
    //                 },
    //                  { $set: req.body },
    //                 {
    //                     new: true,
    //                 }
    //             );

    //             if (getData) {
    //                 return { status: 200, data: getData };
    //             } else {
    //                 return { status: 404, message: "No data found" };
    //             }
    //         } else {
    //             return { status: 200, data: product };
    //         }
    //     } catch (err) {
    //         console.log("err", err);
    //         return { status: 500, error: err, message: "Something went wrong!!" };
    //     }
    // },

    likedBy: async (req) => {
        try {
            const userId = req.user.user_id;
            const { _id } = req.params;

            const product = await ProductModel.findById(_id);
            const userAlreadyLiked = product.likedBy.some((like) => like.user_id.toString() === userId);

            const updateObj = {
                $addToSet: {
                    likedBy: {
                        user_id: userId,
                    },
                },
                $pull: {
                    DislikedBy: {
                        user_id: userId,
                    },
                },
                ...req.body
            };
            if (!userAlreadyLiked) {
                let getData = await ProductModel.findByIdAndUpdate(
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

    DislikedBy: (req) => {
        return new Promise(async (res, rej) => {
            try {
                const userId = req.user.user_id;
                const { _id } = req.params;
                req.body['modifiedBy'] = new Mongoose.Types.ObjectId(userId);

                const product = await ProductModel.findById(_id);
                const userAlreadyLiked = product.DislikedBy.some((like) => like.user_id.toString() === userId);
                if (!userAlreadyLiked) {
                    let getData = await ProductModel.findByIdAndUpdate(
                        { _id: new Mongoose.Types.ObjectId(_id) },
                        {
                            $addToSet: {
                                DislikedBy: {
                                    user_id: userId,
                                },
                            },
                            $pull: {
                                likedBy: {
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

}
