const checkAuthentication = (req,res,next) =>{
    if(req.isAuthenticated()){
        return next()
    }
    console.log('Please log in to continue');
    res.redirect('/login');
}

module.exports = checkAuthentication