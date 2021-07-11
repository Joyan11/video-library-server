const mongoose = require("mongoose");
const { User } = require("./user.model")
const { Schema } = mongoose;

const HistorySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  videos: [{ _id: String, name: String, category: String }]
})


const History = mongoose.model("History", HistorySchema);
module.exports = { History }