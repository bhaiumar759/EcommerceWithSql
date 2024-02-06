const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');

router.post('/create', addressController.createAddress);




module.exports = router;