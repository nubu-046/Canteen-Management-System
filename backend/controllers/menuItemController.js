const MenuItem = require('../models/MenuItem');

// @desc    Get all menu items
// @route   GET /api/menu
exports.getMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a menu item
// @route   POST /api/menu
exports.createMenuItem = async (req, res) => {
  // Add 'category' to the line below
  const { name, description, price, imageUrl, stock, category } = req.body;
  try {
    const newItem = new MenuItem({ name, description, price, imageUrl, stock, category });
    // The variable 'item' was not used, so it's removed for clarity.
    await newItem.save(); 
    res.status(201).json(newItem); // Return the newly created item
  } catch (err) {
    console.error(err.message); // It's good practice to log the actual error
    res.status(500).json({ message: 'Server Error' });
  }
};