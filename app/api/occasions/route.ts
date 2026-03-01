import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const OCCASIONS_FILE = path.join(process.cwd(), 'public', 'data', 'occasions.json');

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
        console.log('✅ Occasions saved successfully');
        return true;
    } catch (error) {
        console.error('Error writing JSON file:', error);
        return false;
    }
}

// OPTIONS - Handle CORS preflight requests
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}

// GET - Fetch occasions
export async function GET() {
    try {
        const occasions = await readJSON(OCCASIONS_FILE);
        return NextResponse.json(occasions, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        });
    } catch (error) {
        console.error('Error fetching occasions:', error);
        return NextResponse.json({ error: 'Failed to fetch occasions' }, { 
            status: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        });
    }
}

// POST - Update occasions
export async function POST(request: NextRequest) {
    try {
        const occasions = await request.json();
        const success = await writeJSON(OCCASIONS_FILE, occasions);
        
        if (success) {
            return NextResponse.json({ success: true, message: 'Occasions updated successfully' }, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            });
        } else {
            return NextResponse.json({ error: 'Failed to save occasions' }, { 
                status: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            });
        }
    } catch (error) {
        console.error('Error updating occasions:', error);
        return NextResponse.json({ error: 'Failed to update occasions' }, { 
            status: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        });
    }
}
