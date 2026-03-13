const express = require('express');
const router = express.Router();
const { createProduct, updateProduct, deleteProduct } = require('../controllers/adminController');
const { isAuthenticated, authorizeRoles } = require('../middleware/auth');

router.route('/admin/product').post(isAuthenticated, authorizeRoles('admin'), createProduct);
router.route('/admin/product/:id').put(isAuthenticated, authorizeRoles('admin'), updateProduct);
router.route('/admin/product/:id').delete(isAuthenticated, authorizeRoles('admin'), deleteProduct);

module.exports = router;
