import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const PRODUCTS_FILE = path.join(process.cwd(), 'public', 'data', 'products.json');

// Helper functions
async function readJSON(filePath: string) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading JSON file:', error);
        return [];
    }
}

async function writeJSON(filePath: string, data: any) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
        console.log('✅ Products saved successfully');
        return true;
    } catch (error) {
        console.error('Error writing JSON file:', error);
        return false;
    }
}

// GET - Fetch products
export async function GET() {
    try {
        const products = await readJSON(PRODUCTS_FILE);
        return NextResponse.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

// POST - Update products
export async function POST(request: NextRequest) {
    try {
        const products = await request.json();
        const success = await writeJSON(PRODUCTS_FILE, products);
        
        if (success) {
            return NextResponse.json({ success: true, message: 'Products updated successfully' });
        } else {
            return NextResponse.json({ error: 'Failed to save products' }, { status: 500 });
        }
    } catch (error) {
        console.error('Error updating products:', error);
        return NextResponse.json({ error: 'Failed to update products' }, { status: 500 });
    }
}
