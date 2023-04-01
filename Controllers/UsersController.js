
import Users from './../Models/UserModel.js';
import bcrypt from "bcryptjs"
export const handleGetUser = async (req, res) => {
    let id = req.params.id
    console.log(id);
    let user = await Users.findById(id)
    let { password, ...orderDetails } = user?._doc

    try {
        if (user) {
            //hide password
            res.status(200).json(orderDetails)
        } else {
            res.status(404).send("User Not Found")
        }
    } catch (error) {
        res.status(400).send("Check User Id")
    }


}

export const handleUpdateUser = async (req, res) => {
    let id = req.params.id
    console.log(req.body)
    let { currentUserId, currentUserAdminStatus } = req.body
    // change all info
    let salt = await bcrypt.genSaltSync(10)
    // req.body.password = await bcrypt.hashSync(password, salt)
    try {
        if (currentUserId === id || currentUserAdminStatus) {
            let newUpdate = await Users.findByIdAndUpdate(id, req.body, { new: true })
            res.status(200).json(newUpdate)
        } else {
            res.status(403).send("you can only update your own profile ")
        }
    } catch (error) {
        res.status(400).send("Handle Error")
    }
}
export const handleDeleteUser = async (req, res) => {
    let id = req.params.id
    let { currentUserId, currentUserAdminStatus } = req.body
    // change all info
    try {
        if (currentUserId === id || currentUserAdminStatus) {
            await Users.findByIdAndDelete(id)
            res.status(200).send("User Have Deleted")
        } else {
            res.status(403).send("you can only delete your own profile ")
        }
    } catch (error) {
        res.status(400).send("Handle Error")
    }
}
export const handleFollow = async (req, res) => {
    let id = req.params.id

    let { currentUserId } = req.body

    if (currentUserId === id) {
        res.status(403).send("You can't follow yourself")
    } else {
        try {
            let followerUser = await Users.findById(id)
            let followingUser = await Users.findById(currentUserId)
            if (!followerUser.followers.includes(currentUserId)) {
                //error at id = req.params.id
                await Users.findOneAndUpdate({ _id: followerUser.id },
                    { $push: { followers: currentUserId } })

                await Users.findOneAndUpdate({ _id: currentUserId },
                    { $push: { followings: id } })
                res.status(200).send("followed")
            } else {
                res.status(403).send("You have been followed this user")
            }
        } catch (error) {
            res.status(400).send(error)
        }
    }




}
export const handleUnFollow = async (req, res) => {
    let id = req.params.id

    let { currentUserId } = req.body

    if (currentUserId === id) {
        res.status(403).send("You can't Unfollow yourself")
    } else {
        try {
            let UnfollowerUser = await Users.findById(id)
            let UnfollowingUser = await Users.findById(currentUserId)
            if (UnfollowerUser.followers.includes(currentUserId)) {
                //error at id = req.params.id
                await Users.updateOne(UnfollowerUser, {
                    $pull: {
                        followers: currentUserId,
                    },
                });
                await UnfollowingUser.updateOne({
                    $pull: {
                        followings: UnfollowerUser.id,
                    },
                });
                res.status(200).send("unfollowed")
            } else {
                res.status(403).send("You have been unfollowed this user")
            }
        } catch (error) {
            res.status(400).send(error)
        }
    }




}