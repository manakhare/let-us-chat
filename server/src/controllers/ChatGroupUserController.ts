import { Request, Response } from "express";
import prisma from "../config/db.config.js";

interface GroupUserType {
    name: string;
    group_id: string;
}

class ChatGroupUserController {

    // GET GROUP CHAT USERS
    static async index(req: Request, res: Response) {
        try {
            const { group_id } = req.query;
            
            const users = await prisma.chatGroupUsers.findMany({
                where: {
                    group_id: group_id as string
                }
            })

            return res.status(200).json({message: "Group chat users' data fetched successfully", data: users})

        } catch (error) {
            return res.status(404).json({ message: "Something went wrong. Please try again!" })
        }
    }

    // POST: CREATE GROUP CHAT USER
    static async store(req: Request, res: Response) {
        try {
            const body: GroupUserType = req.body;

            const user = await prisma.chatGroupUsers.create({
                data: body
            })
            return res.status(201).json({ message: "User added successfully", data: user})
        } catch (error) {
            return res.status(404).json({ message: "Something went wrong. Please try again!" })
        }
    }


}

export default ChatGroupUserController;