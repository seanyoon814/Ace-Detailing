const { initConnection, mongoose, Schema } = require("../services/mongodb");

module.exports = class User {
    id;
    email;
    password;
    admin;

    constructor(id, email, password, admin) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.admin = false;
    }

    schema = new Schema({
        id : {type : Number},
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

        var user = newUser();
    }
}