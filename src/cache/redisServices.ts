import { redisClient } from "./redisConfig"

export const saveCachePrice = async (tokenName: string, price: string) => {
    await redisClient.set(tokenName, JSON.stringify(price), {
        "EX": 60 * 30 // saving for 30 mins
    });
}

export const fetchCachePrice = async (tokenName: string):Promise<string|null> => {
    const price = await redisClient.get(tokenName);
    if (!price) {
        return null;
    }
    return JSON.parse(price);
}




