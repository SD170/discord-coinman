import { kafkaConsumer } from './kafkaConfig';
import { saveCachePrice } from '../cache/redisServices';

export const runConsumer = async () => {

    // kafka consumer start
    const kafkaCon = kafkaConsumer;
    console.log("Connecting to kafka broker as consumer......");
    await kafkaCon.connect();
    console.log("Consumer connected to kafka broker!");

    await kafkaCon.subscribe({
        topic: "prices",
    });

    await kafkaCon.run({
        eachMessage: async (result) => {
            const tokenResStr = result.message.value?.toString()!;
            // saving to redis
            const {tokenName, tokenPrice} = JSON.parse(tokenResStr);
            await saveCachePrice(tokenName!, tokenPrice);;
            console.log(
                `Recieved and saved MSG ${result.message.value} to redis cache`
            );
        }
    });
}