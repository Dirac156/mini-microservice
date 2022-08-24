const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/events", (req, res) => {
    const event = req.body;

    axios.post("http://localhost:4000/events", event).catch(err => {
        console.log(err);
    });
    axios.post("http://localhost:4001/events", event).catch(err => {
        console.log(err);
    });
    axios.post("http://localhost:4002/events", event).catch(err => {
        console.log(err);
    });

    axios.post("http://localhost:4003/events", event).catch(err => {
        console.log(err);
    });

    res.send({ status: true });

})

app.listen(4005, () => {
    console.log('Listening on Port 4005');
});