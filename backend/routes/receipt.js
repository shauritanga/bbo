import express from 'express';
import Receipt from '../models/receipt.js';
const route = express.Router();


route.get("/", async(req, res) => {
    try {
        const receipts = await Receipt.find({},{__v:0});
        res.status(200).json(receipts);
    } catch (error) {
        res.status(404).json(error);
    }
});
route.post("/", async(req, res) => {
    const receipt = Receipt({
        ...req.body
    });
    try {
        const response = await receipt.save();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});

route.get("/:id", async(req, res) => {
    const receipt = await Receipt.find({_id:req.params.id})
    res.send(receipt);
});

route.post("/:id", async(req, res) => {
    const response = await Receipt.updateOne({_id:req.params.id}, {...req.body});
    res.send(response.acknowledged);
});

route.delete("/:id", async(req, res) => {
    const receipt = await Receipt.findByIdAndDelete(req.params.id)
    res.send(receipt);
});

const receiptRoute = route;

export default receiptRoute;