const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session")

const Users = require("./users/router");
const Welcome = require("./users/welcome");

const server = express();
const port = process.env.PORT || 3000

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session({
    resave: false, // avoid creating sessions that have not changed.
    saveUninitialized: false, //GDPR laws against setting cookies automatically
    secret: "keep it secret, keep it safe", //cryptographically sign the cookies.
}))

server.use(Users);
server.use(Welcome);

server.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        Message: "Something went wrong",
    })
})

server.listen(port, () => {
    console.log(`Running at http://localhost:${port}`)
})