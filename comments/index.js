const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
    const comments = commentsByPostId[req.params.id] || [];
    const newComment = {
        id: randomBytes(4).toString('hex'),
        content: req.body.content
    };
    comments.push(newComment);
    commentsByPostId[req.params.id] = comments;
    res.status(201).send(newComment);
});

const PORT = 4001;
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})
