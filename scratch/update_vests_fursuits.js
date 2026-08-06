import fs from 'fs';
import path from 'path';

const workspaceDir = 'c:\\Users\\Vaibhav Jain\\Downloads\\AP Oswal re design';
const vestsCsvPath = path.join(workspaceDir, 'src', 'assets', 'vests.csv');
const furSuitsCsvPath = path.join(workspaceDir, 'src', 'assets', 'babysoft fur suits.csv');
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

function cleanDescription(desc) {
  if (!desc) return '';
  return desc.replace(/<[^>]*>/g, '').trim();
}

const vestsCsv = parseCsv(vestsCsvPath).filter(row => row.fieldType === 'Product');
const furSuitsCsv = parseCsv(furSuitsCsvPath).filter(row => row.fieldType === 'Product');

const products = JSON.parse(fs.readFileSync(productsJsonPath, 'utf-8'));

// Filter out any previous runs of vests or babysoft-fursuits to prevent duplicates
const preservedProducts = products.filter(p => p.category !== 'vests' && p.category !== 'babysoft-fursuits');

// 1. Process Vests (3 items)
const newVests = vestsCsv.map((row, idx) => {
  const priceVal = parseFloat(row.price);
  const price = (priceVal && priceVal > 0) ? priceVal : 199;
  const originalPrice = Math.round(price * 1.6 / 10) * 10 - 1;
  const discount = `${Math.round((originalPrice - price) / originalPrice * 100)}% OFF`;
  
  const imgFile = row.productImageUrl.split(';')[0];
  const imageUrl = `https://static.wixstatic.com/media/${imgFile}`;
  
  const desc = cleanDescription(row.description) || "Ap Oswal baby woolen vest. Soft knit provides gentle warmth perfect for delicate newborn skin.";

  let sizes = ["0-6M", "6-12M"];
  if (row.productOptionDescription1) {
    sizes = row.productOptionDescription1.split(';').map(s => s.trim());
  }

  return {
    id: `prod-vest-${(idx + 1).toString().padStart(3, '0')}`,
    name: row.name,
    category: "vests",
    categoryDisplay: "Vest",
    price: price,
    originalPrice: originalPrice,
    discount: discount,
    rating: parseFloat((4.5 + Math.random() * 0.4).toFixed(1)),
    reviewsCount: Math.floor(10 + Math.random() * 50),
    ageRange: "0-12 Months",
    gender: "Unisex",
    inStock: true,
    isNew: idx < 1,
    colors: [
      {"name": "Peach Rose", "value": "#FDE2E4"},
      {"name": "Soft Pink", "value": "#FFC6C6"}
    ],
    sizes: sizes,
    description: desc,
    safetyInfo: "Hypoallergenic wool mix. Safe organic dyes. Smooth flat seams to avoid scratching.",
    sizeGuide: "Sizes available: " + sizes.join(", ") + ".",
    imageBg: "#FDE2E4",
    imageUrl: imageUrl
  };
});

// 2. Process BabySoft Fur Suits (8 items)
const newFurSuits = furSuitsCsv.map((row, idx) => {
  const priceVal = parseFloat(row.price);
  const price = (priceVal && priceVal > 0) ? priceVal : 699;
  const originalPrice = Math.round(price * 1.6 / 10) * 10 - 1;
  const discount = `${Math.round((originalPrice - price) / originalPrice * 100)}% OFF`;
  
  const imgFile = row.productImageUrl.split(';')[0];
  const imageUrl = `https://static.wixstatic.com/media/${imgFile}`;
  
  const desc = cleanDescription(row.description) || "Ap Oswal luxurious BabySoft Fur Suit. Keeps your baby extremely cozy, warm, and comfortable all winter.";

  let sizes = ["0-6M", "6-12M", "1-2Y", "2-3Y"];
  if (row.productOptionDescription1) {
    sizes = row.productOptionDescription1.split(';').map(s => s.trim());
  }

  return {
    id: `prod-fursuit-${(idx + 1).toString().padStart(3, '0')}`,
    name: row.name,
    category: "babysoft-fursuits",
    categoryDisplay: "Babysoft fursuits",
    price: price,
    originalPrice: originalPrice,
    discount: discount,
    rating: parseFloat((4.5 + Math.random() * 0.4).toFixed(1)),
    reviewsCount: Math.floor(10 + Math.random() * 50),
    ageRange: "0-3 Years",
    gender: "Unisex",
    inStock: true,
    isNew: idx < 2,
    colors: [
      {"name": "Winter White", "value": "#FDFBF7"},
      {"name": "Soft Peach", "value": "#FDE2E4"}
    ],
    sizes: sizes,
    description: desc,
    safetyInfo: "Ultra-soft baby-friendly faux fur. Certified allergen-free backing. Safe snap closures.",
    sizeGuide: "Sizes available: " + sizes.join(", ") + ".",
    imageBg: "#FDFBF7",
    imageUrl: imageUrl
  };
});

console.log(`Preserved ${preservedProducts.length} original products.`);
console.log(`Adding ${newVests.length} Vests.`);
console.log(`Adding ${newFurSuits.length} Fur Suits.`);

const updatedProducts = [
  ...newVests,
  ...newFurSuits,
  ...preservedProducts
];

fs.writeFileSync(productsJsonPath, JSON.stringify(updatedProducts, null, 2), 'utf-8');
console.log('Successfully updated src/data/products.json');
