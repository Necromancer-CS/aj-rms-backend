const express = require("express");

const morgan = require("morgan");
const cors = require("cors");
const bodyParse = require("body-parser");
const { readdirSync } = require("fs");

const connectDB = require("./Config/db");

const app = express();
connectDB();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParse.json({ limit: "10mb" }));
app.use("/uploads", express.static("uploads"));

readdirSync("./Routes").map((r) => app.use("/api", require("./Routes/" + r)));

const port = 5000;
app.listen(port, () => console.log("Server Running on port " + port));
