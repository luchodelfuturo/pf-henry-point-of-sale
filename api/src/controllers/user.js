const { User } = require("../db.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendMail = require('./sendMail');
const {google} = require('googleapis')
const {OAuth2} = google.auth;

const { ACTIVATION_TOKEN_SECRET, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, CLIENT_URL, MAILING_SERVICE_CLIENT_ID } = process.env;

const client = new OAuth2(MAILING_SERVICE_CLIENT_ID);

const userCtrl = {
    register: async (req, res) => {
        try {
            const {name, email, password} = req.body
            
            if(!name || !email || !password)
                return res.status(400).json({msg: "Please fill in all fields."})

            if(!validateEmail(email))
                return res.status(400).json({msg: "Invalid emails."})

            const user = await User.findOne({email})
            if(user) return res.status(400).json({msg: "This email already exists."})

            if(password.length < 6)
                return res.status(400).json({msg: "Password must be at least 6 characters."})

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = {
                name, email, password: passwordHash
            }

            const activation_token = createActivationToken(newUser)

            const url = `${CLIENT_URL}/user/activate/${activation_token}`
            sendMail(email, url, "Verify your email address")


            res.json({msg: "Register Success! Please activate your email to start."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    activateEmail: async (req, res) => {
        try {
            const {activation_token} = req.body
            const user = jwt.verify(activation_token, ACTIVATION_TOKEN_SECRET)

            const {name, email, password} = user

            const check = await User.findOne({email})
            if(check) return res.status(400).json({msg:"This email already exists."})

            const newUser = new User({
                name, email, password
            })

            await newUser.save()

            res.json({msg: "Account has been activated!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    login: async (req, res) => {
        try {
            const {email, password} = req.body
            const user = await User.findOne({email})
            if(!user) return res.status(400).json({msg: "This email does not exist."})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

            const refresh_token = createRefreshToken({id: user._id})
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/users/refresh_token',
                maxAge: 7*24*60*60*1000 // 7 days
            })

            res.json({msg: "Login success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getAccessToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken
            if(!rf_token) return res.status(400).json({msg: "Please login now!"})

            jwt.verify(rf_token, REFRESH_TOKEN_SECRET, (err, user) => {
                if(err) return res.status(400).json({msg: "Please login now!"})

                const access_token = createAccessToken({id: user.id})
                res.json({access_token})
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const {email} = req.body
            const user = await User.findOne({email})
            if(!user) return res.status(400).json({msg: "This email does not exist."})

            const access_token = createAccessToken({id: user._id})
            const url = `${CLIENT_URL}/user/reset/${access_token}`

            sendMail(email, url, "Reset your password")
            res.json({msg: "Re-send the password, please check your email."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    asd: {

    // resetPassword: async (req, res) => {
    //     try {
    //         const {password} = req.body
    //         console.log(password)
    //         const passwordHash = await bcrypt.hash(password, 12)

    //         await Users.findOneAndUpdate({_id: req.user.id}, {
    //             password: passwordHash
    //         })

    //         res.json({msg: "Password successfully changed!"})
    //     } catch (err) {
    //         return res.status(500).json({msg: err.message})
    //     }
    // },
    // getUserInfor: async (req, res) => {
    //     try {
    //         const user = await User.findById(req.user.id).select('-password')

    //         res.json(user)
    //     } catch (err) {
    //         return res.status(500).json({msg: err.message})
    //     }
    // },
    // getUsersAllInfor: async (req, res) => {
    //     try {
    //         const users = await User.find().select('-password')

    //         res.json(users)
    //     } catch (err) {
    //         return res.status(500).json({msg: err.message})
    //     }
    // },
    // logout: async (req, res) => {
    //     try {
    //         res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
    //         return res.json({msg: "Logged out."})
    //     } catch (err) {
    //         return res.status(500).json({msg: err.message})
    //     }
    // },
    // updateUser: async (req, res) => {
    //     try {
    //         const {name, avatar} = req.body
    //         await User.findOneAndUpdate({_id: req.user.id}, {
    //             name, avatar
    //         })

    //         res.json({msg: "Update Success!"})
    //     } catch (err) {
    //         return res.status(500).json({msg: err.message})
    //     }
    // },
    // updateUsersRole: async (req, res) => {
    //     try {
    //         const {role} = req.body

    //         await User.findOneAndUpdate({_id: req.params.id}, {
    //             role
    //         })

    //         res.json({msg: "Update Success!"})
    //     } catch (err) {
    //         return res.status(500).json({msg: err.message})
    //     }
    // },
    // deleteUser: async (req, res) => {
    //     try {
    //         await User.findByIdAndDelete(req.params.id)

    //         res.json({msg: "Deleted Success!"})
    //     } catch (err) {
    //         return res.status(500).json({msg: err.message})
    //     }
    // },
    // googleLogin: async (req, res) => {
    //     try {
    //         const {tokenId} = req.body

    //         const verify = await client.verifyIdToken({idToken: tokenId, audience: process.env.MAILING_SERVICE_CLIENT_ID})
            
    //         const {email_verified, email, name, picture} = verify.payload

    //         const password = email + process.env.GOOGLE_SECRET

    //         const passwordHash = await bcrypt.hash(password, 12)

    //         if(!email_verified) return res.status(400).json({msg: "Email verification failed."})

    //         const user = await User.findOne({email})

    //         if(user){
    //             const isMatch = await bcrypt.compare(password, user.password)
    //             if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

    //             const refresh_token = createRefreshToken({id: user._id})
    //             res.cookie('refreshtoken', refresh_token, {
    //                 httpOnly: true,
    //                 path: '/user/refresh_token',
    //                 maxAge: 7*24*60*60*1000 // 7 days
    //             })

    //             res.json({msg: "Login success!"})
    //         }else{
    //             const newUser = new Users({
    //                 name, email, password: passwordHash, avatar: picture
    //             })

    //             await newUser.save()
                
    //             const refresh_token = createRefreshToken({id: newUser._id})
    //             res.cookie('refreshtoken', refresh_token, {
    //                 httpOnly: true,
    //                 path: '/user/refresh_token',
    //                 maxAge: 7*24*60*60*1000 // 7 days
    //             })

    //             res.json({msg: "Login success!"})
    //         }


    //     } catch (err) {
    //         return res.status(500).json({msg: err.message})
    //     }
    // },
    }
};

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const createActivationToken = (payload) =>{return jwt.sign(payload, ACTIVATION_TOKEN_SECRET, {expiresIn: '5m'})};
const createAccessToken = (payload) =>{return jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: '15m'})};
const createRefreshToken = (payload) =>{return jwt.sign(payload, REFRESH_TOKEN_SECRET, {expiresIn: '7d'})};


module.exports = userCtrl;