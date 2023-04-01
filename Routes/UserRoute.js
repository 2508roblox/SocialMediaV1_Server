import express from 'express'
import { handleDeleteUser, handleFollow, handleGetUser, handleUnFollow, handleUpdateUser } from './../Controllers/UsersController.js';
const router = express.Router()

router.get('/', (req, res) => {
    res.send("User")
})
router.get('/:id', handleGetUser)
router.post('/:id', handleUpdateUser)
router.delete('/:id', handleDeleteUser)
router.put('/:id/follow', handleFollow)
router.put('/:id/unfollow', handleUnFollow)

export default router