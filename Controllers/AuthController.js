import mongoose from "mongoose";
import Users from "../Models/UserModel.js";
import bcrypt from "bcryptjs"


const handleCreate = async (req, res) => {
    const { username, password, firstname, lastname } = req.body
    let salt = await bcrypt.genSaltSync(10)
    let hashPass = await bcrypt.hashSync(password, salt)
    let oldUser = await Users.find({ username: username })
    try {

        if (!(oldUser.length !== 0)) {
            let newUser = new Users({ username, password: hashPass, firstname, lastname })
            await newUser.save(); // cost times
            res.status(200).json(newUser)
        } else {
            console.log("check", oldUser);
            res.status(400).json("Username have been used")
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}
const handleLogin = async (req, res) => {
    const { username, password } = req.body
    // when body is undefined
    // try catch
    console.log(req.body);
    try {
        let user = await Users.findOne({ username: username })
        // ton thoi gian
        if (user) {
            let chechPass = await bcrypt.compare(password, user.password)

            chechPass ? res.status(200).json(user) : res.status(500).json("Wrong Password")


        } else {
            res.status(404).send(" NotFound")
        }

    } catch (error) {
        res.status(400).res.send(error.name + error.message)
    }



}
const handleGetAllUsers = async (req, res) => {
    let currentUserId = req.params.id
    try {
        let user = await Users.find()
        if (user) {

           let customUsers = user.filter(e => {
                return e._id !== currentUserId
            })
            console.log(customUsers);
            res.status(200).json(customUsers)


        } else {
            res.status(404).json(" NotFound")
        }

    } catch (error) {
        res.status(400).res.json(error.name + error.message)
    }



}
// const handleLogin = async (req, res) => {
//     const { username, password } = req.body
//     let users = await Users.findOne({ username: username })


// }
export {
    handleCreate,
    handleLogin,
    handleGetAllUsers
}