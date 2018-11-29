const mysql = require("mysql");
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_food4fit"
});

class Database {
    static getConnection() {
        return pool;
    }
}

module.exports = () => Database;