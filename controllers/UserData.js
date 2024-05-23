const ResumeModel = require('../models/Resume');

async function storeResumeData(req, res) {
  try {
    const resume = new ResumeModel(req.body);
    await resume.save();
    res.status(201).send(resume);
    console.log(resume);
  } catch (error) {
    res.status(400).send(error);
}}
 
async function getResumeData(req, res) {
    const email=req.body.email;
    console.log(email);
    try {
        const resume = await ResumeModel.findOne({email:email});
        if (!resume) {
          console.log("Resume not found");
          return res.status(404).send({ error: "Resume not found" });
      }
        res.status(200).send(resume);
        console.log(resume);
    } catch (error) {
        res.status(500).send(error);
}}
module.exports = { storeResumeData, getResumeData };
