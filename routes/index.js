var express = require('express');
const userModel = require("./users");
const postModel = require("./posts");
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/createuser", async (req, res) => {
  try {
    let createduser = await userModel.create({
      username: "BhushanJadhao",
      password: "Bhushan",
      posts: [],
      email: "bhushanjadhao18@gmail.com",
      fullname: "Bhushan Jadhao",
    });
    res.send(createduser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/alluserpost",async (req,res)=>{
let user=await userModel
.findOne({_id:"65be1c6b64cc656e0d29cc3a"})
.populate("posts");
res.send(user);
})

router.get("/createpost", async (req, res) => {
  try {
    
    let createdpost = await postModel.create({
      postText: "hello kasie ho app log....",
      user: "65be1c6b64cc656e0d29cc3a"
    });

    let user = await userModel.findById("65be1c6b64cc656e0d29cc3a");

   
    if (!user) {
      return res.status(404).send("User not found");
    }

    user.posts.push(createdpost._id);

    await user.save();

    res.send("Post created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
