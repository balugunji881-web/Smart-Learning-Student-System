const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  getDashboard
} = require("../controllers/dashboardController");

router.get(
  "/",
  auth,
  role("admin"),
  getDashboard
);

module.exports = router;