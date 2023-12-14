const {response} = require('../middleware/response')
const CartService = require('../service/cart.js')

exports.addCart = async (req, res) => {
    try {
      const resp = await CartService.addCart(req);
      if (resp) {
        return response(resp.message, resp.data, resp.status, res);
      }
    } catch (err) {
      console.log("error-->", err);
      return response(err.message, err?.error, err.status || 500, res);
    }
  };

  exports.getAllCart = async (req, res) => {
    try {
        if (!req.query.page || !req.query.limit) {
            return response("pagination is require for pagination..!!", {}, 404, res);
        }
        let resp = await CartService.getAllCart(req);
        if (resp) {
          return response("SUCCESS..!!", resp.data, 200, res);
        } else return response("Error..!!", err.error, err.status, res);
    } catch (err) {
      return response(err.message, err?.error, err.status, res);
    }
  };

  exports.getCartBYId = async (req, res) => {
    try {
      let resp = await CartService.getCartBYId(req.params._id);
      if (resp) {
        return response("SUCCESS..!!", resp.data, 200, res);
      } else {
        return response("Error..!!", err.error, err.status, res);
      }
    } catch (err) {
      console.log("err",err);
      return response(err.message, err?.error, err.status, res);
    }
  };

  exports.AddedBy = async (req, res) => {
    try {
        let resp = await CartService.AddedBy(req);
        if (resp) {
            return response("data updated successfully!!", resp.data, 200, res);
        } else {
            return response("something went wrong!!", {}, 500, res);
        }
  
    } catch (err) {
        return response(err.message, err?.error, err.status, res);
    }
  };

  exports.RemovedBy = async (req, res) => {
    try {
        let resp = await CartService.RemovedBy(req);
        if (resp) {
            return response("data updated successfully!!", resp.data, 200, res);
        } else {
            return response("something went wrong!!", {}, 500, res);
        }
  
    } catch (err) {
        return response(err.message, err?.error, err.status, res);
    }
  };

  exports.getAllUserCart = async (req, res) => {
    try {
        if (!req.query.page || !req.query.limit) {
            return response("pagination is require for pagination..!!", {}, 404, res);
        }
        let resp = await CartService.getAllUserCart(req);
        if (resp) {
          return response("SUCCESS..!!", resp.data, 200, res);
        } else return response("Error..!!", err.error, err.status, res);
    } catch (err) {
      return response(err.message, err?.error, err.status, res);
    }
  };