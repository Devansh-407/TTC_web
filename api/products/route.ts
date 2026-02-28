import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const products = await request.json();
    const filePath = path.join(process.cwd(), 'public', 'data', 'products.json');
    
    // Ensure directory exists
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
    
    // Write products to file
    await fs.writeFile(filePath, JSON.stringify(products, null, 2), 'utf-8');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Products updated successfully',
      data: products
    });
  } catch (error: any) {
    console.error('Error saving products:', error);
    return NextResponse.json(
      { error: 'Failed to save products', details: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'products.json');
    
    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      // File doesn't exist, return empty array
      return NextResponse.json([]);
    }
    
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const products = JSON.parse(fileContent);
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json([]);
  }
}
