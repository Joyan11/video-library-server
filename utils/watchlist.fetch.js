const express = require("express");
const { Watchlist } = require("../models/watchlist.model");

const getWatchlist = async (wishlistid)=> await Watchlist.findById(wishlistid);
console.log("running");

module.exports = {getWatchlist}