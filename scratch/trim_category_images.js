import { Jimp } from 'jimp';
import path from 'path';

const assetsDir = 'c:/Users/Vaibhav Jain/Downloads/AP Oswal re design/src/assets';
const files = [
  'baby_sweater.png',
  'baby_frock.png',
  'baby_onesie.png',
  'baby_blanket.png',
  'baby_beanie.png'
];

async function main() {
  for (const file of files) {
    const filePath = path.join(assetsDir, file);
    console.log(`Processing ${file}...`);
    try {
      const image = await Jimp.read(filePath);
      image.autocrop();
      await image.write(filePath);
      console.log(`Successfully trimmed and saved ${file}`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
}

main();
