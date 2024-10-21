import { Server, Socket } from "socket.io";
import prisma from "./config/db.config.js";
import { produceMessage } from "./helper.js";

interface CustomSocket extends Socket {
    room?: string;
}

export function setupSocket(io: Server) {

    // handshake middleware
    io.use((socket: CustomSocket, next) => {
        const room = socket.handshake.auth.room || socket.handshake.headers.room; 

        if(!room) {
            return next(new Error("Invalid room ID!"))
        }

        socket.room = room

        next();
    })

    // on connection
    io.on("connection", (socket: CustomSocket) => {

        // Join the room
        socket.join(socket.room);

        socket.on("message", async  (data) => {
            // console.log(data);
            
            // subscribe to kafka producer
            await produceMessage(process.env.KAFKA_TOPIC, data);

            // create database entry
            await prisma.chats.create({
                data: data
            })

            socket.to(socket.room).emit("message", data);
        })
        
        socket.on("disconnect", () => {
            console.log("A user has disconnected ", socket.id);
        })


    })
}