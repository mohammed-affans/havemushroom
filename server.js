const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files
app.use(express.static('.'));

// Serve main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve blog pages
app.get('/:page', (req, res) => {
    const page = req.params.page;
    const allowedPages = ['blog-health-benefits.html', 'blog-growing-guide.html', 'blog-culinary-guide.html'];
    
    if (allowedPages.includes(page)) {
        res.sendFile(path.join(__dirname, page));
    } else {
        res.status(404).send('Page not found');
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});