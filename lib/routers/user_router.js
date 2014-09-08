const express = require('express');
const requireAll = require('require-all-to-camel');
const userController = require(__dirname+'/../controllers/user/');

const router = new express.Router();

router.get('/v1/users/:id', userController.show);
router.get('/v1/users/:id/external_accounts', userController.externalAccounts);
router.get('/v1/users/:id/external_transactions', userController.externalTransactions);
router.get('/v1/users/:id/ripple_addresses', userController.rippleAddresses);
router.get('/v1/users/:id/ripple_transactions', userController.rippleTransactions);

module.exports = router;

