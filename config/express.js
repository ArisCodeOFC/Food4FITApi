const express = require("express");
const bodyParser = require("body-parser");
const load = require("express-load");

module.exports = () => {
    const app = express();
    app.use(bodyParser.json());
    load("routes", {cwd: "app"}).then("database").then("service").into(app);
    return app;
}