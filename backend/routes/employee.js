import express from 'express';
import Employee from '../models/employee.js';
const router = express.Router();

router.get("/", async(req,res) => {
    try {
        const employees = await Employee.find({});
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/:id", async(req, res) => {
    const id = req.params.id;
    try {
        const employee = await Employee.findOne({_id:id});
        res.status(200).json(employee);
    } catch (error) {
        res.status(404).json(error);
    }
});

router.post("/", async(req, res)=>{
    
    try {
        const epmloyee = Employee({
            ...req.body
        });
        const res = await employee.save();
        res.status(201).json(res);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.patch("/:id", async(req, res)=> {
    const id = req.params.id;
    try {
      const employee =  await Employee.updateOne({_id:id},{...req.body});
      res.status(200).json(employee);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete("/id", async(req,res)=>{
    const id = req.params.id;
    try {
        await Employee.findByIdAndDelete(id);
    } catch (error) {
        
    }
});

export default router;