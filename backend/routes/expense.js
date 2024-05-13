import express from 'express';
import Expense from '../models/expense.js';
const route = express.Router();


route.get("/", async(req, res) => {
    const expenses = await Expense.find({});
    res.send(expenses);
});
route.post("/", async(req, res) => {
    const expense = Expense({
        ...req.body
    });
    await expense.save();
    res.send({"message":"Success"});
});

route.get("/:id", async(req, res) => {
    const expense = await Expense.find({_id:req.params.id})
    res.send(expense);
});

route.post("/:id", async(req, res) => {
    const response = await Expense.updateOne({_id:req.params.id}, {...req.body});
    res.send(response.acknowledged);
});

route.delete("/:id", async(req, res) => {
    const expense = await Expense.findByIdAndDelete(req.params.id)
    res.send(expense);
});

const expenseRoute = route;

export default expenseRoute;
