import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'products.json');
    
    // Read current products
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const products = JSON.parse(fileContent);
    
    // Filter out the product to delete
    const updatedProducts = products.filter((p: any) => p.id !== params.id);
    
    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(updatedProducts, null, 2));
    
    return NextResponse.json({ 
      success: true, 
      message: 'Product deleted successfully',
      data: updatedProducts 
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
