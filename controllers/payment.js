const {createHmac} = require("crypto");
const { prisma } = require('../lib/prisma.js');

async function Payment(req, res) {
    const hash = createHmac("sha512", process.env.SECRET).update(JSON.stringify(req.body)).digest('hex');
    console.log(hash === req.headers['x-paystack-signature'])
    if(hash === req.headers['x-paystack-signature']) {
        const event = req.body;
        const eventId = event.data.metadata.custom_fields[0].value;
        console.log(event.event)
        if(event && event.event.toString() === "charge.success") {
            await prisma.event.update({
                where: {
                    EventId: eventId
                },
                data: {
                    paid: true
                }
            });
        }
    }
    res.sendStatus(200);
}
module.exports = {Payment};