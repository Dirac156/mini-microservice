const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { randomBytes } = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const commentsByPostsId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostsId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    
    const comments = commentsByPostsId[req.params.id] || [];

    comments.push({ id: commentId, content, status: "pending" });

    commentsByPostsId[req.params.id] = comments;

    axios.post("http://event-bus-srv:4005/events", {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'pending'
        }
    })

    res.send(commentsByPostsId[req.params.id]);
});

app.post("/events", async (req, res) => {
    const { type, data } = req.body;

    if (type === "CommentModerated") {
        const { postId, id, status, content } = data;
        const comments = commentsByPostsId[postId];

        const comment = comments.find(comment => (comment.id === id));

        comment.status = status;

        await axios.post("http://event-bus-srv:4005/events", {
            type: "CommentUpdated",
            data: {
                id,
                postId,
                status,
                content
            }
        })
    }
    res.status(200).json({});
})

app.listen(4001, () => {
    console.log("app is listening on port 4001");
})