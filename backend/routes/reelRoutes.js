const express = require('express');
const router = express.Router();
const reelCtrl = require('../controllers/reelController');

router.get('/feed', reelCtrl.getFeed);
router.post('/upload', reelCtrl.uploadReel);
router.post('/:id/view', reelCtrl.incrementView);

module.exports = router;
