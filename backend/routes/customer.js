import express from 'express';
import Customer from '../models/customer.js';
const route = express.Router();

route.get("/",async(req, res) => {
    const customers = await Customer.find({},{password:0});
        res.send(customers);
    });

route.get("/:id",async(req, res) => {
    try {
        const customer = await Customer.findOne({_id:req.params.id});
        res.send(customer);
    } catch (error) {
        res.send(error);
    }
});

route.post("/",async(req, res) => {

    const customer = Customer({
       ...req.body
    });

    await customer.save();

    res.send({"message":"Data saved successfully"});
});

route.patch("/:id", async (req, res) => {
    const customer = await Customer.findOne({_id:req.params.id});
    console.log(customer);
   //updating logic here
 
     res.send({"message":"Data saved successfully"});
 });

 const customerRoute = route;
 export default customerRoute;
