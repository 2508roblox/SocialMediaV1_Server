import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'
import PostRoute from './Routes/PostRoute.js'
import FileRoute from './Routes/fileUpload.js'
import RoomRoute from './Routes/Room.js'
import MessageRoute from './Routes/MessageRoute.js'
import * as dotenv from 'dotenv'
import cors from 'cors'
import http from 'http';
import { Server } from 'socket.io';

dotenv.config()
const app = express()
app.use(cors())
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(express.static('public/uploads'))

// Kết nối socket.io với server
const server = http.createServer(app);
// server vua dung cho express vua dung cho socket
const io = new Server(server, {
    cors: {
        origin: "https://2508roblox.github.io"
        // cho phep server ket noi dung domain nay de lay thong tin

    }
});
let activeUsers = []
io.on('connection', (socket) => {
    console.log(`User connected with ID ${socket.id}`);
    // add new

    // io.on("sendMess", (data) => {
    socket.on("addUser", (UserId) => {
        console.log(UserId);

        if (activeUsers.filter(user => user.userId === UserId).length === 0) {
            activeUsers.push({
                userId: UserId,
                socketId: socket.id
            })
        }
        io.emit("getUsers", activeUsers)
        console.log(activeUsers);
    })
    socket.on("sendMess", (messData) => {
        console.log("data", messData);
        const user = activeUsers.find((user) => user.userId === messData.otherUserId);
        console.log("Sending from socket to :", messData.otherUserId)
        console.log("Data: ", messData)
        if (user) {
          io.to(user.socketId).emit("receiveMess", messData);
        }
    })

    socket.on('disconnect', () => {
        activeUsers = activeUsers.filter(user => user.socketId !== socket.id)

        console.log(`User disconnected with ID ${socket.id}`);
        io.emit("getUsers", activeUsers)
    });
});

mongoose.connect("mongodb+srv://2508roblox:1234@cluster0.xbagff1.mongodb.net/?retryWrites=true&w=majority",
    { dbName: "SocialMedia", useNewUrlParser: true, useUnifiedTopoLogy: true })
    .then(() => {
        server.listen(process.env.PORT, () => {
            console.log(`listend in ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log(err);
    })

//route
app.use('/auth', AuthRoute)
app.use('/users', UserRoute)
app.use('/post', PostRoute)
app.use('/file', FileRoute)
app.use('/chat', RoomRoute)
app.use('/message', MessageRoute)
//app.use('mainPath', 'secondPath(Router + middleware)')
//app.get('mainPath', middleware)
// app.use ('path', handle: middleware, second path, ...)
// when get users, app.use will connected with AuthRoute file