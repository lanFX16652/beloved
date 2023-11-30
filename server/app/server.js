const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const authRoute = require("./routes/auth.js");
const mediaRoute = require("./routes/media.js");

dotenv.config()
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Init Router
app.use(authRoute);
app.use(mediaRoute);

mongoose.connect("mongodb://127.0.0.1:27017/preloved")
    .then((result) => console.log("Database connected"))
    .catch((err) => console.log("Database connect failed"))

app.listen(port, () => {
    console.log("listening on port: ", port)
})