const express = require('express');
const mongoose = require('mongoose');
const ResumeModel = require('../models/Resume'); 
const router = express.Router();

// Add project
router.post('/add-experience/:resumeId', async (req, res) => {
  const { resumeId } = req.params;
  const experienceData = req.body;
  try {
    const resume = await ResumeModel.findById(resumeId);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    resume.internships.push(experienceData);
    await resume.save();
    res.status(200).json({ message: 'Project added successfully', resume });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Edit project
router.put('/edit-experience/:resumeId/:experienceId', async (req, res) => {
  const { resumeId, experienceId } = req.params;
  const experienceData = req.body;
  console.log("put request received");
  try {
    const resume = await ResumeModel.findById(resumeId);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const experienceIndex = resume.internships.findIndex(exp => exp.id === experienceId) ;
    if (experienceIndex === -1) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    resume.internships[experienceIndex] = { ...resume.internships[experienceIndex], ...experienceData };
    await resume.save();
    res.status(200).json({ message: 'Experience updated successfully', resume });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});
router.delete('/delete-experience/:resumeId/:experienceId', async (req, res) => {
  const { resumeId, experienceId } = req.params;

  try {
    const resume = await ResumeModel.findById(resumeId);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const experienceIndex = resume.internships.findIndex(expi => expi.id === experienceId);
    if (experienceIndex === -1) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    resume.internships.splice(experienceIndex, 1);
    await resume.save();
    res.status(200).json({ message: 'Experience deleted successfully', resume });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;


module.exports = router;
