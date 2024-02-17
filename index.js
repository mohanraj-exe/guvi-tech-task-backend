const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");
const dbConnect = require("./config/db.connect");

dotenv.config();
dbConnect();

// routes
const userRoute = require("./routes/user.route");

app.use(express.json());

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.get("/", (req, res, next) => {
  res.status(200).json({ Message: "home screen" });
  next();
});

// route
app.use("/api/user", userRoute);

const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`Port Started listening at ${port}`);
});
