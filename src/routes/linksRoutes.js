const express = require("express");

const checkAuth = require("../middleware/check-auth");
const linksController = require("../controllers/linksController");

const router = express.Router();

router.get("/", linksController.getLinks);
router.get("/meta", linksController.getMetadataLink);
router.post("/", checkAuth, linksController.saveLink);
router.delete("/:id", linksController.deleteLink);
router.put("/:id/read", linksController.readLink);
router.get("/reads", linksController.getCounterReads);

module.exports = router;
