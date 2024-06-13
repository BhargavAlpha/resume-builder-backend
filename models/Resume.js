const mongoose=require('mongoose');
const resumeSchema = new mongoose.Schema({
  name: String,
  email:String,
  phone: String,
  city: String,
  state: String,
  position: String,
  company: String,
  linkedin: String,
  github: String,
  education: [{
    college: String,
    city: String,
    degree: String,
    cgpa: String,
    startDate: String,
    endDate: String
  }],
  projects: [{
    name: String,
    techStack: String,
    date: String,
    description: [String],
    link: String
  }],
  internships: [{
    company: String,
    role: String,
    startDate: String,
    endDate: String,
    description: [String],
    link: String,
    jobType: String,
    skills:String
  }],
  certifications: [{
    certificateName: String,
    certificateLink: String,
  }],
  technicalSkills:{
    languages: [String],
    tools: [String],
    frameworks: [String]
  }
});

const ResumeModel = mongoose.model('Resume', resumeSchema);

module.exports = ResumeModel;