const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
//ROUTES

/*Login authentication*/
router.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;

        /*Validation stage*/
        const user = await User.findOne({username}) || await User.findOne({email: username});

        User.findOne().where()
        //Invalid credentials
        if (!user || user.password !== password) {
            return res.status(400).json({msg: "Incorrect username or password"});
        }

        //Disabled account
        if (!user.active) {
            return res.status(400).json({msg: "This account has been disabled"});
        }

        return res.json({
            auth_id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
        });

    } catch (error) {
        return res.status(500).json({error: error.message})
    }
})

router.post('/signup', async (req, res) => {
    try {

        //Regular expression declaration
        const nameRegex = /[a-zA-Z]/;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const phoneRegex = /[0-9]/;
        const errors = [null, null, null, null, null, null, null]

        //Assign the request data
        const user = req.body;

        //Validation stage
        if (!(user.name && user.username && user.email && user.password && user.password2)) {
            errors[0] = "Please input all required fields";
            return res.status(400).json({errors});
        }

        // if (!(user.fname && user.lname && user.gender && user.dob && user.email && user.password && user.password2 && user.phone)) {
        //     return res.status(400).json({msg: "Please input all required fields"});
        // }

        if (!emailRegex.test(user.email)) {
            errors[1] = "Please input a valid email!";
        }

        if (user.password.length < 6) {
            errors[2] = "Password length must be greater than 6 characters!";
        }

        if (user.password != user.password2) {
            errors[3] = "Confirm password does not match!";
        }

        if (!nameRegex.test(user.name)) {
            errors[6] = "Please input a valid name";
        }

        // if (!phoneRegex.test(user.phone)) {
        //     return res.status(400).json({msg: "Please input a valid phone number!"});
        // }

        // if (new Date().getFullYear() - parseInt(user.dob.slice(0, 4))  < 18)
        //     return res.status(400).json({msg: "You must be older than 18 years old to register!" });

        const existingEmail = await User.findOne({email: user.email}) 
        if (existingEmail) {
            errors[4] = "This email has already been registered!";
        }

        const existingUsername = await User.findOne({username: user.username});
        if (existingUsername) {
            errors[5] = "This username is not available!";
        }
        
        if (errors.filter((error)=> error === null).length < 7) {
            return res.status(400).json({errors});
        }

        //Create and insert data to database
        const newUser = await (new User({
            name: user.name,
            username: user.username,
            email: user.email,
            password: user.password,
            avatar: 'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=' + user.name.split(" ").join("+"),
            active: true
        })).save();

        return res.json({
            auth_id: newUser._id,
            name: newUser.name,
            username: newUser.username,
            email: newUser.email,
            avatar: newUser.avatar
        });

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
})

module.exports = router;