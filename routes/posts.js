const mongoose = require('mongoose');

// Define a Mongoose schema for posts
const postSchema = new mongoose.Schema({
  postText: {
    type: String,
    required: true,
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Array,
    default: [],
  },
});

// Create a Mongoose model based on the schema
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
