require('dotenv').config();
const express = require("express");
const http = require("http");
const {Payment} = require("./controllers/payment.js");
const { prisma } = require('./lib/prisma.js');

const app = express();
const httpserver = http.createServer(app);
app.post("/webhook/payment",Payment);
app.get("/events",async function(req,res){
    const results = await prisma.event.findMany({});
    res.json({results});
})
httpserver.listen(process.env.PORT||8000, function () {
    console.log(`listening on port ${process.env.PORT}...`);
});