const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const mongoose = require('mongoose');

// @desc    Create a new order
// @route   POST /api/orders
exports.createOrder = async (req, res) => {
  const { items } = req.body; // items: [{ menuItemId, quantity }]
  
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let totalAmount = 0;
    const itemsToProcess = [];

    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItemId).session(session);
      if (!menuItem) {
        throw new Error(`Menu item with ID ${item.menuItemId} not found.`);
      }
      if (menuItem.stock < item.quantity) {
        throw new Error(`Not enough stock for ${menuItem.name}.`);
      }
      
      menuItem.stock -= item.quantity;
      await menuItem.save({ session });

      totalAmount += menuItem.price * item.quantity;
      itemsToProcess.push({ menuItemId: item.menuItemId, quantity: item.quantity });
    }

    const newOrder = new Order({ 
      userId: req.user.id,
      items: itemsToProcess, 
      totalAmount, 
      status: 'pending' 
    });
    const savedOrder = await newOrder.save({ session });

    await session.commitTransaction();
    session.endSession();
    
    res.status(201).json(savedOrder);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all orders (admin) or user's orders (regular user)
// @route   GET /api/orders
exports.getOrders = async (req, res) => {
  try {
    let query = {};
    
    // If user is not admin, only show their orders
    if (req.user.role !== 'admin') {
      query.userId = req.user.id;
    }
    
    const orders = await Order.find(query)
      .populate('items.menuItemId')
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get a single order by ID
// @route   GET /api/orders/:id
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('items.menuItemId')
            .populate('userId', 'name email');
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        // Check if user is admin or owns this order
        if (req.user.role !== 'admin' && order.userId._id.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }
        
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update order status (Admin only)
// @route   PUT /api/orders/:id/status
exports.updateOrderStatus = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { status } = req.body;
        const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
        
        if (!validStatuses.includes(status)) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: 'Invalid status' });
        }

        const order = await Order.findById(req.params.id).session(session);
        if (!order) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: 'Order not found' });
        }

        const previousStatus = order.status;
        
        // If changing to cancelled status, restore inventory
        if (status === 'cancelled' && previousStatus !== 'cancelled') {
            for (const item of order.items) {
                const menuItem = await MenuItem.findById(item.menuItemId).session(session);
                if (menuItem) {
                    menuItem.stock += item.quantity;
                    await menuItem.save({ session });
                }
            }
        }

        order.status = status;
        await order.save({ session });

        await session.commitTransaction();
        session.endSession();

        const updatedOrder = await Order.findById(req.params.id)
            .populate('items.menuItemId')
            .populate('userId', 'name email');
        res.json(updatedOrder);
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: 'Server Error' });
    }
};