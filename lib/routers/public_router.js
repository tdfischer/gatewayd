const express = require('express');
const requireAll = require('require-all-to-camel');
const publicController = requireAll(__dirname+'/../controllers/public/');

const router = new express.Router();

router.get('/ripple.txt', publicController.rippleTxtController);
router.post('/v1/registrations', publicController.registrationsController);
router.post('/v1/verifications', publicController.registrationsController);

module.exports = router;

