require('dotenv').config();
const express = require("express");
const http = require("http");
const {Payment} = require("./controllers/payment.js")

const app = express();
const httpserver = http.createServer(app);
app.post("/webhook/payment",Payment);

httpserver.listen(process.env.PORT, function () {
    console.log(`listening on port ${process.env.PORT}...`);
});