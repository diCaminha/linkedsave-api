const express = require('express');
const router = express.Router();

const dayreadController = require('../controllers/dayreadsController');

router.get('/', dayreadController.getDayreads);

module.exports = router;