import fs from 'fs';
import path from 'path';

const workspaceDir = 'c:\\Users\\Vaibhav Jain\\Downloads\\AP Oswal re design';
const frocksCsvPath = path.join(workspaceDir, 'src', 'assets', 'frocks.csv');
const roundNeckCsvPath = path.join(workspaceDir, 'src', 'assets', 'round neck sweateers.csv');
const productsJsonPath = path.join(workspaceDir, 'src', 'data', 'products.json');

function parseCsv(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const header = lines[0].split(',');
  
  const records = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const row = [];
    let insideQuote = false;
    let entry = '';
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') {
        insideQuote = !insideQuote;
      } else if (char === ',' && !insideQuote) {
        row.push(entry);
        entry = '';
      } else {
        entry += char;
      }
    }
    row.push(entry);
    
    if (row.length > 0 && row[0]) {
      const record = {};
      header.forEach((colName, index) => {
        record[colName.trim()] = row[index] ? row[index].trim() : '';
      });
      records.push(record);
    }
  }
  return records;
}

// Strip HTML helper
function cleanDescription(desc) {
  if (!desc) return '';
  return desc.replace(/<[^>]*>/g, '').trim();
}

const frocksCsv = parseCsv(frocksCsvPath);
const roundNeckCsv = parseCsv(roundNeckCsvPath);
const products = JSON.parse(fs.readFileSync(productsJsonPath, 'utf-8'));

// Filter out old frocks and sweaters
const nonFrocksSweaters = products.filter(p => p.category !== 'frocks' && p.category !== 'sweaters');

const newFrocks = frocksCsv.map((row, idx) => {
  const priceVal = parseFloat(row.price);
  const price = (priceVal && priceVal > 0) ? priceVal : 599; // Default price if 0.0
  const originalPrice = Math.round(price * 1.6 / 10) * 10 - 1; // Nearest 99 or similar
  const discount = `${Math.round((originalPrice - price) / originalPrice * 100)}% OFF`;
  
  const imgFile = row.productImageUrl.split(';')[0];
  const imageUrl = `https://static.wixstatic.com/media/${imgFile}`;
  
  const desc = cleanDescription(row.description) || "Ap Oswal high-quality woolen frock, crafted with ultra-soft baby grade wool. Features a comfortable lightweight fit and keeps your child warm all winter.";

  return {
    id: `prod-frock-${(idx + 1).toString().padStart(3, '0')}`,
    name: row.name,
    category: "frocks",
    categoryDisplay: "Frocks",
    price: price,
    originalPrice: originalPrice,
    discount: discount,
    rating: parseFloat((4.5 + Math.random() * 0.4).toFixed(1)),
    reviewsCount: Math.floor(10 + Math.random() * 50),
    ageRange: "6-24 Months",
    gender: "Girls",
    inStock: true,
    isNew: idx < 3,
    colors: [
      {"name": "Peach Rose", "value": "#FDE2E4"},
      {"name": "Soft Pink", "value": "#FFC6C6"}
    ],
    sizes: ["6-12M", "1-2Y", "2-3Y"],
    description: desc,
    safetyInfo: "100% baby-safe acrylic wool. Organic dyes. Non-scratch elastic stitching.",
    sizeGuide: "6-12M (Height: 68-80cm, Weight: 7.5-10kg) | 1-2Y (Height: 80-92cm) | 2-3Y (Height: 92-98cm).",
    imageBg: "#FDE2E4",
    imageUrl: imageUrl
  };
});

const newSweaters = roundNeckCsv.map((row, idx) => {
  const priceVal = parseFloat(row.price);
  const price = (priceVal && priceVal > 0) ? priceVal : 649; // Default price if 0.0
  const originalPrice = Math.round(price * 1.6 / 10) * 10 - 1;
  const discount = `${Math.round((originalPrice - price) / originalPrice * 100)}% OFF`;
  
  const imgFile = row.productImageUrl.split(';')[0];
  const imageUrl = `https://static.wixstatic.com/media/${imgFile}`;
  
  const desc = cleanDescription(row.description) || "Cozy round neck sweater set from Ap Oswal. Knitted with ultra-soft hypoallergenic wool mix. Offers durable and breathable warmth.";

  // Extract sizes from productOptionDescription1 (like "16-20;22-26")
  let sizes = ["6-12M", "1-2Y", "2-3Y"];
  if (row.productOptionDescription1) {
    sizes = row.productOptionDescription1.split(';').map(s => s.trim());
  }

  return {
    id: `prod-sweater-${(idx + 1).toString().padStart(3, '0')}`,
    name: row.name,
    category: "sweaters",
    categoryDisplay: "Sweaters",
    price: price,
    originalPrice: originalPrice,
    discount: discount,
    rating: parseFloat((4.5 + Math.random() * 0.4).toFixed(1)),
    reviewsCount: Math.floor(10 + Math.random() * 50),
    ageRange: "6-36 Months",
    gender: "Unisex",
    inStock: true,
    isNew: idx < 2,
    colors: [
      {"name": "Sky Blue", "value": "#AED9E0"},
      {"name": "Mint Green", "value": "#D8F3DC"}
    ],
    sizes: sizes,
    description: desc,
    safetyInfo: "Hypoallergenic wool blend. Certified dye safety. Soft cuffs for maximum comfort.",
    sizeGuide: "Sizes: " + sizes.join(", ") + ".",
    imageBg: "#E8F0FE",
    imageUrl: imageUrl
  };
});

console.log(`Frocks constructed: ${newFrocks.length}`);
console.log(`Sweaters constructed: ${newSweaters.length}`);

// Combine and write to products.json
const updatedProducts = [
  ...newFrocks,
  ...newSweaters,
  ...nonFrocksSweaters
];

fs.writeFileSync(productsJsonPath, JSON.stringify(updatedProducts, null, 2), 'utf-8');
console.log('Successfully updated src/data/products.json');
