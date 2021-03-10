const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const {type, data} = req.body;
    if (type === 'PostCreated') {
        const {id, title} = data;
        posts[id] = {id, title, comments: []};
    } else if (type === 'CommentCreated') {
        const {id, content, postId} = data;
        const comment = { id, content };
        if (posts.hasOwnProperty(postId)) {
            posts[postId].comments.push(comment);
        }
    }
    res.send({});
});

const PORT = 4002;
const SERVICE_NAME = 'Query Service';
app.listen(PORT, () => {
    console.log(`${SERVICE_NAME} is listening on ${PORT}`)
});
