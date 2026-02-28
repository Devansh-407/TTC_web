import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const CATEGORIES_FILE = path.join(process.cwd(), 'public', 'data', 'categories.json');

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
        console.log('✅ Categories saved successfully');
        return true;
    } catch (error) {
        console.error('Error writing JSON file:', error);
        return false;
    }
}

// GET - Fetch categories
export async function GET() {
    try {
        const categories = await readJSON(CATEGORIES_FILE);
        return NextResponse.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}

// POST - Update categories
export async function POST(request: NextRequest) {
    try {
        const categories = await request.json();
        const success = await writeJSON(CATEGORIES_FILE, categories);
        
        if (success) {
            return NextResponse.json({ success: true, message: 'Categories updated successfully' });
        } else {
            return NextResponse.json({ error: 'Failed to save categories' }, { status: 500 });
        }
    } catch (error) {
        console.error('Error updating categories:', error);
        return NextResponse.json({ error: 'Failed to update categories' }, { status: 500 });
    }
}
