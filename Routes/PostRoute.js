import express from 'express'
import { handleCreatePost, handleDeletePost, handleFollowPost, handleGetAllUserPost, handleGetTimeLine, handleUnFollowPost, handleUpdatePost } from '../Controllers/PostController.js'
import { handleGetPost } from './../Controllers/PostController.js';

let router = express.Router()
//get post due to id user
router.get('/:id', handleGetPost)
router.get('/:id/userPosts', handleGetAllUserPost)
router.delete('/:id', handleDeletePost)
router.post('/create', handleCreatePost)
router.put('/:id', handleUpdatePost)
router.put('/:id/update', handleUpdatePost)
router.put('/:id/like', handleFollowPost)
router.put('/:id/unlike', handleUnFollowPost)
router.get('/:id/timeline', handleGetTimeLine)



export default router