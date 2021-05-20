const mongoose = require("mongoose");
const { Video } = require("./videos.model");
const { Schema } = mongoose;

const HistorySchema = new Schema({
  videos: [{ _id: String, name:String,category: String }]
})


const History = mongoose.model("History", HistorySchema);
module.exports = { History }