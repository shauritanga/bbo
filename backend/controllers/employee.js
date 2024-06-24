import Employee from "../models/employee.js";
export const addEmployee = async (req, res) => {
  const employee = new Employee({ ...req.body });
  const employeeResults = await employee.save();
  if (!employeeResults) {
    return res.status(400).json({ message: "Failed to add employee" });
  }
  res.status(201).json(employeeResults);
};
