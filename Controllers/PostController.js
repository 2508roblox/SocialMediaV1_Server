import Users from '../Models/UserModel.js';
import PostModel from './../Models/PostModel.js';


export const handleGetPost = async (req, res) => {
    try {
        let id = req.params.id

        let PostUser = await PostModel.findById(id)
        res.status(200).json(PostUser)
    } catch (error) {
        res.status(400).json("Check your UserId")
    }
}
export const handleCreatePost = async (req, res) => {
    let { userId } = req.body
    try {
        let newPost = await new PostModel(req.body)
        await newPost.save()
        res.status(200).json(newPost)

    } catch (error) {
        res.status(400).json("Check userId")
    }
}
export const handleDeletePost = async (req, res) => {
    let postId = req.params.id
    try {
        const getPost = await PostModel.findById(postId)
        await PostModel.deleteOne(getPost)
        res.status(200).json("Post deleted")

    } catch (error) {
        res.status(400).json("Check userId")
    }
}
export const handleUpdatePost = async (req, res) => {
    let postId = req.params.id
    let { currentUserId } = req.body
    try {

        let post = await PostModel.findById(postId)
        if (currentUserId === post.userId) {
            const update = await PostModel.findByIdAndUpdate(postId, req.body, { new: true })

            res.status(200).json(update)
        } else {
            res.status(403).json("You can only update your own post ")
        }


    } catch (error) {
        res.status(400).json("Check userId")
    }
}
export const handleFollowPost = async (req, res) => {
    let postId = req.params.id
    let { currentUserId } = req.body
    try {
        let post = await PostModel.findById(postId)
        if (!post.likes.includes(currentUserId)) {
            await post.updateOne({
                $push: {
                    likes: currentUserId
                }
            })
            res.status(200).json("Followed")
        } else {
            res.status(403).json("you have been follow this post ")
        }
    } catch (error) {
        res.status(400).json("Check userId")
    }
}

export const handleUnFollowPost = async (req, res) => {
    let postId = req.params.id
    let { currentUserId } = req.body
    try {
        let post = await PostModel.findById(postId)
        if (post.likes.includes(currentUserId)) {
            await post.updateOne({
                $pull: {
                    likes: currentUserId
                }
            })
            res.status(200).json("UnFollowed")
        } else {
            res.status(403).json("you don't like this post before ")
        }
    } catch (error) {
        res.status(400).json("Check userId")
    }
}

export const handleGetTimeLine = async (req, res) => {
    let Id = req.params.id
    var allPost = []
    try {
        let userGetTimeLine = await Users.findById(Id)
        let userPost = await PostModel.find({ userId: Id })
        allPost.push(...userPost)



        for (let index = 0; index < userGetTimeLine.followings.length; index++) {
            let otherPost = await PostModel.find({ userId: userGetTimeLine.followings[index] })
            console.log("loop: " + userGetTimeLine.followings[index])
            console.log(otherPost);
            allPost.push(...otherPost)

        }


        res.status(200).json(allPost)
    } catch (error) {
        res.status(400).json("Check userId")
    }
}
export const handleGetAllUserPost = async (req, res) => {
    let Id = req.params.id
    var allPost = []
    try {
        let userGetTimeLine = await Users.findById(Id)
        let userPost = await PostModel.find({ userId: Id })
        allPost.push(...userPost)






        res.status(200).json(allPost)
    } catch (error) {
        res.status(400).json("Check userId")
    }
}
