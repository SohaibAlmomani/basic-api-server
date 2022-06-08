"use strict";

require("dotenv").config();
const PORT = process.env.PORT || 4000;
const express = require("express");
const app = express();

// router
const notFoundHandler = require("./error-handlers/404");
const errorHandler = require("./error-handlers/500");
const logger = require("./middleware/logger");
const foodRoutes = require("./routes/ food");
const clothesRoutes = require("./routes/clothes");

// app.use
app.use(express.json());
app.use(foodRoutes);
app.use(clothesRoutes);
app.use(logger);
app.use("*", notFoundHandler);
app.use(errorHandler);

// app.get
app.get("/", (req, res) => {
  res.status(200).send("The server is working successfully :) ");
});

// start listening
function start(PORT) {
  app.listen(PORT, () => {
    console.log(`I am Listening and Running on port ${PORT}`);
  });
}
module.exports = {
  app: app,
  start: start,
};
