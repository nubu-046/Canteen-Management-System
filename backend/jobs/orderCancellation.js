const cron = require('node-cron');
const mongoose = require('mongoose');
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');

const cancelStaleOrders = async () => {
  // Find pending orders older than 15 minutes
  const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);

  const staleOrders = await Order.find({
    status: 'pending',
    createdAt: { $lt: fifteenMinutesAgo },
  });
  
  if (staleOrders.length === 0) {
    console.log('No stale orders to cancel.');
    return;
  }

  console.log(`Found ${staleOrders.length} stale orders. Cancelling...`);
  
  for (const order of staleOrders) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      // Restore stock for each item in the order
      for (const item of order.items) {
        await MenuItem.findByIdAndUpdate(
          item.menuItemId,
          { $inc: { stock: item.quantity } },
          { session }
        );
      }
      
      // Update order status to 'cancelled'
      order.status = 'cancelled';
      await order.save({ session });
      
      await session.commitTransaction();
      console.log(`Order ${order._id} cancelled and stock restored.`);
    } catch (error) {
      await session.abortTransaction();
      console.error(`Failed to cancel order ${order._id}:`, error);
    } finally {
      session.endSession();
    }
  }
};

// Schedule the job to run every minute
const startCancellationJob = () => {
  cron.schedule('* * * * *', () => {
    console.log('Running stale order cancellation job...');
    cancelStaleOrders();
  });
};

module.exports = startCancellationJob;