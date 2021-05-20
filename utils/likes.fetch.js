const express = require("express");
const { Likes } = require("../models/likes.model");

const getLikes = async (likeid)=> await Likes.findById(likeid);
console.log("running")

module.exports = {getLikes}