import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'occasions.json');
    
    // Read current occasions
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const occasions = JSON.parse(fileContent);
    
    // Filter out the occasion to delete (by both id and name)
    const updatedOccasions = occasions.filter((o: any) => 
      o.id !== params.id && o.name !== params.id
    );
    
    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(updatedOccasions, null, 2));
    
    return NextResponse.json({ 
      success: true, 
      message: 'Occasion deleted successfully',
      data: updatedOccasions 
    });
  } catch (error) {
    console.error('Error deleting occasion:', error);
    return NextResponse.json(
      { error: 'Failed to delete occasion' },
      { status: 500 }
    );
  }
}
