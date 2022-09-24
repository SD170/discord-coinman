"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCachePrice = exports.saveCachePrice = void 0;
const redisConfig_1 = require("./redisConfig");
const saveCachePrice = async (tokenName, price) => {
    await redisConfig_1.redisClient.set(tokenName, JSON.stringify(price), {
        "EX": 60 * 30 // saving for 30 mins
    });
};
exports.saveCachePrice = saveCachePrice;
const fetchCachePrice = async (tokenName) => {
    const price = await redisConfig_1.redisClient.get(tokenName);
    if (!price) {
        return null;
    }
    return JSON.parse(price);
};
exports.fetchCachePrice = fetchCachePrice;
