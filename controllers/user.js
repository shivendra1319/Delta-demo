
const User=require("../models/user");

module.exports.renderSignUp=(req,res)=>{
    res.render("users/signup.ejs");

}


module.exports.signUp=async(req,res)=>{

    try{
        let {username,email,password}=req.body;

    const newUser=new User({email,username});

    const registeredUser = await User.register(newUser,password);
    req.login(registeredUser,(err)=>{
        if(err)
        {
            return next(err);
        }
        req.flash("success",`Welcome ${username} to Wanderlust`);
        res.redirect("/listing");
    });
    
    }
    catch(e)
    {
        req.flash("error","User already exist");
        res.redirect("/signup");
    }
}



//render login
module.exports.renderLogin=(req,res)=>{
    res.render("users/login.ejs");
}


//login
module.exports.login=async(req,res)=>{

    req.flash("success","Welcome Back to Wanderlust!");
    let redirectUrl=res.locals.redirectUrl||"/listing";
    res.redirect(redirectUrl);

}


//logout
module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err)
        {
            return next(err);
        }
        req.flash("success","You are logged out!");
        res.redirect("/listing");
    });

}