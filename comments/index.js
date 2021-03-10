const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const comments = commentsByPostId[req.params.id] || [];
    const newComment = {
        id: randomBytes(4).toString('hex'),
        content: req.body.content
    };
    comments.push(newComment);
    commentsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            ...newComment,
            postId: req.params.id,
        },
    })
    res.status(201).send(newComment);
});

app.post('/events', (req, res) => {
    console.log('Received Event', req.body.type);
    res.send({});
});

const PORT = 4001;
const SERVICE_NAME = 'Comments Service';
app.listen(PORT, () => {
    console.log(`${SERVICE_NAME} is listening on ${PORT}`)
});
