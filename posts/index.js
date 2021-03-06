const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');

    const newPost = {
        id,
        title: req.body.title,
    }
    posts[id] = newPost;

    await axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: newPost
    });
    res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
    console.log('Received Event', req.body.type);
    res.send({});
});

const PORT = 4000;
const SERVICE_NAME = 'Posts Service';
app.listen(PORT, () => {
    console.log(`${SERVICE_NAME} is listening on ${PORT}`)
});
