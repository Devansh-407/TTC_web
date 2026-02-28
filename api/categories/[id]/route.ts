import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'categories.json');
    
    // Read current categories
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const categories = JSON.parse(fileContent);
    
    // Filter out the category to delete (by both id and name)
    const updatedCategories = categories.filter((c: any) => 
      c.id !== params.id && c.name !== params.id
    );
    
    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(updatedCategories, null, 2));
    
    return NextResponse.json({ 
      success: true, 
      message: 'Category deleted successfully',
      data: updatedCategories 
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}
