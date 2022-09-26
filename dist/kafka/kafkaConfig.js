"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kafkaConsumer = exports.kafkaClient = void 0;
const kafkajs_1 = require("kafkajs");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: __dirname + '/../../.env' });
const { CONFLUENT_KEY: username, CONFLUENT_SECRET: password } = process.env;
console.log(process.env.CONFLUENT_KEY, password);
if (!username || !password) {
    console.log("No key/username and secret/password for kafka, please provide those");
    process.exit(0);
}
const sasl = { username, password, mechanism: 'plain' };
const ssl = true;
// This creates a client instance that is configured to connect to the Kafka broker provided by
// the environment variable KAFKA_BOOTSTRAP_SERVER
exports.kafkaClient = new kafkajs_1.Kafka({
    clientId: 'cm-price',
    brokers: [process.env.KAFKA_BOOTSTRAP_SERVER],
    ssl,
    sasl
});
// kafka consumer
exports.kafkaConsumer = exports.kafkaClient.consumer({
    groupId: "group1" // multiple consumers can belong to same group
});
