const {createHmac} = require("crypto");
const { prisma } = require('../lib/prisma.js');

async function Payment(req, res) {
    const hash = createHmac("sha512", process.env.SECRET).update(JSON.stringify(req.body)).digest('hex');
    if(hash === req.headers['x-paystack-signature']) {
        const event = req.body;
        const eventId = event.data.metadata.custom_fields[0].value;
        console.log("Event Id: ",event.data.metadata);
        if(event && event.event.toString() === "charge.success") {
            try{
                const result = await prisma.event.update({
                    where: {
                        EventId: eventId
                    },
                    data: {
                        paid: true
                    }
                });
                console.log(result);
            }catch(error){
                console.log(error);
            }
        }
    }
    res.sendStatus(200);
}
module.exports = {Payment};