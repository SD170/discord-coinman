import { kafkaClient } from "./kafkaConfig";

type priceMsgType = {
    tokenName:string,
    tokenPrice:string
}

export const publishMessage = async (priceMsg:priceMsgType) => {
    // creating a producer instance
    const producer = kafkaClient.producer();
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
}