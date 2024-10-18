import { Request, Response } from "express";
import prisma from "../config/db.config.js";


class ChatGroupController {

    // GET ALL
    static async index(req: Request, res: Response) {
        try {
            const user = req.user

            const groups = await prisma.chatGroup.findMany({
                where: {
                    user_id: user.id
                },
                orderBy: {
                    created_at: "desc"
                }
            })

            return res.json({
                data: groups
            })

        } catch (error) {
            return res.status(404).json({ message: "Something went wrong. Please try again!" })
        }
    }

    // GET
    static async show(req: Request, res: Response) {
        try {
            const { id } = req.params

            if (id) {
                const chatGroup = await prisma.chatGroup.findUnique({
                    where: {
                        id: id
                    }
                })
                return res.status(200).json({ data: chatGroup })
            }

            res.status(404).json({ message: "No such group found" });

        } catch (error) {
            return res.status(404).json({ message: "Something went wrong. Please try again!" })
        }
    }

    // POST
    static async store(req: Request, res: Response) {
        try {
            const body = req.body
            const user = req.user

            await prisma.chatGroup.create({
                data: {
                    title: body.title,
                    passcode: body.passcode,
                    user_id: user.id
                }
            })

            return res.status(201).json({ message: "Chat group created successfully!" })

        } catch (error) {
            return res.status(404).json({ message: "Something went wrong. Please try again!" })
        }
    }

    // UPDATE
    static async update(req: Request, res: Response) {
        try {
            const body = req.body
            const { id } = req.params;

            if (id) {
                await prisma.chatGroup.update({
                    data: {
                        title: body.title,
                        passcode: body.passcode
                    },
                    where: {
                        id: id
                    }
                })
                res.status(203).json({ message: "Chat group updated successfully" })
            }

            res.status(404).json({ message: "No such group found! " })
        } catch (error) {
            res.status(404).json({ message: "Something went wrong. Please try again!" })
        }
    }

    // DELETE
    static async destroy(req: Request, res: Response) {
        try {
            const { id } = req.params

            await prisma.chatGroup.delete({
                where: {
                    id: id
                }
            })

            res.status(200).json({ message: "Group chat deleted successfully" })
        } catch (error) {
            res.status(404).json({ message: "Something went wrong. Please try again!" })
        }
    }
}

export default ChatGroupController