const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const PORT = 3001; // Different port from main website

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Data paths - pointing to main website's data
const DATA_PATH = path.join(__dirname, '..', 'public', 'data');

// Ensure data directory exists
fs.ensureDirSync(DATA_PATH);

// Helper functions
async function readDataFile(filename) {
    try {
        const filePath = path.join(DATA_PATH, filename);
        if (await fs.pathExists(filePath)) {
            return await fs.readJson(filePath);
        }
        return [];
    } catch (error) {
        console.error(`Error reading ${filename}:`, error);
        return [];
    }
}

async function writeDataFile(filename, data) {
    try {
        const filePath = path.join(DATA_PATH, filename);
        await fs.writeJson(filePath, data, { spaces: 2 });
        return true;
    } catch (error) {
        console.error(`Error writing ${filename}:`, error);
        return false;
    }
}

// API Routes - Proxy to main website's data
app.get('/api/products', async (req, res) => {
    try {
        const products = await readDataFile('products.json');
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

app.post('/api/products', async (req, res) => {
    try {
        const success = await writeDataFile('products.json', req.body);
        if (success) {
            res.json({ success: true, message: 'Products updated successfully' });
        } else {
            res.status(500).json({ error: 'Failed to save products' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update products' });
    }
});

app.get('/api/categories', async (req, res) => {
    try {
        const categories = await readDataFile('categories.json');
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

app.post('/api/categories', async (req, res) => {
    try {
        const success = await writeDataFile('categories.json', req.body);
        if (success) {
            res.json({ success: true, message: 'Categories updated successfully' });
        } else {
            res.status(500).json({ error: 'Failed to save categories' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update categories' });
    }
});

app.get('/api/occasions', async (req, res) => {
    try {
        const occasions = await readDataFile('occasions.json');
        res.json(occasions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch occasions' });
    }
});

app.post('/api/occasions', async (req, res) => {
    try {
        const success = await writeDataFile('occasions.json', req.body);
        if (success) {
            res.json({ success: true, message: 'Occasions updated successfully' });
        } else {
            res.status(500).json({ error: 'Failed to save occasions' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update occasions' });
    }
});

app.get('/api/about', async (req, res) => {
    try {
        const about = await readDataFile('about.json');
        res.json(about);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch about data' });
    }
});

app.post('/api/about', async (req, res) => {
    try {
        const success = await writeDataFile('about.json', req.body);
        if (success) {
            res.json({ success: true, message: 'About data updated successfully' });
        } else {
            res.status(500).json({ error: 'Failed to save about data' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update about data' });
    }
});

// DELETE routes for products
app.delete('/api/products/:id', async (req, res) => {
    try {
        const products = await readDataFile('products.json');
        const productId = req.params.id;
        const updatedProducts = products.filter(p => p.id !== productId);
        const success = await writeDataFile('products.json', updatedProducts);
        if (success) {
            res.json({ success: true, message: 'Product deleted successfully', data: updatedProducts });
        } else {
            res.status(500).json({ error: 'Failed to delete product' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

// DELETE routes for categories
app.delete('/api/categories/:id', async (req, res) => {
    try {
        const categories = await readDataFile('categories.json');
        const categoryId = req.params.id;
        const updatedCategories = categories.filter(c => c.id !== categoryId && c.name !== categoryId);
        const success = await writeDataFile('categories.json', updatedCategories);
        if (success) {
            res.json({ success: true, message: 'Category deleted successfully', data: updatedCategories });
        } else {
            res.status(500).json({ error: 'Failed to delete category' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete category' });
    }
});

// DELETE routes for occasions
app.delete('/api/occasions/:id', async (req, res) => {
    try {
        const occasions = await readDataFile('occasions.json');
        const occasionId = req.params.id;
        const updatedOccasions = occasions.filter(o => o.id !== occasionId && o.name !== occasionId);
        const success = await writeDataFile('occasions.json', updatedOccasions);
        if (success) {
            res.json({ success: true, message: 'Occasion deleted successfully', data: updatedOccasions });
        } else {
            res.status(500).json({ error: 'Failed to delete occasion' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete occasion' });
    }
});

// Clear all data endpoint
app.delete('/api/clear-all', async (req, res) => {
    try {
        const { type } = req.query;
        let success = false;
        let message = '';
        
        switch(type) {
            case 'products':
                success = await writeDataFile('products.json', []);
                message = 'All products cleared successfully';
                break;
            case 'categories':
                success = await writeDataFile('categories.json', []);
                message = 'All categories cleared successfully';
                break;
            case 'occasions':
                success = await writeDataFile('occasions.json', []);
                message = 'All occasions cleared successfully';
                break;
            case 'all':
                await writeDataFile('products.json', []);
                await writeDataFile('categories.json', []);
                await writeDataFile('occasions.json', []);
                success = true;
                message = 'All data cleared successfully';
                break;
            default:
                return res.status(400).json({ error: 'Invalid type specified' });
        }
        
        if (success) {
            res.json({ success: true, message });
        } else {
            res.status(500).json({ error: 'Failed to clear data' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to clear data' });
    }
});

// Serve the admin panel
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Admin Panel running on http://localhost:${PORT}`);
    console.log(`📊 Main website data connected to: ${DATA_PATH}`);
    console.log(`🔗 Main website should be running on: http://localhost:3000`);
});
