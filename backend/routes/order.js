import express from "express";
import Order from "../models/order.js";
const route = express.Router();

route.get("/", async (req, res) => {
  console.log("inafika");
  const orders = await Order.find({}, { password: 0 })
    .populate("customer")
    .populate("security");
  res.send(JSON.stringify(orders));
});

route.get("/dealing", async (req, res) => {
  try {
    const orders = await Order.find({ balance: { $ne: 0 } })
      .populate("customer")
      .populate("security");

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

route.get("/:id", async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id });
    res.send(order);
  } catch (error) {
    res.send(error);
  }
});

route.post("/", async (req, res) => {
  const order = Order({
    ...req.body,
  });

  await order.save();

  res.send({ message: "Data saved successfully" });
});

route.patch("/:id", async (req, res) => {
  const customer = await Customer.findOne({ _id: req.params.id });
  console.log(customer);
  //updating logic here

  res.send({ message: "Data saved successfully" });
});

const orderRoute = route;
export default orderRoute;
