const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const { connectDB } = require('./config/connectDB');
const { latex } = require('./controllers/latex');
const { storeResumeData, getResumeData } = require('./controllers/UserData');
const educationRoutes = require('./controllers/educationController');
const projectRoutes = require('./controllers/projectController');
const experienceRoutes = require('./controllers/experienceController');
const certificateRoutes = require('./controllers/certificateController');

app.use(cors()); 
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
connectDB();


app.post('/resume/generate-pdf', latex);
app.post('/resume/store-data', storeResumeData);
app.post('/resume/get-data', getResumeData);
app.use('/resume/education', educationRoutes);
app.use('/resume/project', projectRoutes);
app.use('/resume/experience', experienceRoutes);
app.use('/resume/certificate', certificateRoutes);

app.get('/resume/hi', (req, res) => {
    res.send('Hi there!');
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
