const {response} = require('../middleware/response')
const ProductService = require('../service/product')

 exports.AddProduct = async (req, res) => {
  try {
    const resp = await ProductService.AddProduct(req);
    if (resp) {
      return response(resp.message, resp.data, resp.status, res);
    }
  } catch (err) {
    console.log("error-->", err);
    return response(err.message, err?.error, err.status || 500, res);
  }
};
exports.getAllProducts = async (req, res) => {
  try {
      if (!req.query.page || !req.query.limit) {
          return response("pagination is require for pagination..!!", {}, 404, res);
      }
      let resp = await ProductService.getAllProducts(req);
      if (resp) {
        return response("SUCCESS..!!", resp.data, 200, res);
      } else return response("Error..!!", err.error, err.status, res);
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};
exports.getAllPRODUCT = async (req, res) => {
  try {
      if (!req.query.page || !req.query.limit) {
          return response("pagination is require for pagination..!!", {}, 404, res);
      }
      let resp = await ProductService.getAllPRODUCT(req);
      if (resp) {
        return response("SUCCESS..!!", resp.data, 200, res);
      } else return response("Error..!!", err.error, err.status, res);
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};
exports.getProductBYId = async (req, res) => {
  try {
    let resp = await ProductService.getProductBYId(req.params._id);
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
exports.deleteProductByID = async (req, res) => {
  try {
      let resp = await ProductService.deleteProductByID(req.params._id);
      if (resp) {
          return response("Deleted successfully!!", resp.data, 200, res);
      } else {
          return response("Error..!!", err.error, err.status, res);
      }
  } catch (err) {
      return response(err.message, err?.error, err.status, res);
  }
};
exports.getAllSearch = async (req, res) => {
  try {
      if (!req.query.page || !req.query.limit) {
          return response("pagination is require for pagination..!!", {}, 404, res);
      }
      let resp = await ProductService.getAllSearch(req);
      if (resp) {
        return response("SUCCESS..!!", resp.data, 200, res);
      } else return response("Error..!!", err.error, err.status, res);
  } catch (err) {
    return response(err.message, err?.error, err.status, res);
  }
};
// exports.updateProduct = async (req, res) => {
//   try {
//       let resp = await ProductService.updateProduct(req.params._id, req.body);
//       if (resp) {
//           return response("data updated successfully!!", resp.data, 200, res);
//       } else {
//           return response("something went wrong!!", {}, 500, res);
//       }

//   } catch (err) {
//       return response(err.message, err?.error, err.status, res);
//   }
// };
exports.updateProduct = async (req, res) => {
  try {
      let resp = await ProductService.updateProduct(req);
      if (resp) {
          return response("data updated successfully!!", resp.data, 200, res);
      } else {
          return response("something went wrong!!", {}, 500, res);
      }

  } catch (err) {
      return response(err.message, err?.error, err.status, res);
  }
};
exports.likedBy = async (req, res) => {
  try {
      let resp = await ProductService.likedBy(req);
      if (resp) {
          return response("data updated successfully!!", resp.data, 200, res);
      } else {
          return response("something went wrong!!", {}, 500, res);
      }

  } catch (err) {
      return response(err.message, err?.error, err.status, res);
  }
};
exports.DislikedBy = async (req, res) => {
  try {
      let resp = await ProductService.DislikedBy(req);
      if (resp) {
          return response("data updated successfully!!", resp.data, 200, res);
      } else {
          return response("something went wrong!!", {}, 500, res);
      }

  } catch (err) {
      return response(err.message, err?.error, err.status, res);
  }
};