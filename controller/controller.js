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