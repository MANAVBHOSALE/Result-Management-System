const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  first_name: { type: String, default: null, required:  true },
  stud_id: { type: Number, default: null, required:  true },
  password: { type: String, required:  true },
  result:{
    english:{
        marks : Number,
        totalmarks : Number
    },
    maths:{
        marks : Number,
        totalmarks : Number
    },
    science:{
        marks : Number,
        totalmarks : Number
    }
  },
  token: { type: String }
});

module.exports = mongoose.model("admin", adminSchema);