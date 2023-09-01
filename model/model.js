const { Schema, model } = require('mongoose')

let gitmodel = new Schema(
   {
      name: {
        type: String,
        default: null,
      },
      
    },
    { timestamps: true }
  );
  
  module.exports = model("createmodel", gitmodel);