const { History } = require("../models/history.model");

const getHistory = async (userid) => await History.findOne({ user: userid });
console.log("running");

module.exports = { getHistory }