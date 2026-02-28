import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const occasions = await request.json();
    const filePath = path.join(process.cwd(), 'public', 'data', 'occasions.json');
    
    // Write occasions to file
    await fs.writeFile(filePath, JSON.stringify(occasions, null, 2));
    
    return NextResponse.json({ 
      success: true, 
      message: 'Occasions updated successfully' 
    });
  } catch (error) {
    console.error('Error saving occasions:', error);
    return NextResponse.json(
      { error: 'Failed to save occasions' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'occasions.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const occasions = JSON.parse(fileContent);
    
    return NextResponse.json(occasions);
  } catch (error) {
    console.error('Error fetching occasions:', error);
    return NextResponse.json([]);
  }
}
