const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());

// POST route to receive list of emails and start sending phishing emails
app.post('/send-emails', async (req, res) => {
  const { emails, mailData } = req.body;

  // Create a transporter using nodemailer
  let transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email service provider here, e.g., 'gmail', 'hotmail', etc.
    auth: {
      user: 'harshitkandpal670@gmail.com', // Your email address
      pass: 'bdla cyvg xrqw fdej', // Your email password (use environment variables for security)
    },
  });

  // Loop through each email and send phishing email
  for (const email of emails) {
    let dataToSend = {
      email: email,
      subject: mailData.subject || 'Default Subject',
      text: mailData.body || 'Default Body',
    };

    try {
      let info = await transporter.sendMail({
        from: 'your_email@example.com', // Sender email address
        to: dataToSend.email, // Recipient email address
        subject: dataToSend.subject, // Subject line
        text: dataToSend.text, // Plain text body
      });

      console.log('Email sent to:', email);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  res.status(200).json({ message: 'Phishing emails sent successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
