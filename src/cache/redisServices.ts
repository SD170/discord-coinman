import { redisClient } from "./redisConfig"

export const saveCachePrice = async (tokenName:string, price:number) => {
    await redisClient.set(tokenName, JSON.stringify(price));
}

export const fetchCachePrice = async (tokenName:string) => {
    const price = await redisClient.get(tokenName);
    if(!price){
        return null;
    }
    return JSON.parse(price);
}




