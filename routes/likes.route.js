const express = require("express");
const router = express.Router();
const { Likes } = require("../models/likes.model");
const {getLikes} = require("../utils/likes.fetch")

router.route("/")
  .get(async (req, res) => {
    try {
      const data = await Likes.find({});
      res.status(200).json({ success: true, likeData: data })
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal Server Error", errorMessage: errorMessage.message })
    }
  })
  .post(async (req, res) => {
    try {
      const videos = req.body;
      const NewLikes = new Likes(videos);
      const savedLikes = await NewLikes.save();
      const data = await getLikes(savedLikes._id);
      res.status(201).json({ success: true, likeData: data })
    } catch (error) {
      res.status(500).json({ success: false, message: "Unable to add videos to Likes", errorMessage: error.message })
    }
  })

router.route("/:likeid")
  .get(async (req, res) => {
    try {
      const { likeid } = req.params;
      const data = await getLikes(likeid);
      res.status(200).json({ success: true, likeData: data })
    } catch (error) {
      res.status(500).json({ success: false, message: "unable to get videos", errorMessage: error.message })
    }

  })
  .post(async (req, res) => {
    try {
      const { videos } = req.body;
      const { likeid } = req.params;
      await Likes.findByIdAndUpdate(likeid, { $addToSet: { videos: videos } }
      );
      const data = await getLikes(likeid);

      res.status(201).json({ success: true, likeData: data });
    } catch (error) {
      res.status(500).json({ success: false, message: "unable to add videos to Likes", errorMessage: error.message })
    }
  })
  .delete(async (req, res) => {
    try {
      const { likeid } = req.params;
      await Likes.findByIdAndRemove({ _id: likeid })
      res.status(200).json({ success: true })
    } catch (error) {
      res.status(500).json({ success: false, message: "Unable to delete item from Likes", errorMessage: error.message })
    }
  })



router.route("/:likeid/:videoid")
  .delete(async (req, res) => {
    try {
      const { likeid, videoid } = req.params;
      await Likes.findByIdAndUpdate(likeid, { $pull: { videos: { _id:videoid } } }
      );
      const data = await getLikes(likeid);
      res.status(200).json({ success: true, likeData: data })
    } catch (error) {
      res.status(500).json({ success: false, message: "Unable to delete Likes", errorMessage: error.message })
    }

  })


module.exports = router;