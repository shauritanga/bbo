// transactionController.js
import Transaction from "../models/transaction.js";

export const createTransaction = async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    const savedTransaction = await transaction.save();
    res.status(201).json(savedTransaction); // 201 Created
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllTransactions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page

    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    const transactions = await Transaction.find({}, { __v: 0 })
      .populate("payee")
      .populate("method")
      .skip(skip)
      .limit(limit);

    const totalDocuments = await Transaction.countDocuments();
    const totalPages = Math.ceil(totalDocuments / limit);

    res.status(200).json({
      data: transactions,
      currentPage: page,
      totalPages: totalPages,
      totalDocuments: totalDocuments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const updateData = req.body;

    // 1. Input Validation (Optional but Recommended)
    // Validate updateData using a schema (e.g., Joi) to ensure correct data types and structure

    // 2. Find and Update
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transactionId,
      { $set: updateData },
      { new: true } // Return the updated document
    );

    // 3. Handle Not Found
    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // 4. Success Response
    res.status(200).json(updatedTransaction);
  } catch (error) {
    // 5. Error Handling
    console.error("Error updating transaction:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// - getTransactionById
// - updateTransaction
// - deleteTransaction (consider soft deletes)
