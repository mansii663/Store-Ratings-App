const express = require('express');
const router = express.Router();
const {
  createStore,
  getAllStores,
  updateStore,
  deleteStore,
} = require('../controllers/storeController');
const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, authorizeRoles('admin'), createStore);
router.get('/', verifyToken, authorizeRoles('admin', 'user', 'owner'), getAllStores);
router.put('/:id', verifyToken, authorizeRoles('admin'), updateStore);
router.delete('/:id', verifyToken, authorizeRoles('admin'), deleteStore);

module.exports = router;
