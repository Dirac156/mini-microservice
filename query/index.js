const express = require('express');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/posts", (req, res) => {

})

app.post("/posts", (req, res) => {
    
})

app.listen(4002, () => {
    console.log('Listening on 4002');
})