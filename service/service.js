const gitmodel = require('../model/model')
module.exports = {
    add: (data) => {
        return new Promise(async (res, rej) => {
            try {
                let saveData = await gitmodel.create(data)
                console.log("savedata",saveData);
                if (saveData) {
                    res({ status: 200, data: saveData});
                } else {
                    rej({ status: 500, message: "something went wrong!!" });
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
  }