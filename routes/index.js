var express = require('express');
const userModel = require("./users");
const postModel = require("./posts");
var router = express.Router();
const localStrategy=require("passport-local");
const passport = require('passport');

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next(); 
  }
  res.redirect("/login");
}
passport.use(new localStrategy(userModel.authenticate()));


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});
router.get("/profile",isLoggedIn,function(req,res,next){
  res.render("profile");
});
router.get("/feed",(req,res)=>{
  res.render("feed");
})
router.get("/login",(req,res)=>{
  res.render("login");
})
router.post("/register",function(req,res){
  const userData=new userModel({
    username:req.body.username,
    email:req.body.email,
    fullName:req.body.fullname
  });
  userModel.register(userData,req.body.password)
    .then(function( ){
      passport.authenticate("local")(req,res,function(){
        res.render("profile");
      })
    })
});

router.post("/login",passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:"/login"
}),function(req,res){});

router.get("/logout",function(req,res,next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  
  });
});

module.exports = router;
