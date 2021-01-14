const express = require("express");
const bcrypt = require("bcryptjs");
const Users = require("./model");
const { restrict } = require("./middleware");

const router = express.Router();

router.get("/users", restrict(), async (req, res, next) => {
    try {
        res.json(await Users.find())
    } catch (err) {
        next(err)
    }
})

router.post("/users", async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await Users.findBy({ username }).first()

        if (user) {
            return res.status(409).json({
                Message: "Username is already taken"
            })
        }

        const newUser = await Users.add({
            username,
            // hash password with a time complexity of 12
            password: await bcrypt.hash(password, 12)
        })
        
        res.status(201).json(newUser)
    } catch (err) {
        next(err);
    }
})

router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await Users.findBy({ username }).first()

        const validPassword = await bcrypt.compare(password, user.password)
        
        if (!user || !validPassword) {
            return res.status(401).json({
                Message: "Invalid Credentials"
            })
        }

        // generate a new session and send it back to the 
        req.session.user = user

        res.json({
            Message: `Welcome ${user.username}!`
        })
    } catch (err) {
        next(err)
    }
})

module.exports = router;