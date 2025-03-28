import { Request, Response } from "express"
import prisma from "../config/db.config.js"

class ChatsController {
    // GET chats
    static async index(req: Request, res: Response) {
        const {groupId} = req.params

        // add cursor or pagination
        const chats = await prisma.chats.findMany({
            where: {
                group_id: groupId
            }
        })

        return res.status(200).json({ message: "Chats fetched successfully", data: chats})
    }
}

export default ChatsController