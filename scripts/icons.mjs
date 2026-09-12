import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const src = 'public/favicon.svg';

const png32 = await sharp(src).resize(32, 32).png().toBuffer();
const png180 = await sharp(src).resize(180, 180).png().toBuffer();

await writeFile('public/favicon-32.png', png32);
await writeFile('public/apple-touch-icon.png', png180);
await writeFile('public/favicon.ico', pngToIco(png32, 32));

function pngToIco(png, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const entry = Buffer.alloc(16);
  entry.writeUInt8(size, 0);
  entry.writeUInt8(size, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(22, 12);

  return Buffer.concat([header, entry, png]);
}
