const { Schema, model, Types } = require('mongoose')

let ProductModel = new Schema(
    {
        productImage: {
            type: String,
            default: null,
        },
        productTitle: {
            type: String,
            default: null
        },
        Price: {
            type: Number,
            default:null
        },
        Weight: {
            type: Number,
            default:null
        },
        Is_fav: {
            type: Boolean,
            default:false,
            enum:[true,false]
        },
        userId:{
            type:Types.ObjectId
        }
    },
    { timestamps: true }
);

module.exports = model("ProductModel", ProductModel);