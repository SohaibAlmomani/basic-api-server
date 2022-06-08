"use strict";

require("dotenv").config();

let PORT = process.env.PORT || 4050;
const server = require("./src/server");

const { db } = require("./src/models/index");

db.sync()
    .then(() => {
        // start();
        server.start(PORT);
    })
    .catch(console.error);