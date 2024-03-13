module.exports = class User {
    id;
    email;
    password;
    admin;

    constructor(id, email, password) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.admin = false;
    }

    save() {
        
    }
}