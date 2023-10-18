const service = require('../service/service')
const {response} = require('../middleware/response')

exports.add = async (req, res) => {
    try {
        let resp = await service.add(req.body);
        if (resp) {
            return response("Success!!", {}, 200, res);
        } else {
            return response("something went wrong!!", {}, 500, res);
        }
    } catch (err) {
        
        return response(err.message, err?.error, err.status, res);
    }
};
exports.update = async (req, res) => {
    try {
        let resp = await service.update(req.params._id, req.body);
        if (resp) {
            return response("data updated successfully!!", resp.data, 200, res);
        } else {
            return response("something went wrong!!", {}, 500, res);
        }

    } catch (err) {
        return response(err.message, err?.error, err.status, res);
    }
};
exports.delete = async (req, res) => {
    try {
        let resp = await service.delete(req.params._id);
        if (resp) {
            return response("Deleted successfully!!", resp.data, 200, res);
        } else {
            return response("Error..!!", err.error, err.status, res);
        }
    } catch (err) {
        return response(err.message, err?.error, err.status, res);
    }
};
exports.byId = async (req, res) => {
    try {
      let resp = await service.byId(req.params._id);
      if (resp) {
        return response("SUCCESS..!!", resp.data, 200, res);
      } else {
        return response("Error..!!", err.error, err.status, res);
      }
    } catch (err) {
      return response(err.message, err?.error, err.status, res);
    }
  };
  exports.getAll = async (req, res) => {
    try {
      if (!req.query.page || !req.query.limit) {
        return response("pagination is require for pagination..!!", {}, 404, res);
      } else {
        let resp = await service.getAll(req.query.page,
            req.query.limit,);
        if (resp) {
          return response("SUCCESS..!!", resp.data, 200, res);
        } else return response("Error..!!", err.error, err.status, res);
      }
    } catch (err) {
      return response(err.message, err?.error, err.status, res);
    }
  };
