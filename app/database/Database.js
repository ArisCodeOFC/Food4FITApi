const mysql = require("mysql");

class Database {
    static getConnection() {
        return mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "bcd127",
            database: "db_food4fit"
        });
    }
}

module.exports = () => Database;