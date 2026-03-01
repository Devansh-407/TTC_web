import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const occasions = await request.json();
    const filePath = path.join(process.cwd(), 'public', 'data', 'occasions.json');
    
    // Ensure directory exists
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
    
    // Write occasions to file
    await fs.writeFile(filePath, JSON.stringify(occasions, null, 2), 'utf-8');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Occasions updated successfully',
      data: occasions
    });
  } catch (error: any) {
    console.error('Error saving occasions:', error);
    return NextResponse.json(
      { error: 'Failed to save occasions', details: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'occasions.json');
    
    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      // File doesn't exist, return empty array
      return NextResponse.json([]);
    }
    
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const occasions = JSON.parse(fileContent);
    
    return NextResponse.json(occasions);
  } catch (error) {
    console.error('Error fetching occasions:', error);
    return NextResponse.json([]);
  }
}
