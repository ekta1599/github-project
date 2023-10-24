const { Schema, model } = require('mongoose')

let UserdetailModel = new Schema(
    {
        first_name: {
            type: String,
            default: null,
        },
        last_name: {
            type: String,
            default: null
        },
        contactNo: {
            type: Number,
            default:null
        },
        age: {
            type: Number,
            default:null
        },
        country: {
            type: String,
            default:null

        }
    },
    { timestamps: true }
);

module.exports = model("UserdetailModel", UserdetailModel);