const express = require('express');
const mongoose = require('mongoose');
const ResumeModel = require('../models/Resume'); 
const router = express.Router();

// Add education
router.post('/add-education/:resumeId', async (req, res) => {
  const { resumeId } = req.params;
  const educationData = req.body;

  try {
    const resume = await ResumeModel.findById(resumeId);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    resume.education.push(educationData);
    await resume.save();
    res.status(200).json({ message: 'Education added successfully', resume });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Edit education
router.put('/edit-education/:resumeId/:educationId', async (req, res) => {
  const { resumeId, educationId } = req.params;
  const educationData = req.body;

  try {
    const resume = await ResumeModel.findById(resumeId);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const educationIndex = resume.education.findIndex(edu => edu.id === educationId);
    if (educationIndex === -1) {
      return res.status(404).json({ message: 'Education not found' });
    }

    resume.education[educationIndex] = { ...resume.education[educationIndex], ...educationData };
    await resume.save();
    res.status(200).json({ message: 'Education updated successfully', resume });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
