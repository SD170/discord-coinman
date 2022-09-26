"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runConsumer = void 0;
const kafkaConfig_1 = require("./kafkaConfig");
const redisServices_1 = require("../cache/redisServices");
const runConsumer = async () => {
    // kafka consumer start
    const kafkaCon = kafkaConfig_1.kafkaConsumer;
    console.log("Connecting to kafka broker as consumer......");
    await kafkaCon.connect();
    console.log("Consumer connected to kafka broker!");
    await kafkaCon.subscribe({
        topic: "prices",
    });
    await kafkaCon.run({
        eachMessage: async (result) => {
            const tokenResStr = result.message.value?.toString();
            // saving to redis
            const { tokenName, tokenPrice } = JSON.parse(tokenResStr);
            await (0, redisServices_1.saveCachePrice)(tokenName, tokenPrice);
            ;
            console.log(`Recieved and saved MSG ${result.message.value} to redis cache`);
        }
    });
};
exports.runConsumer = runConsumer;
