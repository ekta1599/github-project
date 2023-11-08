const gitmodel = require('../model/model')
module.exports = {
    add: (data) => {
        return new Promise(async (res, rej) => {
            try {
                let saveData = await gitmodel.create(data)
                 console.log("savedata", saveData);
                if (saveData) {
                    res({ status: 200, data: saveData });
                } else {
                    rej({ status: 404, message: "something went wrong!!" });
                }
            } catch (err) {
                rej({ status: 500, error: err, message: "something went wrong!!" });
            }
        })
    },
    update: (_id, data) => {
        return new Promise(async (res, rej) => {
            try {
                let getData = await gitmodel.findByIdAndUpdate(_id, data, { new: true });
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
    delete: (_id) => {
        return new Promise(async (res, rej) => {
            try {
                let saveData = await gitmodel.findByIdAndDelete(_id)
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
    byId: (_id) => {
        return new Promise(async (res, rej) => {
            try {
                let saveData = await gitmodel.findOne({ _id });
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
    getAll: () => {
        return new Promise(async (res, rej) => {
          try {
           
            let getData = await gitmodel.aggregate([
            //   { $match: qry },
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
            console.log(err)
            rej({ status: 500, error: err, message: "something went wrong!!" });
          }
        });
      }
    }