require('dotenv').config();
const express = require("express");
const http = require("http");
const {Payment} = require("./controllers/payment.js");

const app = express();
const httpserver = http.createServer(app);
app.use(express.json());
app.post("/webhook/payment",Payment);
httpserver.listen(process.env.PORT||8000, function () {
    console.log(`listening on port ${process.env.PORT}...`);
});