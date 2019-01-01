import express from "express";
import Employee from "../models/employee.js";
import nodemailer from "nodemailer";
import crypto from 'crypto';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Customer from "../models/customer.js";
const router = express.Router();

const generateActivationToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

const activationTokens = {};


let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "curtisisaac36@gmail.com", // replace with your email
    pass: "mpee ioxs pbyv juss", // replace with your password
  },
});


router.post("/signup/clients", async(req, res)=>{
  const {email, password} = req.body;
  const token = generateActivationToken();

  activationTokens[email] = token;

  const activationLink = `http://localhost:5001/activate?email=${encodeURIComponent(
    email
  )}&token=${token}`;

  const mailOptions = {
    from: "curtisisaac36@gmail.com",
    to: email,
    subject: "Account Activation",
    text: `Click the following link to activate your account: ${activationLink}`,
  };
  try {
    // Send email with PDF attachment
    let info = await transporter.sendMail(mailOptions);
    if (!info) {
      throw new Error("Failed to send email");
    }
    const customer = Customer({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      dob: req.body.dob,
      idType:req.body.identity,
      idNumber:req.body.identity_no
    });
    const result = await customer.save();
    console.log(result);
    
    res.status(200).json({ message: "Email sent successfully" });
    
  } catch (error) {
    res.status(500).json({message:`${error}`})
  }
});

router.post("/login/clients", async (req, res) => {
  const { email, password } = req.body;

  try {
  console.log({email, password});
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error", ok: false });
  }
});

router.post("/login/employees", async (req, res) => {
  const { username, password } = req.body;
  console.log({username, password});

  try {
    const employee = await Employee.findOne(
      { email: username },
      { _id: 0 }
    ).populate("role");

    if (!employee) {
      return res.status(404).json({ message: "Username not found", ok: false });
    }
    // Token Generation (for authentication in future requests)
    const token = jwt.sign({ employeeId: employee._id }, "ilovecode");

    res.json({
      message: "Login successful",
      token,
      user: employee,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error", ok: false });
  }
});

export default router;
