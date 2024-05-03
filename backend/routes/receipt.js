import express from 'express';
import Receipt from '../models/receipt.js';
const route = express.Router();


route.get("/", async(req, res) => {
    const receipts = await Receipt.find({});
    res.send(receipts);
});
route.post("/", async(req, res) => {
    const receipt = Receipt({
        ...req.body
    });
    await receipt.save();
    res.send({"message":"Success"});
});

route.get("/:id", async(req, res) => {
    const receipt = await Receipt.find({_id:req.params.id})
    res.send(receipt);
});

route.patch("/:id", async(req, res) => {
    const response = await Receipt.updateOne({_id:req.params.id}, {...req.body});
    res.send(response.acknowledged);
});

route.delete("/:id", async(req, res) => {
    const receipt = await Receipt.findByIdAndDelete(req.params.id)
    res.send(receipt);
});

const receiptRoute = route;

export default receiptRoute;