import mongoose from 'mongoose';


const UsersSchame = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    firstname:
    {
        type: String,
        required: true
    },
    lastname:
    {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    profilePicture: String,
    coverPicture: String,
    worksAt: String,
    relationship: String,
    about: String,
    livesin: String,
    followers: [],
    followings: []
    //to save users id

},
    { timestamps: true }
);
const Users = mongoose.model('users', UsersSchame);
export default Users