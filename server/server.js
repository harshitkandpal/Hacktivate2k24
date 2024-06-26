const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

let visitorCount = 0;

// Route to receive visitor count
app.post('/visitor-count', (req, res) => {
    visitorCount = req.body.count;
    console.log(`Received visitor count: ${visitorCount}`);
    res.sendStatus(200);
});

// Route to reset visitor count
app.post('/reset-visitor-count', (req, res) => {
    visitorCount = 0;
    console.log('Visitor count has been reset');
    res.sendStatus(200);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
