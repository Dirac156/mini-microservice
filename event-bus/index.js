const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const events = [];

app.post("/events", (req, res) => {
    const event = req.body;

    events.push(event);

    axios.post("http://posts-clusterip-srv:4000/events", event).catch(err => {
        console.log(err);
    });
    axios.post("http://comments-clusterip-srv:4001/events", event).catch(err => {
        console.log(err);
    // });
    axios.post("http://query-clusterip-srv:4002/events", event).catch(err => {
        console.log(err);
    });

    axios.post("http://moderation-clusterip-srv:4003/events", event).catch(err => {
        console.log(err);
    });

    res.send({ status: true });

});

app.get("/events", (req, res) => {
    res.send(events);
});

app.listen(4005, () => {
    console.log('Listening on Port 4005');
});