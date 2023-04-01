
import ChatRoom from './../Models/ChatRoom.js';

export const createChatRoom = async (req, res) => {
    let NewRoom = new ChatRoom({
        members: [req.body.senderId, req.body.receiverId]
    })
    try {
        let result = await NewRoom.save()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)

    }
}
export const getAllUserRoom = async (req, res) => {
    console.log(req.params.userId);
    let allRoom = await ChatRoom.find({
        members: { $in: [req.params.userId] }
    })

    try {

        res.status(200).json(allRoom)
    } catch (error) {
        res.status(500).json(error)

    }
}
export const checkExistsRoom = async (req, res) => {
   
    let allRoom = await ChatRoom.find({
        members: { $all: [req.body.receiverId,req.body.senderId ] }
    })

    try {

        res.status(200).json(allRoom)
    } catch (error) {
        res.status(500).json(error)

    }
}
export const getPrivateRoom = async (req, res) => {
    let privateRoom = await ChatRoom.findOne({
        _id: mongoose.Types.ObjectId(req.params.roomId)
    })
    try {

        res.status(200).json(privateRoom)
    } catch (error) {
        res.status(500).json(error)

    }
}