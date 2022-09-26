"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishMessage = void 0;
const kafkaConfig_1 = require("./kafkaConfig");
const publishMessage = async (priceMsg) => {
    // creating a producer instance
    const producer = kafkaConfig_1.kafkaClient.producer();
    console.log("Connecting to kafka broker as producer......");
    await producer.connect();
    console.log("Producer connected to kafka broker!");
    // producing a price
    const res = await producer.send({
        topic: "prices",
        messages: [
            {
                value: JSON.stringify(priceMsg),
            }
        ]
    });
    console.log("Message successfully deliverd to kafka broker");
    await producer.disconnect();
};
exports.publishMessage = publishMessage;
