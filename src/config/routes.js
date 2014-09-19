const express = require('express');
const ctrls = requireAll(__dirnmae+'/../app/controllers/');

const router = new express.Router();

router.post('/v1/users', ctrls.usersController.create);
router.get('/v1/users', ctrls.usersController.index);
router.get('/v1/users/:id', ctrls.usersController.show);

router.post('/v1/external_accounts', ctrls.externalAccountsController.create);
router.get('/v1/external_accounts', ctrls.externalAccountsController.index);
router.get('/v1/external_accounts/:id', ctrls.externalAccountsController.show);
router.put('/v1/external_accounts/:id', ctrls.externalAccountsController.update);
router.delete('/v1/external_accounts/:id', ctrls.externalAccountsController.destroy);

router.get('/v1/external_transactions', ctrls.externalTransactionsController.index);
router.get('/v1/external_transactions/:id', ctrls.externalTransactionsController.show);

router.get('/v1/ripple_addresses', ctrls.rippleAddressesController.index);
router.get('/v1/ripple_addresses/:id', ctrls.rippleAddressesController.show);

router.get('/v1/ripple_transactions', ctrls.rippleTransactionsController.index);
router.get('/v1/ripple_transactions/:id', ctrls.rippleTransactionsController.show);

module.exports = router;

