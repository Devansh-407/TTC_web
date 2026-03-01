import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const aboutData = await request.json();
    const filePath = path.join(process.cwd(), 'public', 'data', 'about.json');
    
    // Ensure directory exists
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
    
    // Write about data to file
    await fs.writeFile(filePath, JSON.stringify(aboutData, null, 2), 'utf-8');
    
    return NextResponse.json({ 
      success: true, 
      message: 'About data updated successfully',
      data: aboutData
    });
  } catch (error: any) {
    console.error('Error saving about data:', error);
    return NextResponse.json(
      { error: 'Failed to save about data', details: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'about.json');
    
    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      // File doesn't exist, return empty object
      return NextResponse.json({});
    }
    
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const aboutData = JSON.parse(fileContent);
    
    return NextResponse.json(aboutData);
  } catch (error) {
    console.error('Error fetching about data:', error);
    return NextResponse.json({});
  }
}
