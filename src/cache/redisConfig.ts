import redis, { createClient, RedisClientType } from "redis";

// entrypoint to interact with the database.

let redisClient: RedisClientType;

const connectRedis = async () => {
    redisClient = createClient();
    
    redisClient.on("error", (error) => console.error(`Redis error: ${error}`));
    
    
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