const express = require('express');
const cors = require("cors");
const {dbConnect} = require("./database/database.connect");
const {errorRouteHandler} = require("./middlewares/404Handler.middleware");
const {errorHandler} = require("./middlewares/errorHandler.middleware");

const app = express();
app.use(cors());
app.use(express.json());
dbConnect();

app.use("/videos",require("./routes/videos.route"));
app.use("/playlists",require("./routes/playlist.route"));
app.use("/likes", require("./routes/likes.route"))
app.use("/watchlist",require("./routes/watchlist.route"))
app.use("/history",require("./routes/history.route"))

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

// Error Handling
app.use(errorRouteHandler);
app.use(errorHandler);

app.listen(3000, () => {
  console.log('server started');
});