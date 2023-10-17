const { Schema, model } = require('mongoose')

let gitmodel = new Schema(
   {
      fname: {
        type: String,
        default: null,
      },
      age: {
        type: Number,
        default: null
      },
      email: {
         type: String,
         default:null
      },
      number: {
          type: Number,
          default: null
      },
      gender: {
         type: String,
         default: null,
        enum : ["Male","Female"]
      }
      
    },
    { timestamps: true }
  );
  
  module.exports = model("createmodel", gitmodel);