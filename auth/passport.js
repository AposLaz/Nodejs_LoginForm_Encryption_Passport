const bcrypt = require('bcryptjs');
LocalStrategy = require('passport-local').Strategy;

//Load Model
const UserModel = require('../model/User');

const LoginCheck = passport => {
    passport.use(
        new LocalStrategy({ usernameField: 'email'}, (email, password, done) =>{
            //Check User Email
            UserModel.findOne({email: email}).then((user)=>{
                if(!user){
                    console.log("wrong email");
                    return done();
                }
                else{
                    //UnHash Password
                    bcrypt.compare(password, user.password, (error, isMatch)=>{
                        if (error) throw error;
                        if (isMatch){
                            return done(null, user)
                        }
                        else{
                            console.log("Wrong password");
                            return done();
                        }
                    })
                }
            }).catch((error) => console.log(error))
        })
    )

    passport.serializeUser((user,done)=>{
        done(null,user.id)
    })

    passport.deserializeUser((id, done) => {
        UserModel.findById(id, (error, user) => {
          done(error, user);
        });
      });
    
}

module.exports = LoginCheck;