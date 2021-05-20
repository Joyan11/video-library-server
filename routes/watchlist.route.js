const express = require("express");
const router = express.Router();
const { Watchlist } = require("../models/watchlist.model");
const { getWatchlist } = require("../utils/watchlist.fetch")
router.route("/")
  .get(async (req, res) => {
    try {
      const data = await Watchlist.find({});
      res.status(200).json({ success: true, watchlistData: data })
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal Server Error", errorMessage: errorMessage.message })
    }
  })
  .post(async (req, res) => {
    try {
      const videos = req.body;
      const NewWatchlist = new Watchlist(videos);
      const savedWatchlist = await NewWatchlist.save();
      const data = await getWatchlist(savedWatchlist._id);
      res.status(201).json({ success: true, watchlistData: data })
    } catch (error) {
      res.status(500).json({ success: false, message: "Unable to add videos to Watchlist", errorMessage: error.message })
    }
  })

router.route("/:watchlistid")
  .get(async (req, res) => {
    try {
      const { watchlistid } = req.params;
      const data = await getWatchlist(watchlistid);
      res.status(200).json({ success: true, watchlistData: data })
    } catch (error) {
      res.status(500).json({ success: false, message: "unable to get videos", errorMessage: error.message })
    }

  })
  .post(async (req, res) => {
    try {
      const { videos } = req.body;
      const { watchlistid } = req.params;
      await Watchlist.findByIdAndUpdate(watchlistid, { $addToSet: { videos: videos } }
      );
      const data = await getWatchlist(watchlistid);

      res.status(201).json({ success: true, watchlistData: data });
    } catch (error) {
      res.status(500).json({ success: false, message: "unable to add videos to Watchlist", errorMessage: error.message })
    }
  })
  .delete(async (req, res) => {
    try {
      const { watchlistid } = req.params;
      await Watchlist.findByIdAndRemove({ _id: watchlistid })
      res.status(200).json({ success: true })
    } catch (error) {
      res.status(500).json({ success: false, message: "Unable to delete item from Watchlist", errorMessage: error.message })
    }
  })



router.route("/:watchlistid/:videoid")
  .delete(async (req, res) => {
    try {
      const { watchlistid, videoid } = req.params;
      await Watchlist.findByIdAndUpdate(watchlistid, { $pull: { videos: { _id: videoid } } }
      );
      const data = await getWatchlist(watchlistid);
      res.status(200).json({ success: true, watchlistData: data })
    } catch (error) {
      res.status(500).json({ success: false, message: "Unable to delete Watchlist", errorMessage: error.message })
    }

  })


module.exports = router;