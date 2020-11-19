const express = require('express');
const router = express.Router();

const linksController = require('../controllers/linksController');

router.get('/', linksController.getLinks);

module.exports = router;