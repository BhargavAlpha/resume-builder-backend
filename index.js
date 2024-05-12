const express = require('express');
const app = express();
const cors = require('cors');
const dbConnect = require('./dbConnect');
const bodyParser = require('body-parser');
const { latex } = require('./controllers/latex');

app.use(cors()); 
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
dbConnect();

const port = 3000;

app.post('/generate_pdf', latex);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
