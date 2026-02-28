import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const categories = await request.json();
    const filePath = path.join(process.cwd(), 'public', 'data', 'categories.json');
    
    // Ensure directory exists
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
    
    // Write categories to file
    await fs.writeFile(filePath, JSON.stringify(categories, null, 2), 'utf-8');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Categories updated successfully',
      data: categories
    });
  } catch (error: any) {
    console.error('Error saving categories:', error);
    return NextResponse.json(
      { error: 'Failed to save categories', details: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'categories.json');
    
    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      // File doesn't exist, return empty array
      return NextResponse.json([]);
    }
    
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const categories = JSON.parse(fileContent);
    
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json([]);
  }
}
