const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  first_name: { type: String, default: null, required:  true },
  stud_id: { type: Number, default: null, required:  true },
  password: { type: String, required:  true },
  english: { type : Number, required : true },
  maths: { type : Number, required : true },
  science: { type : Number,required : true },
  token: { type: String }
});

module.exports = mongoose.model("admin", adminSchema);
