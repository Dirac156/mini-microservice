const express = require('express');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const posts = {};

/*
posts === {
    'j123j43': {
        id: 'j123j43',
        title: 'post title',
        comments: [
            { id: 'ds3r32d', content: 'comment' }
        ]
    }
}
*/

app.get("/posts", (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;
    const { id } = data;

    switch (type) {
        case "PostCreated":
            const { title } =  data;
            posts[id] = { id, title, comments: []}
            break;
        case "CommentCreated":
            const { content, postId } = data;
            const post = posts[postId];
            post.comments.push({ id, content });
            break;
        default:
            break;
    }
    console.log(posts)
    res.send({})
})

app.post("/posts", (req, res) => {
    
})

app.listen(4002, () => {
    console.log('Listening on 4002');
})