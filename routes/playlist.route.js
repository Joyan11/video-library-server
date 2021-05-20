const express = require('express');
const router = express.Router();
const { Playlist } = require("../models/playlist.model");

// create and get initial playlist
router.route("/")
  .get(async (req, res) => {
    try {
      const data = Playlist.find({});
      res.status(200).json({ success: true, videoData: data })
    }
    catch (error) {
      res.status(500).json({ success: false, message: "Could not fetch data", errorMessage: error.message })
    }
  })
  .post(async (req, res) => {
    try {
      const playlist = req.body;
      const NewPlaylist = new Playlist(playlist);
      const savePlaylistItem = await NewPlaylist.save();
      res.status(201).json({ success: true, playlistData: savePlaylistItem })
    } catch (error) {
      res.status(500).json({ success: false, message: "Unable to add products to Wishlist", errorMessage: error.message })
    }
  })

// create and get playlist
router.route("/:allplaylistid")
  .get(async (req, res) => {
    try {
      const { allplaylistid } = req.params;
      const data = await Playlist.findById(allplaylistid);
      res.status(200).json({ success: true, playlistData: data })
    } catch (error) {
      res.status(500).json({ success: false, message: "Unable to add products to Wishlist", errorMessage: error.message })
    }
  })
  .post(async (req, res) => {
    try {
      const { allplaylistid } = req.params;
      const { playlist } = req.body;
      await Playlist.findByIdAndUpdate(allplaylistid, { $push: { playlist: playlist } });
      const data = await Playlist.findById(allplaylistid);
      res.status(201).json({ success: true, playlistData: data })
    } catch (error) {
      res.status(500).json({ success: false, message: "Unable to create new playlist", errorMessage: error.message })
    }
  })


// playlist management
router.route("/:allplaylistid/:playlistid")
  .get(async (req, res) => {
    try {
      const { allplaylistid, playlistid } = req.params;
      const [data] = await Playlist.find({"playlist._id":playlistid},{playlist:{$elemMatch:{
        _id:playlistid
      }}})
      res.status(200).json({ success: true, playlistData: data })
    } catch (error) {
      res.status(500).json({ success: false, message: "Unable to create new playlist", errorMessage: error.message })
    }
  })
  .post(async (req, res) => {
    try {
      const { allplaylistid, playlistid } = req.params;
      const { videodata } = req.body;
      await Playlist.updateOne({ "_id": allplaylistid, "playlist._id": playlistid }, { "$addToSet": { "playlist.$.list": videodata } });
      const data = await Playlist.findById(allplaylistid);
      res.status(201).json({ success: true, playlistData: data })
    } catch (error) {
      res.status(500).json({ success: false, message: "Unable to create new playlist", errorMessage: error.message })
    }
  })
  .delete(async (req, res) => {
    try {
      const { allplaylistid, playlistid } = req.params;
      await Playlist.findByIdAndUpdate(allplaylistid, { $pull: { playlist: { _id: playlistid } } }
      );
      const data = await Playlist.findById(allplaylistid);
      res.status(200).json({ success: true, playlistData: data })
    } catch (error) {
      res.status(500).json({ success: false, message: "Unable to create new playlist", errorMessage: error.message })
    }
  })


router.route("/:allplaylistid/:playlistid/:videoid")
  .delete(async (req, res) => {
    try {
      const { allplaylistid, playlistid, videoid } = req.params;
      await Playlist.updateOne({ "_id": allplaylistid, "playlist._id": playlistid }, { "$pull": { "playlist.$.list": { "_id": videoid } } });
      const data = await Playlist.findById(allplaylistid);
      res.status(201).json({ success: true, playlistData: data })
    } catch (error) {
      res.status(500).json({ success: false, message: "Unable to create new playlist", errorMessage: error.message })
    }
  })




module.exports = router;

