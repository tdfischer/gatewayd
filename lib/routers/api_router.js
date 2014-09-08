const express = require('express');
const requireAll = require('require-all-to-camel');
const apiController = requireAll(__dirname+'/../controllers/api/');

const router = new express.Router();

router.get('/v1/payments/incoming', apiController.listIncomingPayments);
router.post('/v1/payments/outgoing', apiController.enqueueOutgoingPayment);
router.get('/v1/payments/outgoing', apiController.listOutgoingPayments);
router.get('/v1/payments/failed', apiController.listFailedPayments);
router.post('/v1/payments/failed/:id/retry', apiController.retryFailedPayment);
router.get('/v1/withdrawals', apiController.listQueuedWithdrawals);
router.post('/v1/withdrawals/:id/clear', apiController.clearWithdrawal);
router.post('/v1/deposits', apiController.recordDeposit);
router.get('/v1/deposits', apiController.listQueuedDeposits);
router.get('/v1/cleared', apiController.listCleared);
router.get('/v1/users/:id/external_accounts', apiController.listUserExternalAccounts);
router.post('/v1/users/:id/activate', apiController.activateUser);
router.post('/v1/users/:id/deactivate', apiController.deactivateUser);
router.post('/v1/registrations', apiController.registerUser);
router.get('/v1/processes', apiController.listProcesses);

module.exports = router;

