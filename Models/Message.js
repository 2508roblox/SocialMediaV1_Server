import mongoose from "mongoose";

let MessageSchema = mongoose.Schema({
    roomId: {
        type: String,
        required: true
    },
    senderUserId: {
        type: String,
        required: true
    },
    content: {
        type: String
    }
},
    { timestamps: true })
const Message = mongoose.model("message", MessageSchema)
export default Message