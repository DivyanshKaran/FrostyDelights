const express = require("express");
const router = express.Router();
const icecreamController = require("../controllers/icecreamController");
const authController = require("../controllers/authenticationController");

router.get("/:id", authController.protect, icecreamController.getIceCream);

router.get("/", authController.protect, icecreamController.getAllIceCreams);

router.post(
  "/",
  authController.protect,
  authController.restrictsto("admin", "sub-admin"),
  icecreamController.createIceCream
);

router.patch(
  "/:id",
  authController.protect,
  authController.restrictsto("admin", "sub-admin"),
  icecreamController.updateIceCream
);

router.delete(
  "/:id",
  authController.protect,
  authController.restrictsto("admin", "sub-admin"),
  icecreamController.deleteIceCream
);

module.exports = router;
