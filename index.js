// index.js
const http = require('http');

// 1. Start a simple web server (DigitalOcean App Platform requires your app to bind to a port)
const port = process.env.PORT || 8080;
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Log Generator is Running seeing Live!\n');
});

server.listen(port, () => {
    console.log(`Server is actively running on port ${port}`);
});

// 2. Loop to generate fake production logs every 5 seconds
setInterval(() => {
    const levels = ['INFO', 'WARN', 'ERROR'];
    const randomLevel = levels[Math.floor(Math.random() * levels.length)];
    
    const logPayload = {
        timestamp: new Date().toISOString(),
        level: randomLevel,
        message: `App Platform auto-generated test log`,
        metrics: {
            memory_usage_mb: Math.floor(Math.random() * 200) + 50,
            active_connections: Math.floor(Math.random() * 20)
        }
    };

    // Printing to console sends it straight to DigitalOcean's log shipper
    console.log(JSON.stringify(logPayload));
}, 5000);
