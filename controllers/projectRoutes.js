const express = require('express');
const mongoose = require('mongoose');
const ResumeModel = require('../models/Resume'); 
const router = express.Router();

// Add project
router.post('/add-project/:resumeId', async (req, res) => {
  const { resumeId } = req.params;
  const projectData = req.body;

  try {
    const resume = await ResumeModel.findById(resumeId);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    resume.projects.push(projectData);
    await resume.save();
    res.status(200).json({ message: 'Project added successfully', resume });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Edit project
router.put('/edit-project/:resumeId/:projectId', async (req, res) => {
  const { resumeId, projectId } = req.params;
  const projectData = req.body;

  try {
    const resume = await ResumeModel.findById(resumeId);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const projectIndex = resume.projects.findIndex(proj => proj.id === projectId);
    if (projectIndex === -1) {
      return res.status(404).json({ message: 'Project not found' });
    }

    resume.projects[projectIndex] = { ...resume.projects[projectIndex], ...projectData };
    await resume.save();
    res.status(200).json({ message: 'Project updated successfully', resume });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
