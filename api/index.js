const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const bodyParse = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("../Config/db");

connectDB();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParse.json({ limit: "10mb" }));
app.use("/uploads", express.static("uploads"));

// Members API Routes
// Routes
app.use("/api", require("../Routes/api/common"));
app.use("/api/admin", require("../Routes/api/Admin"));
app.use("/api/buffet", require("../Routes/api/Buffet"));
app.use("/api/channel-payment", require("../Routes/api/ChannelPayment"));
app.use("/api/billing", require("../Routes/api/Billing"));
app.use("/api/billing-control", require("../Routes/api/BillingControl"));
app.use("/api/customer-booking", require("../Routes/api/CustomerBooking"));
app.use(
  "/api/customer-booking-control",
  require("../Routes/api/CustomerBookingControl")
);
app.use("/api/menu", require("../Routes/api/menu"));
app.use("/api/menu-control", require("../Routes/api/menuControl"));

app.use("/api/desk", require("../Routes/api/Desk"));

app.use("/api/order-customer", require("../Routes/api/OrderMenu"));
app.use("/api/order-menu", require("../Routes/api/CustomerOrderMenu"));
app.use(
  "/api/order-menu-control",
  require("../Routes/api/CustomerOrderMenuControl")
);

app.listen(5000, () => console.log("Server ready on port 5000."));

module.exports = app;
