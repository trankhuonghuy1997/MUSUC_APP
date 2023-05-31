const express = require("express");
const route = express.Router();
const authControllers = require("../controllers/auth");

route.get("/", authControllers.getUser);

route.get("/login", authControllers.getLogin);

module.exports = route;
