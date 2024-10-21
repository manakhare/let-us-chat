import express, { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import Routes from "./routes/index.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { setupSocket } from "./socket.js";
import { createAdapter } from "@socket.io/redis-streams-adapter";
import { instrument } from "@socket.io/admin-ui";
import redis from "./config/redis.config.js";
import { connectKafkaProducer } from "./config/kafka.config.js";
import { consumeMessages } from "./helper.js";


const app: Application = express();
const PORT = process.env.PORT || 7000;

// socket.io server
const server = createServer(app);

// * Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// redis connection
const io = new Server(server, {
  cors: {
    origin: "*"
  }, 
  // adapter: createAdapter(redis)
})

const pubClient = redis;

io.adapter(createAdapter(pubClient));

instrument(io, {
  auth: false,
  mode: "development"
})

setupSocket(io);
export {io};


app.get("/", (req: Request, res: Response) => {
  return res.send("It's working 🙌");
});

//routes
app.use("/api", Routes);

// kafka connection
connectKafkaProducer().catch((err) => {
  console.log("Something went wrong while connecting to Kafka...");
})

consumeMessages(process.env.KAFKA_TOPIC).catch((err) => {
  console.log("Something went wrong while consuming messages. Consumer error is: ", err);
  
}) 

server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
