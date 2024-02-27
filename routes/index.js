var express = require('express');
const userModel = require("./users");
const postModel = require("./posts");
var router = express.Router();
const localStrategy=require("passport-local");
const passport = require('passport');
const upload=require("./multer");


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
router.get("/profile", isLoggedIn, async function(req, res, next) {
  try {
    const user = await userModel.findOne({ username: req.session.passport.user });
    res.render("profile", { user: user }); 
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/feed",(req,res)=>{
  res.render("feed");
})
router.get("/login",(req,res)=>{
  res.render("login",{error:req.flash("error")});
})
router.post("/register",function(req,res){
  const userData=new userModel({
    username:req.body.username,
    email:req.body.email,
    fullname:req.body.fullname
  });
  userModel.register(userData,req.body.password)
    .then(function( ){
      passport.authenticate("local")(req,res,function(){
        res.render("profile");
      })
    })
});

router.post("/uploads",upload.single("file"),async function(req,res,next){
if(!req.file){
  return res.status(400).send("No files were uploaded.");

}
const user=await userModel.findOne({ username: req.session.passport.user });
postModel.create({
  image:req.file.filename,
  imageText:req.body.fileCaption,
  

})

});

router.post("/login",passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:"/login",
  failureFlash:true
}),function(req,res){});

router.get("/logout",function(req,res,next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  
  });
});

module.exports = router;
