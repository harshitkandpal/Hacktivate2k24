const express = require('express');
const http = require('http'); 
const app = express();
const server = http.createServer(app);

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
});