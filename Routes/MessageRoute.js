import express from 'express'
import { createMessage, getAllMessage } from './../Controllers/MessageController.js';

const router = express.Router()
router.post('/', createMessage)
router.get('/:roomId', getAllMessage)
export default router