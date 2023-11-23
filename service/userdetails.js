const UserdetailModel = require('../model/userdetail')
const UserModel = require('../model/User')
var Mongoose = require('mongoose');

module.exports = {
    add: (req) => {
        // console.log("req,",req);
        return new Promise(async (res, rej) => {
            try {
                let { first_name, last_name, age, contactNo, country } = req.body

                let userId = req.user.user_id

                let saveData = await UserdetailModel.create({
                    first_name,
                    last_name,
                    age,
                    contactNo,
                    country,
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
    getAll: (req) => {
        return new Promise(async (res, rej) => {
            console.log("req", req.user.user_id);
            const userId = req.user.user_id
            console.log("email", userId);

            try {
                let getData;
                let qry = {};
                let { page, limit } = req.query
                page = parseInt(page);
                limit = parseInt(limit);

                getData = await UserModel.aggregate([
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
    update: (_id, data) => {
        return new Promise(async (res, rej) => {
            try {
                let getData = await UserdetailModel.findByIdAndUpdate(_id, data, { new: true });
                if (getData) {
                    res({ status: 200, data: getData });
                } else {
                    rej({ status: 404, message: "no data found" });
                }
            } catch (err) {
                rej({ status: 500, error: err, message: "something went wrong!!" });
            }
        })
    },
    getbyId: (_id) => {
        return new Promise(async (res, rej) => {
            try {
                let saveData = await UserdetailModel.findOne({ _id });
                // console.log("saveData--->", saveData)
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
}

