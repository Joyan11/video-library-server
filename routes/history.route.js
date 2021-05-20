const express = require("express");
const router = express.Router();
const { History } = require("../models/history.model");
 const {getHistory} = require("../utils/history.fetch")

router.route("/")
  .get(async (req, res) => {
    try {
      const data = await History.find({});
      res.status(200).json({ success: true, historyData: data })
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal Server Error", errorMessage: errorMessage.message })
    }
  })
  .post(async (req, res) => {
    try {
      const videos = req.body;
      const NewHistory = new History(videos);
      const savedHistory = await NewHistory.save();
      const data = await getHistory(savedHistory._id);
      res.status(201).json({ success: true, historyData: data })
    } catch (error) {
      res.status(500).json({ success: false, message: "Unable to add videos to History", errorMessage: error.message })
    }
  })

router.route("/:historyid")
  .get(async (req, res) => {
    try {
      const { historyid } = req.params;
      const data = await getHistory(historyid);
      res.status(200).json({ success: true, historyData: data })
    } catch (error) {
      res.status(500).json({ success: false, message: "unable to get videos", errorMessage: error.message })
    }

  })
  .post(async (req, res) => {
    try {
      const { videos } = req.body;
      const { historyid } = req.params;
      await History.findByIdAndUpdate(historyid, { $addToSet: { videos: videos } }
      );
      const data = await getHistory(historyid);

      res.status(201).json({ success: true, historyData: data });
    } catch (error) {
      res.status(500).json({ success: false, message: "unable to add videos to History", errorMessage: error.message })
    }
  })
  .delete(async (req, res) => {
    try {
      const { historyid } = req.params;
      console.log(historyid)
      await History.findByIdAndRemove({ _id: historyid })
      res.status(200).json({ success: true })
    } catch (error) {
      res.status(500).json({ success: false, message: "Unable to delete item from History", errorMessage: error.message })
    }
  })



router.route("/:historyid/:videoid")
  .delete(async (req, res) => {
    try {
      const { historyid, videoid } = req.params;
      await History.findByIdAndUpdate(historyid, { $pull: { videos: { _id: videoid } } }
      );
      const data = await getHistory(historyid);
      res.status(200).json({ success: true, historyData: data })
    } catch (error) {
      res.status(500).json({ success: false, message: "Unable to delete History", errorMessage: error.message })
    }

  })


module.exports = router;