"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = exports.connectRedis = void 0;
const redis_1 = require("redis");
// entrypoint to interact with the database.
let redisClient;
exports.redisClient = redisClient;
const connectRedis = async () => {
    const { REDISUSER, REDISPASSWORD, REDISHOST, REDISPORT } = process.env;
    const redisUrl = `redis://${REDISUSER}:${REDISPASSWORD}@${REDISHOST}:${REDISPORT}`;
    // const redisUrl = `redis://${REDISHOST}:${REDISPORT}`;
    exports.redisClient = redisClient = (0, redis_1.createClient)({
        url: redisUrl
    });
    redisClient.on("error", (error) => {
        console.error(`Redis error: ${error}`);
        console.log(`redisUrl: ${redisUrl}`);
    });
    redisClient.on("connect", (error) => {
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
        console.log("Redis connected");
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    });
    await redisClient.connect();
};
exports.connectRedis = connectRedis;
