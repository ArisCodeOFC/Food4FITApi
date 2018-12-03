const mysql = require("mysql");
const syncMysql = require("sync-mysql");

const syncConnection = new syncMysql({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_food4fit"
});

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
    
    static getSyncConnection() {
        return syncConnection;
    }
}

module.exports = () => Database;
