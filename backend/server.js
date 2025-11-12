require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const express = require('express'); // rempve?
const { sendEmail, upload } = require('./Utils/sendEmail');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());



// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}


app.get('/', (req, res) => {
    res.send('Backend server is running, hello from vercel');
});

app.post('/api/sendemail', upload.array('fotos', 10), async (req, res) => {
    try {
        // Parse step1 and step2 - check if they're already objects or strings
        let step1, step2;
        
        try {
            step1 = typeof req.body.step1 === 'string' 
                ? JSON.parse(req.body.step1) 
                : req.body.step1 || {};
        } catch (e) {
            console.error('Error parsing step1:', e);
            step1 = {};
        }
        
        try {
            step2 = typeof req.body.step2 === 'string' 
                ? JSON.parse(req.body.step2) 
                : req.body.step2 || {};
        } catch (e) {
            console.error('Error parsing step2:', e);
            step2 = {};
        }
        
        console.log('Received step1:', step1);
        console.log('Received step2:', step2);
        console.log('Files received:', req.files?.length || 0);
        
        const from = process.env.SENDER_EMAIL;
        const to = process.env.ADMIN_EMAIL;
        const subject = "nieuwe inzending via Byecar.nl";
        
        const message = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: auto;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background-color: #ffffffff;
            padding: 20px;
        }
        .logo {
            width: 235px;
            height: 80px;
        }
        .content {
            padding: 30px;
        }
        h1 {
            color: #2c3e50;
            font-size: 24px;
            margin-bottom: 20px;
            border-bottom: 3px solid #0075de;
            padding-bottom: 10px;
        }
        h2 {
            color: #0075de;
            font-size: 18px;
            margin-top: 25px;
            margin-bottom: 15px;
        }
        .data-box {
            background-color: #ecf0f1;
            border-left: 4px solid #0075de;
            padding: 15px;
            margin: 15px 0;
            border-radius: 4px;
            overflow-x: auto;
        }
        pre {
            margin: 0;
            font-family: 'Courier New', monospace;
            font-size: 13px;
            line-height: 1.6;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        .footer {
            background-color: #ffffffff;
            color: #282828ff;
            text-align: center;
            padding: 15px;
            font-size: 12px;
        }
        .attachment-info {
            background-color: #e8f4f8;
            border-left: 4px solid #0075de;
            padding: 10px 15px;
            margin: 10px 0;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="cid:logo" class="logo" alt="Byecar Logo"/>
        </div>
        <div class="content">
            <h1>Nieuwe auto overname aanvraag</h1>
            
            <h2>📋 Stap 1: Algemene informatie</h2>
            <div class="data-box">
                <pre>${JSON.stringify(step1, null, 2)}</pre>
            </div>
            
            <h2>📋 Stap 2: Voertuig staat & onderhoud gegevens</h2>
            <div class="data-box">
                <pre>${JSON.stringify(step2, null, 2)}</pre>
            </div>
            
            <h2>📎 Bijgevoegde foto's</h2>
            ${req.files && req.files.length > 0 ? `
            <div class="attachment-info">
                <p><strong>${req.files.length} foto('s) bijgevoegd</strong></p>
                <ul>
                    ${req.files.map(file => `<li>$${file.originalname} ($$ {(file.size / 1024).toFixed(2)} KB)</li>`).join('')}
                </ul>
            </div>
            ` : ''}
        </div>
        <div class="footer">
            © ${new Date().getFullYear()} Byecar.nl - Alle rechten voorbehouden
        </div>
    </div>
</body>
</html>
`;

        const attachments = [
            {
                path: process.env.BRAND_LOGO_URL,
                cid: 'logo',
            }
        ];

        // Add uploaded files
        if (req.files && req.files.length > 0) {
            req.files.forEach(file => {
                attachments.push({
                    filename: file.originalname,
                    content: file.buffer,
                    contentType: file.mimetype
                });
            });
        }

        await sendEmail(from, to, subject, message, attachments);

        res.status(200).json({ 
            success: true, 
            message: 'Email sent successfully',
            filesUploaded: req.files ? req.files.length : 0
        });

    } catch (error) {
        console.error('Error sending email:', error);
        
        res.status(500).json({ 
            success: false,
            message: 'Failed to send email', 
            error: error.message 
        });
    }
});

// Error handling middleware
app.use((error, req, res, next) => {
    if (error instanceof require('multer').MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: 'Bestand is te groot. Maximale grootte is 10MB per bestand.'
            });
        }
        if (error.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({
                success: false,
                message: 'Te veel bestanden. Maximum is 10 bestanden.'
            });
        }
    }
    
    res.status(500).json({
        success: false,
        message: error.message
    });
});

module.exports = app;