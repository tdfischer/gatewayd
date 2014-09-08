const express = require('express');
const requireAll = require('require-all-to-camel');
const publicController = requireAll(__dirname+'/../controllers/public/');

const router = new express.Router();

router.get('/ripple.txt', publicController.rippleTxt);
router.post('/v1/register', publicController.registerUser);

module.exports = router;

