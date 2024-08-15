// import { createHmac } from "crypto";
// import { prisma } from "./lib/prisma.js";
const {createHmac} = require("crypto");

async function Payment(req, res) {
    const hash = createHmac("sha512", process.env.SECRET).update(JSON.stringify(req.body)).digest('hex');
    if (hash === req.headers['x-paystack-signature']) {
        const event = req.body;
        if (event && event.status === "success") {
            await prisma.event.update({
                where: {
                    EventId: event.metadata.eventId
                },
                data: {
                    paid: true
                }
            });
        }
    }
    res.send(200);
}

module.exports = {Payment};