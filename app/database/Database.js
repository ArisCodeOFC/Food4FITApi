const mysql = require("mysql");

class Database {
    static getConnection() {
        return mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "1234",
            database: "db_food4fit"
        });
    }
}

module.exports = () => Database;