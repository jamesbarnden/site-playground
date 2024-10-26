import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

interface ImageData {
  src: string;
  alt: string;
  tags: string[];
}

export async function GET() {
  const photosDirectory = path.join(process.cwd(), 'public', 'photographs');
  
  try {
    const images = await scanDirectory(photosDirectory);
    return NextResponse.json(images);
  } catch (error) {
    console.error('Error reading photos directory:', error);
    return NextResponse.json({ error: 'Unable to read photos directory' }, { status: 500 });
  }
}

async function scanDirectory(dir: string): Promise<ImageData[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const images: ImageData[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const subDirImages = await scanDirectory(fullPath);
      images.push(...subDirImages);
    } else if (entry.isFile() && /\.(jpg|jpeg|png|gif)$/i.test(entry.name)) {
      const imageData = await getImageData(fullPath);
      images.push(imageData);
    }
  }

  return images;
}

function getTagsFromPath(filePath: string): string[] {
  const relativePath = path.relative(path.join(process.cwd(), 'public', 'photographs'), filePath);
  const pathParts = relativePath.split(path.sep);
  
  const tags: string[] = [];
  pathParts.forEach(part => {
    const match = part.match(/^(\d{4})\.(\d{2})\.(\d{2})\s+(.+)$/);
    if (match) {
      const [, year, month, , location] = match;
      tags.push(year, getMonthName(parseInt(month)), location);
    }
  });
  
  return tags;
}

function getMonthName(month: number): string {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[month - 1];
}

async function getImageData(filePath: string): Promise<ImageData> {
  const relativePath = path.relative(path.join(process.cwd(), 'public'), filePath);
  const src = '/' + relativePath.replace(/\\/g, '/');
  const alt = path.basename(filePath, path.extname(filePath));
  
  const tags = getTagsFromPath(filePath);
  const metadata = await getImageMetadata(filePath);
  
  console.log(`File: ${src}`);
  console.log(`IPTC Tags: ${metadata.tags.join(', ')}`);
  console.log(`Path Tags: ${tags.join(', ')}`);
  
  return {
    src,
    alt,
    tags: [...tags, ...metadata.tags]
  };
}

async function getImageMetadata(filePath: string): Promise<{ tags: string[] }> {
  try {
    const metadata = await sharp(filePath).metadata();
    if (metadata.iptc) {
      const iptcData = metadata.iptc;
      
      // Look for the IPTC Keywords tag (hex: 2:25)
      const keywordMarker = Buffer.from([0x02, 0x25]);
      let index = iptcData.indexOf(keywordMarker);
      
      if (index !== -1) {
        index += keywordMarker.length + 2; // Skip marker and length bytes
        const length = iptcData.readUInt16BE(index - 2);
        const keywordsBuffer = iptcData.slice(index, index + length);
        
        // Split keywords by null terminator and filter out empty strings
        const keywords = keywordsBuffer.toString('utf-8').split('\0').filter(Boolean);
        
        // Trim whitespace and filter out any remaining empty strings
        return { tags: keywords.map(k => k.trim()).filter(Boolean) };
      }
    }
  } catch (error) {
    console.error(`Error reading metadata for ${filePath}:`, error);
  }
  
  // Return an empty array if no valid keywords were found
  return { tags: [] };
}
