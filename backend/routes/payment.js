import express from 'express';
import Payment from '../models/payment.js';
const route = express.Router();


route.get("/", async(req, res) => {
    try {
        const payments = await Payment.find({},{__v:0});
        res.status(200).json(payments);
    } catch (error) {
        res.status(404).json(error);
    }
});
route.post("/", async(req, res) => {
    const payment = Payment({
        ...req.body
    });
    try {
        const response = await payment.save();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});

route.get("/:id", async(req, res) => {
    const payment = await Payment.find({_id:req.params.id})
    res.send(payment);
});

route.post("/:id", async(req, res) => {
    const response = await Payment.updateOne({_id:req.params.id}, {...req.body});
    res.send(response);
});

route.delete("/:id", async(req, res) => {
    const payment = await Payment.findByIdAndDelete(req.params.id)
    res.send(payment);
});

export default route;