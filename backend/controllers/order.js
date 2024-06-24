import Order from "../models/order.js";

export const getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page

    const skip = (page - 1) * limit; // skip

    const orders = await Order.find({})
      .populate("customer")
      .skip(skip)
      .limit(limit);

    const totalDocuments = await Order.countDocuments();
    const totalPages = Math.ceil(totalDocuments / limit);

    res.status(200).json({
      data: orders,
      currentPage: page,
      totalPages: totalPages,
      totalDocuments: totalDocuments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getPendingOrders = async (req, res) => {};
export const getCompleteOrders = async (req, res) => {};
export const getUnderProcessOrders = (req, res) => {};
