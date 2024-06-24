import DSE from "../models/dse.js";
export const createDSE = async (req, res) => {
  //Validate inputs
  try {
    const dse = new DSE({
      ...req.body,
    });
    const dseResult = await dse.save();
    if (!dseResult) {
      return res
        .status(500)
        .json({ success: false, message: "Ooops! something went wrong" });
    }
    res.status(200).json({ success: true, data: dseResult });
  } catch (error) {
    console.log(error);
  }
};
