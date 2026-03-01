import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const ABOUT_FILE = path.join(process.cwd(), 'public', 'data', 'about.json');

// Helper function to read JSON file
async function readAboutData() {
  try {
    const data = await fs.promises.readFile(ABOUT_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // Return default about data if file doesn't exist
    return {
      hero: {
        title: "About Heartfelt Gifts",
        subtitle: "Creating memorable moments through personalized gifts that touch the heart",
        backgroundImage: "/about-hero-bg.jpg"
      },
      story: {
        title: "Our Story",
        content: "Founded with a passion for creating meaningful connections, Heartfelt Gifts began as a small workshop dedicated to crafting personalized presents. Today, we continue that tradition, helping people express their love and appreciation through unique, custom-made gifts.",
        image: "/about-story-image.jpg"
      },
      stats: {
        items: [
          { label: "Happy Customers", value: "10,000+" },
          { label: "Unique Gifts", value: "500+" },
          { label: "Years of Service", value: "5+" },
          { label: "Custom Designs", value: "1000+" }
        ]
      },
      team: {
        title: "Our Creative Team",
        members: []
      },
      values: {
        title: "Our Values",
        items: []
      },
      cta: {
        title: "Ready to Create Something Special?",
        subtitle: "Let us help you craft the perfect gift that will be cherished forever",
        buttonText: "Start Creating",
        buttonLink: "/gifts"
      }
    };
  }
}

// Helper function to write JSON file
async function writeAboutData(data) {
  try {
    // Ensure directory exists
    const dir = path.dirname(ABOUT_FILE);
    if (!fs.existsSync(dir)) {
      await fs.promises.mkdir(dir, { recursive: true });
    }
    
    await fs.promises.writeFile(ABOUT_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing about data:', error);
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

// GET handler - fetch about data
export async function GET() {
  try {
    const aboutData = await readAboutData();
    return NextResponse.json(aboutData, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error fetching about data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch about data' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}

// POST handler - save about data
export async function POST(request) {
  try {
    const aboutData = await request.json();
    
    // Validate the data structure
    if (!aboutData || typeof aboutData !== 'object') {
      return NextResponse.json(
        { error: 'Invalid about data format' },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    const success = await writeAboutData(aboutData);
    
    if (success) {
      return NextResponse.json({ 
        success: true, 
        message: 'About data saved successfully' 
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to save about data' },
        { 
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }
  } catch (error) {
    console.error('Error saving about data:', error);
    return NextResponse.json(
      { error: 'Failed to save about data' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}
