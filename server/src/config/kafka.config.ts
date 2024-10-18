import { Kafka, logLevel } from 'kafkajs';

export const kafka = new Kafka({
    clientId: 'let-us-chat',
    brokers: [process.env.KAFKA_BROKER],
    ssl: true,
    sasl: {
        mechanism: 'plain',
        username: process.env.KAFKA_KEY,
        password: process.env.KAFKA_SECRET
    },
    logLevel: logLevel.ERROR
})

export const producer = kafka.producer()
export const consumer = kafka.consumer({ "groupId": "chats" })

export const connectKafkaProducer = async () => {
    await producer.connect();
    console.log("Kafka producer connected...");

}