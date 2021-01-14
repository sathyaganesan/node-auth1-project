const Users = require("./model");
const bcrypt = require("bcryptjs");

function restrict() {
    //  This middleware function should restrict routes to authorized user only.
    //  It should get the username and password from the request header
    return async (req, res, next) => {
        const authError = {
            Message: "Invalid Credentials"
        }
        try {
            //  make sure the values aren't empty
            // const { username, password } = req.headers;
            // if (!username || !password) {
            //     return res.status(401).json(authError)
            // }

            // // make sure the user exists in the database
            // const user = await Users.findBy({ username }).first()
            // if (!user) {
            //     return res.status(401).json(authError)
            // }

            // // make sure the password is valid
            // const passwordValid = await bcrypt.compare(password, user.password)
            // if (!passwordValid) {
            //     return res.status(401).json(authError)
            // }

            if (!req.session || !req.session.uer) {
                return res.status(401).json(authError)
            }

            // We're authorized by this point
            next()
        } catch (err){
        next(err)
        }
    }
}

module.exports = {
    restrict
}