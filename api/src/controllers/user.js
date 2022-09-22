const { User } = require("../db.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendMail = require('./sendMail');
const { google } = require('googleapis')
const { OAuth2 } = google.auth;
;

const { ACTIVATION_TOKEN_SECRET, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, CLIENT_URL, MAILING_SERVICE_CLIENT_ID, GOOGLE_SECRET, } = process.env;

const client = new OAuth2(MAILING_SERVICE_CLIENT_ID);

const userCtrl = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body

            if (!name || !email || !password)
                return res.status(400).json({ msg: "Please fill in all fields." })

            if (!validateEmail(email))
                return res.status(400).json({ msg: "Invalid emails." })

            const user = await User.findOne({ where: { email: email } })
            if (user) return res.status(400).json({ msg: "This email already exists." })

            if (password.length < 6)
                return res.status(400).json({ msg: "Password must be at least 6 characters." })

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = {
                name, email, password: passwordHash
            }
            console.log(newUser)
            const activation_token = createActivationToken(newUser)

            const url = `${CLIENT_URL}/user/activate/${activation_token}`
            sendMail(email, url, "Verify your email address")


            res.json({ msg: "Register Success! Please activate your email to start." })
        } catch (err) {
            console.log("HOLApeee")
            return res.status(500).json({ msg: err.message })
        }
    },
    activateEmail: async (req, res) => {
        try {
            const { activation_token } = req.body
            const user = jwt.verify(activation_token, ACTIVATION_TOKEN_SECRET)

            const { name, email, password } = user

            const check = await User.findOne({ where: { email: email } })
            if (check) return res.status(400).json({ msg: "This email already exists." })

            const newUser = new User({
                name, email, password
            })

            await newUser.save()

            res.json({ msg: "Account has been activated!" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ where: { email: email } })
            if (!user) return res.status(400).json({ msg: "This email does not exist." })

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({ msg: "Password is incorrect." })
            //   (newUser) createRefreshToken
            const refresh_token = createActivationToken({ id: user.id })
            console.log("refreshtoken:", refresh_token)
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/users/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            })

            res.json({ msg: "Login success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getAccessToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken

            if (!rf_token) return res.status(400).json({ msg: "Please login now!" })

            jwt.verify(rf_token, REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(400).json({ msg: "Please login now!" })

                const access_token = createAccessToken({ id: user.id })
                res.json({ access_token })
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body
            const user = await User.findOne({ where: { email: email } })
            if (!user) return res.status(400).json({ msg: "This email does not exist." })

            const access_token = createAccessToken({ id: user.id })
            const url = `${CLIENT_URL}/user/reset/${access_token}`

            sendMail(email, url, "Reset your password")
            res.json({ msg: "Re-send the password, please check your email." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    resetPassword: async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log(email, password)
            const passwordHash = await bcrypt.hash(password, 12)

            await User.update({ password: passwordHash }, { where: { email: email } })

            res.json({ msg: "Password successfully changed!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }

    },
    getUserInfor: async (req, res) => {
        try {
            const user = await User.findByPk(req.user.id)

            res.json(user)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getUsersAllInfor: async (req, res) => {
        try {
            const users = await User.findAll()

            res.json(users)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/users/refresh_token' })
            return res.json({ msg: "Logged out." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateUser: async (req, res) => {
        try {
            const { name, avatar } = req.body
            await User.update({ name: name, avatar: avatar }, { where: { id: req.user.id } })
            res.json({ msg: "Update Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateUsersRole: async (req, res) => {
        try {
            const { role } = req.body

            await User.update({ role: role }, { where: { id: req.params.id } })

            res.json({ msg: "Update Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteUser: async (req, res) => {
        try {
            await User.destoy({ where: { id: req.params.id } })
            res.json({ msg: "Deleted Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    googleLogin: async (req, res) => {
        try {
            const { name, email, avatar } = req.body

            if (!name || !email)
                return res.status(400).json({ msg: "Please fill in all fields." })

            if (!validateEmail(email))
                return res.status(400).json({ msg: "Invalid email." })

            const user = await User.findOne({ where: { email: email } })
            if (user) return res.status(400).json({ msg: "This email already exists." })


            const newUser = new User({
                name, email, avatar
            })

            await newUser.save()

            console.log(newUser)
            res.json({ msg: "Google register Success!." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }

    }
};

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const createActivationToken = (payload) => { return jwt.sign(payload, ACTIVATION_TOKEN_SECRET, { expiresIn: '5m' }) };
const createAccessToken = (payload) => { return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' }) };
const createRefreshToken = (payload) => { return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' }) };


module.exports = userCtrl;