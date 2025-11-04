const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');

router.post('/follow/:id', userCtrl.followUser);
router.get('/dashboard/:id', userCtrl.getDashboard);
router.post('/redeem/:id', userCtrl.redeemCredits);

module.exports = router;
