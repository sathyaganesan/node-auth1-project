const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();
const port = process.env.PORT || 3000

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        Message: "Something went wrong",
    })
})

server.listen(port, () => {
    console.log(`Running at http://localhost:${port}`)
})