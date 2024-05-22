const mongoose=require('mongoose');
const resumeSchema = new mongoose.Schema({
  name: String,
  email:String,
  phone: String,
  city: String,
  state: String,
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
  }]
});

const ResumeModel = mongoose.model('Resume', resumeSchema);

module.exports = ResumeModel;