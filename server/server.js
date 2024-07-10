const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());

let isCampaignRunning = false;

// POST route to receive list of emails and start sending phishing emails
app.post('/send-emails', async (req, res) => {
  const { emails, mailData } = req.body;

  isCampaignRunning = true; // Start the campaign

  // Create a transporter using nodemailer
  let transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email service provider here, e.g., 'gmail', 'hotmail', etc.
    auth: {
      user: '', // Your email address
      pass: '', // Your email password (use environment variables for security)
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

  isCampaignRunning = false; // Stop the campaign after all emails are sent
  console.log('Phishing campaign stopped');

  // Notify client that emails are sent and campaign is stopped
  res.status(200).json({ message: 'Phishing emails sent successfully', campaignStatus: 'stopped' });
});

// Endpoint to check if campaign is running
app.get('/campaign-status', (req, res) => {
  res.status(200).json({ isCampaignRunning });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
