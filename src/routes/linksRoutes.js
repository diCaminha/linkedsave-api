const express = require("express");

const checkAuth = require("../middleware/check-auth");
const linksController = require("../controllers/linksController");

const router = express.Router();

router.get("/", checkAuth, linksController.getLinks);
router.get("/meta", checkAuth, linksController.getMetadataLink);
router.post("/", checkAuth, linksController.saveLink);
router.delete("/:id", checkAuth, linksController.deleteLink);
router.put("/:id/read", checkAuth, linksController.readLink);
router.get("/reads", checkAuth, linksController.getCounterReads);

module.exports = router;
