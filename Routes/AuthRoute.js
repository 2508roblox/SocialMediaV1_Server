import express from 'express'
import { handleCreate, handleGetAllUsers, handleLogin } from '../Controllers/AuthController.js'

var router = express.Router()

router.post('/register', handleCreate)
router.post('/login', handleLogin)
router.get('/allUser/:id', handleGetAllUsers)

//get
//post => create new data
//put => update some data
//delete
// post moi truyen body dc

export default router