const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// app.use("/api/products", require("./routes/products"));
// app.use("/api/sales", require("./routes/sales"));

app.listen(process.env.PORT, () =>
  console.log(`Backend running on port ${process.env.PORT}`)
);
