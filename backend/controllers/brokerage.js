import Brokerage from "../models/brokerage.js";
export const createBrokerage = async (req, res) => {
  //Validate inputs
  try {
    const brokerage = new Brokerage({
      ...req.body,
    });
    const brokerageResult = await brokerage.save();
    if (!brokerageResult) {
      return res
        .status(500)
        .json({ success: false, message: "Ooops! something went wrong" });
    }
    res.status(200).json({ success: true, data: brokerageResult });
  } catch (error) {
    console.log(error);
  }
};
