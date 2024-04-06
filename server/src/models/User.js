const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var schema = new Schema({
    id : {type : Number},
    name : {type : String},
    email : {type : String},
    password : {type : String},
    admin : {type : Boolean}
})

var newUser = mongoose.model("user", schema, "users");

module.exports = class User {
    id; // to identify user
    name; // to show to other users
    email; // to login
    password; // to authenticate
    admin; // to specify if the user is the admin account

    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.admin = false;
    }

    async save() {
        var db = mongoose.connection;
        db.on("error", console.error.bind(console, "connection error"));

        var user = new newUser({
            id : this.id,
            name : this.name,
            email : this.email,
            password : this.password,
            admin : this.admin
        });

        await user.save();
    }

    static async checkName(name) {
        const user = await newUser.findOne({ name : name });
        return (user != null);
    }

    static async checkEmail(email) {
        const user = await newUser.findOne({ email : email });
        return (user != null);
    }
}

const User = mongoose.model("User", schema);
module.exports = User;