const express = require("express");
const app = express();
const Sequelize = require("sequelize");
const bodyParser = require("body-parser");
const config = require("./config/config.json");
const cors = require("cors");
const passwordHash = require("password-hash");
var jwt = require("jsonwebtoken");

const routes = require("./routes/appRoutes");

const port = 3030;
const dir = "/home/system12/reactProject/social/src";

const sequelize = new Sequelize("test", "postgres", "abc123", {
  dialect: "postgres",
  host: "localhost"
});

app.listen(port, () => {
  console.log("App running on : ", port);
});

sequelize.authenticate().then(() => {
  console.log("Connected to DB");
});

app.use(cors());
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
routes(app);
