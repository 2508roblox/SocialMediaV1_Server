import Message from "../Models/Message.js"

export const createMessage = async (req, res) => {
    let {
        roomId,
        senderUserId,
        content
    } = req.body
    let newMessage = new Message({
        roomId,
        senderUserId,
        content
    })
    // roomId
    // senderUserId
    // content
    try {
        let message = await newMessage.save()
        res.status(200).json(message)
    } catch (error) {
        res.status(500).json(error)

    }
}
export const getAllMessage = async (req, res) => {

    let allMess = await Message.find({ roomId: req.params.roomId })
    try {

        res.status(200).json(allMess)
    } catch (error) {
        res.status(500).json(error)

    }
}