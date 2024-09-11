import { Router } from "express";
import { deleteMessage, sendMessage } from "./controller/message.js";

export const messageRouter=Router()

messageRouter.post('/:id/send',sendMessage)
messageRouter.get('/:id/delete',deleteMessage)