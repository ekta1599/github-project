const gitmodel = require('../model/model')
module.exports = {
    add: (data) => {
        return new Promise(async (res, rej) => {
            try {
                let saveData = await gitmodel.create(data)
                if (saveData) {
                    res({ status: 200, data: "New Data added!!" });
                } else {
                    rej({ status: 500, message: "something went wrong!!" });
                }
            } catch (err) {
                rej({ status: 500, error: err, message: "something went wrong!!" });
            }
        })
    },
  }