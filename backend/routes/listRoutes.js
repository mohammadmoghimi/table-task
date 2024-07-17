const express = require('express');
const router = express.Router();
const listController = require('../controllers/listControllers');

router.get('/lists', listController.getLists);
router.post('/verticalList', listController.addVerticalItem);
router.post('/horizontalList', listController.addHorizontalItem);

module.exports = router;
    