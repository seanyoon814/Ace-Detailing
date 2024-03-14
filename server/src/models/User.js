const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = class User {
    id; // to identify user
    name; // to show to other users
    email; // to login
    password; // to authenticate
    admin; // to specify if the user is the admin account

    constructor(id, name, email, password, admin) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.admin = false;
    }

    schema = new Schema({
        id : {type : Number},
        name : {type : String},
        email : {type : String},
        password : {type : String},
        admin : {type : Boolean}
    })

    newUser = mongoose.model("user", schema);

    async save() {
        mongoose.set("strictQuery", false);
        mongoose.connect(uri);
        var db = mongoose.connection;
        db.on("error", console.error.bind(console, "connection error"));
        // TODO:
        var user = newUser();
    }
}