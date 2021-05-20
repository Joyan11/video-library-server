const express = require('express');
const router = express.Router();
const { Video } = require("../models/videos.model");
const { data } = require("../data/data");

router.route("/")
  .get(async (req, res) => {
    try {
      const data = await Video.find({});
      res.status(200).json({ success: true, videodata: data });
    } catch (error) {
      res.status(404).json({ success: false, message: "The server can not find the requested resource.", error: error.message })
    }
  })

router.route("/:videoid")
  .get(async (req, res) => {
    try {
      const { videoid } = req.params;
      const data = await Video.findById(videoid);
      res.status(200).json({ success: true, videodata: data });
    } catch (error) {
      res.status(404).json({ success: false, message: "The server can not find the requested resource.", error: error.message })
    }
  })

module.exports = router;



