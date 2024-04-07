const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var schema = new Schema({
    id : {type : Number},
    name : {type : String},
    email : {type : String},
    password : {type : String},
    admin : {type : Boolean}
})

const User = mongoose.model("User", schema);
module.exports = User;