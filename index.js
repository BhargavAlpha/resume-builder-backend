const express = require('express');
const app = express();
const cors = require('cors');
const dbConnect = require('./dbConnect');
const bodyParser = require('body-parser');
require('dotenv').config();
const { latex } = require('./controllers/latex');

app.use(cors()); 
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
dbConnect();



app.post('/resume/generate-pdf', latex);
app.get('/resume/hi', (req, res) => {
    res.send('Hi there!');
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
