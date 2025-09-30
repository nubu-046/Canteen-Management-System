const express = require('express');
const router = express.Router();
const { getMenuItems, createMenuItem } = require('../controllers/menuItemController');
const { protect, admin } = require('../middleware/authMiddleware');

// GET route is public, anyone can see the menu
router.route('/').get(getMenuItems);

// POST route is protected: user must be logged in (protect) and be an admin (admin)
router.route('/').post(protect, admin, createMenuItem);

module.exports = router;