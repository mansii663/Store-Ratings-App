const express = require('express');
const router = express.Router();
const { addRating, getStoreRatings } = require('../controllers/ratingController');
const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, authorizeRoles('user', 'admin'), addRating);

router.get('/:storeId', verifyToken, authorizeRoles('user', 'admin'), getStoreRatings);

module.exports = router;
