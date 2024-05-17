const fs = require('fs');
const generateLatex = require('./generateLatex').generateLatex;
const path = require('path');


const latex = async (req, res) => {
    const data = req.body.userData;
    const latexCode = generateLatex(data);
    fs.writeFile('output.tex', latexCode, (err) => {
        if (err) {
            console.error('Error writing LaTeX code to file:', err);
            return res.status(500).send('Internal Server Error');
        }
        console.log('LaTeX code has been written to output.tex');
        
        const { spawn } = require('child_process');
        const pdflatex = spawn('pdflatex', ['-output-directory', './', 'output.tex']);
        
        pdflatex.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });
        
        pdflatex.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });
        
        pdflatex.on('close', (code) => {
            console.log(`pdflatex process exited with code ${code}`);
            if (code === 0) {
                console.log('PDF generated successfully');
                
                // Sending the PDF file to the frontend
                res.sendFile(path.join(__dirname, '..', 'output.pdf'), (err) => {
                    if (err) {
                        console.error('Error sending PDF file:', err);
                        return res.status(500).send('Internal Server Error');
                    }
                    console.log('PDF file sent to the frontend');
                    
                    // Deleting the PDF file from the backend
                    // fs.unlink('output.pdf', (err) => {
                    //     if (err) {
                    //         console.error('Error deleting PDF file:', err);
                    //     } else {
                    //         console.log('PDF file deleted from the backend');
                    //     }
                    // });
                });
            } else {
                console.log('PDF generation failed');
                return res.status(500).send('PDF generation failed');
            }
        });
    });
};

module.exports = { latex };
