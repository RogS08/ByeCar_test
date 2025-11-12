require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');


// Use memory storage
const storage = multer.memoryStorage();

// File filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|PNG|JPG/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Only images of format .JPG and .PNG are allowed!'));
    }
};

// Initialize Multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB per file
    },
    fileFilter: fileFilter
});

const sendEmail = async (from, to, subject, message, attachments = []) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "pixelwrap1@gmail.com",
            pass: "lpujazhpldltravk",
        },
        tls: {
            rejectUnauthorized: false
        },
    });

    const options = {
        from: from,
        to: to,
        subject: subject,
        html: message,
        attachments: attachments
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(options, function (err, info) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("Email sent: " + info.response);
                resolve(info);
            }
        });
    });
};


module.exports = { sendEmail, upload };  