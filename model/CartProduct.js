const { Schema, model, Types } = require('mongoose')

let CartModel = new Schema(
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
            default: null
        },
        userId: {
            type: Types.ObjectId
        },
        pincode:{
            type: Number,
            default: null
        },
        quantity:{
            type: Number,
            default: null
        },
        category:{
            type:String,
            default:null
        },
        addedBy: [
            {
                user_id: {
                    type: Types.ObjectId,
                    ref: 'User',
                },
            }
        ],

        RemovedBy: [{
            user_id: {
                type: Types.ObjectId,
                ref: 'User',
            },
        }]
    },
    { timestamps: true }
);

module.exports = model("CartModel", CartModel);