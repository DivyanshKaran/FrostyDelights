const express = require("express");
const router = express.Router();
const icecreamController = require("../controllers/icecreamController");

router.get("/:id", icecreamController.getIceCream);
router.get("/", icecreamController.getAllIceCreams);
router.post("/", icecreamController.createIceCream);
router.patch("/:id", icecreamController.updateIceCream);
router.delete("/:id", icecreamController.deleteIceCream);

module.exports = router;
