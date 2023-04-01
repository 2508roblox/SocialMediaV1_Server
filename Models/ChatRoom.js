import mongoose from "mongoose";
let ChatRoomSchema = mongoose.Schema({
    members: {
        type: Array,
        required: true

    }


}
    ,
    {
        timestamps: true
    })

let ChatRoom = mongoose.model('chatRoom', ChatRoomSchema)
export default ChatRoom