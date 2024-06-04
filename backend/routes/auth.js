import express from "express";
import Employee from "../models/employee.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find({}, { _id: 0, __v: 0 });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const employee = await Employee.findOne(
      { email: username },
      { _id: 0 }
    ).populate("role");

    if (!employee) {
      return res.status(404).json({ message: "Username not found", ok: false });
    }
    console.log(employee["password"]);

    // const passwordMatch = await bcrypt.compare(password, employee.password);

    // if (!passwordMatch) {
    //   return res.status(400).json({ message: "Invalid password", ok: false });
    // }

    // Token Generation (for authentication in future requests)
    const token = jwt.sign({ employeeId: employee._id }, "ilovecode");

    res.json({
      message: "Login successful",
      ok: true,
      token,
      user: employee,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error", ok: false });
  }
});

router.patch("/:id", async (req, res) => {});

router.delete("/id", async (req, res) => {});

export default router;
