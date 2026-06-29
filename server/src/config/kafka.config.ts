import { Kafka, logLevel } from "kafkajs";
import { spec } from "node:test/reporters";

const useSasl = Boolean(process.env.KAFKA_KEY && process.env.KAFKA_SECRET);

export const kafka = new Kafka({
  clientId: "let-us-chat",
  brokers: [process.env.KAFKA_BROKER as string],
  ssl: useSasl,
  sasl: useSasl
    ? {
        mechanism: "plain",
        username: process.env.KAFKA_KEY!,
        password: process.env.KAFKA_SECRET!,
      }
    : undefined,
  logLevel: logLevel.ERROR,
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: "chats" });

export const connectKafkaProducer = async () => {
  await producer.connect();
  console.log("Kafka producer connected...");
};
