import express from 'express';
import Security from '../models/security.js';
const route = express.Router();

route.get("/",async(req, res) => {
    const securities = await Security.find({},{password:0});
        res.send(securities);
    });

route.get("/:id",async(req, res) => {
    try {
        const security = await Security.findOne({_id:req.params.id});
        res.send(security);
    } catch (error) {
        res.send(error);
    }
});

route.post("/",async(req, res) => {
    const order = Security({
        ...req.body
    });
    await order.save();
    res.send({"message":"Data saved successfully"});
});

route.patch("/:id", async (req, res) => {
    const security = await Security.findOne({_id:req.params.id});
    console.log(security);
     res.send({"message":"Data saved successfully"});
 });

 const securityRoute = route;
 export default securityRoute;