const userservice = require('../service/userdetails')
const {response} = require('../middleware/response')

exports.add = async (req, res) => {
  console.log('req',req);
  try {
      let resp = await userservice.add(req);
      if (resp) {
          return response("Success!!", {}, 200, res);
      } else {
          return response("something went wrong!!", {}, 500, res);
      }
  } catch (err) {
      return response(err.message, err?.error, err.status, res);
  }
};
exports.getAll = async (req, res) => {
    try {
        if (!req.query.page || !req.query.limit) {
            return response("pagination is require for pagination..!!", {}, 404, res);
        }
        let resp = await userservice.getAll(req);
        if (resp) {
          return response("SUCCESS..!!", resp.data, 200, res);
        } else return response("Error..!!", err.error, err.status, res);
    } catch (err) {
      return response(err.message, err?.error, err.status, res);
    }
  };
  exports.getbyId = async (req, res) => {
    try {
      let resp = await userservice.getbyId(req.params._id);
      if (resp) {
        return response("SUCCESS..!!", resp.data, 200, res);
      } else {
        return response("Error..!!", err.error, err.status, res);
      }
    } catch (err) {
      return response(err.message, err?.error, err.status, res);
    }
  };
  exports.update = async (req, res) => {
    try {
        let resp = await userservice.update(req.params._id, req.body);
        if (resp) {
            return response("data updated successfully!!", resp.data, 200, res);
        } else {
            return response("something went wrong!!", {}, 500, res);
        }

    } catch (err) {
        return response(err.message, err?.error, err.status, res);
    }
};
