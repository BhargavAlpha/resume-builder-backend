const express = require('express');
const mongoose = require('mongoose');
const ResumeModel = require('../models/Resume'); 
const router = express.Router();

// Add a certification to a resume
router.post('/add-certification/:resumeId', async (req, res) => {
  const { resumeId } = req.params;
  const certificateData = req.body;

  try {
    const resume = await ResumeModel.findById(resumeId);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    resume.certifications.push(certificateData);
    await resume.save();
    res.status(200).json({ message: 'Certification added successfully', resume });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Edit a certification within a resume
router.put('/edit-certification/:resumeId/:certificationId', async (req, res) => {
  const { resumeId, certificationId } = req.params;
  const certificateData = req.body;

  try {
    const resume = await ResumeModel.findById(resumeId);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const certificateIndex = resume.certifications.findIndex(cert => cert.id === certificationId);
    if (certificateIndex === -1) {
      return res.status(404).json({ message: 'Certification not found' });
    }

    resume.certifications[certificateIndex] = { ...resume.certifications[certificateIndex], ...certificateData };
    await resume.save();
    res.status(200).json({ message: 'Certificate updated successfully', resume });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});
router.delete('/delete-certificate/:resumeId/:certificateId', async (req, res) => {
    const { resumeId, certificateId } = req.params;
  
    try {
      const resume = await ResumeModel.findById(resumeId);
      if (!resume) {
        return res.status(404).json({ message: 'Resume not found' });
      }
  
      const certiIndex = resume.certifications.findIndex(certi => certi.id === certificateId);
      if (certiIndex === -1) {
        return res.status(404).json({ message: 'Certificate not found' });
      }
  
      resume.certifications.splice(certiIndex, 1);
      await resume.save();
      res.status(200).json({ message: 'Cetificate deleted successfully', resume });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });

module.exports = router;
