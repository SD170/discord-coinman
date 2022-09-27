import redis, { createClient, RedisClientType } from "redis";

// entrypoint to interact with the database.

let redisClient: RedisClientType;

const connectRedis = async () => {
    const { REDISUSER, REDISPASSWORD, REDISHOST, REDISPORT } = process.env;
    const redisUrl = `redis://${REDISUSER}:${REDISPASSWORD}@${REDISHOST}:${REDISPORT}`;
    // const redisUrl = `redis://${REDISHOST}:${REDISPORT}`;
    console.log(redisUrl);
    redisClient = createClient({
        url: redisUrl
    });

    redisClient.on("error", (error) => {
        console.error(`Redis error: ${error}`)
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


export {
    connectRedis,
    redisClient
};