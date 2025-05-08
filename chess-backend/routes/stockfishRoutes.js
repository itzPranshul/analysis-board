const express = require('express');
const router = express.Router();
const {
  analyzePosition,
  evaluatePosition
} = require('../controllers/stockfishController');

router.post('/analyze', analyzePosition);
router.post('/evaluate', evaluatePosition);

module.exports = router;
