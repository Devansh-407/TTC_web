const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files

// Data paths
const PRODUCTS_FILE = path.join(__dirname, 'public', 'data', 'products.json');
const CATEGORIES_FILE = path.join(__dirname, 'public', 'data', 'categories.json');

// Helper functions
async function readJSON(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading JSON file:', error);
        return [];
    }
}

async function writeJSON(filePath, data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
        console.log('✅ Data saved successfully');
        return true;
    } catch (error) {
        console.error('Error writing JSON file:', error);
        return false;
    }
}

// API Routes

// Get products
app.get('/api/products', async (req, res) => {
    try {
        const products = await readJSON(PRODUCTS_FILE);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Get categories
app.get('/api/categories', async (req, res) => {
    try {
        const categories = await readJSON(CATEGORIES_FILE);
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

// Update products
app.post('/api/products', async (req, res) => {
    try {
        const products = req.body;
        const success = await writeJSON(PRODUCTS_FILE, products);
        
        if (success) {
            res.json({ success: true, message: 'Products updated successfully' });
        } else {
            res.status(500).json({ error: 'Failed to save products' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update products' });
    }
});

// Update categories
app.post('/api/categories', async (req, res) => {
    try {
        const categories = req.body;
        const success = await writeJSON(CATEGORIES_FILE, categories);
        
        if (success) {
            res.json({ success: true, message: 'Categories updated successfully' });
        } else {
            res.status(500).json({ error: 'Failed to save categories' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update categories' });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📁 Serving files from: ${path.join(__dirname, 'public')}`);
    console.log(`🔗 Admin Panel: http://localhost:${PORT}/admin/index.html`);
    console.log(`🌐 Main Website: http://localhost:${PORT}`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n👋 Server shutting down gracefully...');
    process.exit(0);
});
