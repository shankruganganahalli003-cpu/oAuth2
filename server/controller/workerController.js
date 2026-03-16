const Worker = require("../models/Worker");

exports.createWorker = async (req, res) => {
  try {
    const { gender, dob, phone, location, skills, country, state, city ,image } = req.body;

    if (!gender || !dob || !phone || !location || !skills || !country || !state || !city)
      return res.status(400).json({ message: "All fields are required" });

    const worker = await Worker.create({
      gender,
      dob,
      phone,
      location,
      skills,
      country,
      state,
      image,
      city,
      userId: req.userId,
    });

    res.status(200).json({ success: true, worker });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getAllWorkers = async (req, res) => {
  try {
    const workers = await Worker.find();
    res.status(200).json({ success: true, workers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports.getme = async (req,res) => {
  try{

    const get = await Worker.find({userId:req.userId});
    return res.status(200).json({success:true,get});


  }catch(err){
    console.log(err.message);
  }
  
}