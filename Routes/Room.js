import express from 'express'
import { createChatRoom, getAllUserRoom, getPrivateRoom, checkExistsRoom } from '../Controllers/ChatController.js';

const router = express.Router()
router.post("/", createChatRoom)
router.get("/:userId", getAllUserRoom)
router.get("/:roomId", getPrivateRoom)
router.post("/checkExistsRoom", checkExistsRoom)
export default router