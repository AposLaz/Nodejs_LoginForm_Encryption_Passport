//For register page
const registerView = (req, res)=>{
    res.render("register", {
    })
}

/*
    Use a register Controller for:

    1) Confirm that passwords match
    2) Validate Email
    3) Hash Passwords
*/
const UserModel = require('../model/User');
const bcrypt = require('bcryptjs');

const registerUser = (req,res)=>{
     const {name, email, location, password, confirm} = req.body
     if (!name || !email || !password || !confirm) {
         console.log("Fill empty fields");
    }

    //1) Confirm Passwords
    if (password != confirm){
        console.log("Passwords must match")
    }
    else {
    //2) Validate email
        UserModel.findOne({email: email}).then((user)=>{
            if(user){
                res.render("register",{
                    name,
                    email,
                    password,
                    confirm
                })
                console.log('Same email')
            }
            else{

                const User = new UserModel({
                    name,
                    email,
                    location,
                    password
                })

                //3) Hash Passwords
                bcrypt.genSalt(10, (err, salt)=>{
                    bcrypt.hash(User.password, salt, (err,hash)=>{
                        // Store hash in your password DB.
                        if(err) throw err;
                        User.password = hash;
                        
                        User
                            .save()
                            .then(res.redirect('/login'))
                            .catch((err)=> console.log(err))
                    })
                })                
            }
        })
    }
}

//For login
const loginView = (req,res)=>{
    res.render("login", {
    })
}

/*
    Use a login Controller for:

    1) Required fields
    2) Validate Email
    3) Hash Passwords
*/
const passport = require('passport')

const loginUser = (req,res) => {
    const {email, password} = req.body;
    
    //Required
    if (!email || !password){
        console.log("Please fill in all the fields");
        res.render('login',{
            email,
            password
        })
    }
    else{
        passport.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: '/login',
            failureFlash: true,
        })(req,res);
    }
}

module.exports = {
    registerView,
    loginView,
    registerUser,
    loginUser
};