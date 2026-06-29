import { Server, Socket } from "socket.io";
import { produceMessage } from "./helper.js";

interface CustomSocket extends Socket {
  room?: string;
}

export function setupSocket(io: Server) {
  // handshake middleware
  io.use((socket: CustomSocket, next) => {
    const room = socket.handshake.auth.room || socket.handshake.headers.room;

    if (!room) {
      return next(new Error("Invalid room ID!"));
    }

    socket.room = room;

    next();
  });

  // on connection
  io.on("connection", (socket: CustomSocket) => {
    const room = socket.room;

    if (!room) {
      return socket.disconnect(true);
    }

    // Join the room
    socket.join(room);

    socket.on("message", async (data) => {
      // subscribe to kafka producer; the consumer (helper.ts) persists to the DB
      await produceMessage(process.env.KAFKA_TOPIC!, data);

      socket.to(room).emit("message", data);
    });

    socket.on("disconnect", () => {
      console.log("A user has disconnected ", socket.id);
    });
  });
}
