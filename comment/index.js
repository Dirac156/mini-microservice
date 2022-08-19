const express = require("express");
const { randomBytes } = require('crypto');

const app = express();
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

    comments.push({ id: commentId, content });

    commentsByPostsId[req.params.id] = comments;

    res.send(commentsByPostsId[req.params.id]);
});

app.listen(4001, () => {
    console.log("app is listening on port 4001");
})