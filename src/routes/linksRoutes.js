const express = require("express");

const checkAuth = require("../middleware/check-auth");
const linksController = require("../controllers/linksController");

const router = express.Router();

router.get("/", linksController.getLinks);
router.post("/", checkAuth, linksController.saveLink);
router.delete("/:id", linksController.deleteLink);

module.exports = router;
