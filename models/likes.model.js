const mongoose = require("mongoose");
const { Video } = require("./videos.model");
const { Schema } = mongoose;

const LikeSchema = new Schema({
  videos: [{ _id: String, name:String,category: String }]
})


const Likes = mongoose.model("Like", LikeSchema);
module.exports = { Likes }