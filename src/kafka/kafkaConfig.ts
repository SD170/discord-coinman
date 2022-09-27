
import { Kafka, SASLOptions } from "kafkajs";


import dotenv from "dotenv";
dotenv.config({ path: __dirname + '/../../.env' });

const { CONFLUENT_KEY: username, CONFLUENT_SECRET: password } = process.env;
// console.log(process.env.CONFLUENT_KEY,password);
if (!username || !password) {
    console.log("No key/username and secret/password for kafka, please provide those");
    process.exit(0);
}
const sasl: SASLOptions = { username, password, mechanism: 'plain' }
const ssl = true

// This creates a client instance that is configured to connect to the Kafka broker provided by
// the environment variable KAFKA_BOOTSTRAP_SERVER
export const kafkaClient = new Kafka({
    clientId: 'cm-price',
    brokers: [process.env.KAFKA_BOOTSTRAP_SERVER!],
    ssl,
    sasl
})



  // kafka consumer
  export const kafkaConsumer = kafkaClient.consumer({
    groupId: "group1" // multiple consumers can belong to same group
  });



