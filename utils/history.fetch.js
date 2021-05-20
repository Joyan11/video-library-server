const express = require("express");
const { History } = require("../models/history.model");

const getHistory = async (historyid)=> await History.findById(historyid);
console.log("running");

module.exports = {getHistory}