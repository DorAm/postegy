const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res) => {
    const event = req.body;

    axios.post('http://localhost:4000/events', event);
    axios.post('http://localhost:4001/events', event);
    axios.post('http://localhost:4002/events', event);

    res.send({status: 'Ok '});
});

const PORT = 4005;
const SERVICE_NAME = 'Event Bus';
app.listen(PORT, () => {
    console.log(`${SERVICE_NAME} is listening on ${PORT}`)
});
