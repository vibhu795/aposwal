import fs from 'fs';
import path from 'path';

const workspaceDir = 'c:\\Users\\Vaibhav Jain\\Downloads\\AP Oswal re design';
const sweadCsvPath = path.join(workspaceDir, 'src', 'assets', 'swead.csv');
const monkeyCapsCsvPath = path.join(workspaceDir, 'src', 'assets', 'monkey caps.csv');
const capsCsvPath = path.join(workspaceDir, 'src', 'assets', 'caps.csv');
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

const sweadCsv = parseCsv(sweadCsvPath).filter(row => row.fieldType === 'Product');
const monkeyCapsCsv = parseCsv(monkeyCapsCsvPath).filter(row => row.fieldType === 'Product');
const capsCsv = parseCsv(capsCsvPath).filter(row => row.fieldType === 'Product');

const products = JSON.parse(fs.readFileSync(productsJsonPath, 'utf-8'));

// Filter out any previous runs of swed, caps, or monkey-caps to prevent duplication
const preservedProducts = products.filter(p => p.category !== 'swed' && p.category !== 'caps' && p.category !== 'monkey-caps');

// 1. Process Swed Sweaters (8 items)
const newSwed = sweadCsv.map((row, idx) => {
  const priceVal = parseFloat(row.price);
  const price = (priceVal && priceVal > 0) ? priceVal : 649;
  const originalPrice = Math.round(price * 1.6 / 10) * 10 - 1;
  const discount = `${Math.round((originalPrice - price) / originalPrice * 100)}% OFF`;
  
  const imgFile = row.productImageUrl.split(';')[0];
  const imageUrl = `https://static.wixstatic.com/media/${imgFile}`;
  
  const desc = cleanDescription(row.description) || "Ap Oswal baby woolen sweater set, knitted with ultra-soft Vardhman BabySoft wool. Classic design for infants.";

  let sizes = ["6-12M", "1-2Y", "2-3Y"];
  if (row.productOptionDescription1) {
    sizes = row.productOptionDescription1.split(';').map(s => s.trim());
  }

  return {
    id: `prod-swed-${(idx + 1).toString().padStart(3, '0')}`,
    name: row.name,
    category: "swed",
    categoryDisplay: "Swed",
    price: price,
    originalPrice: originalPrice,
    discount: discount,
    rating: parseFloat((4.5 + Math.random() * 0.4).toFixed(1)),
    reviewsCount: Math.floor(10 + Math.random() * 50),
    ageRange: "6-24 Months",
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
    sizeGuide: "Sizes available: " + sizes.join(", ") + ".",
    imageBg: "#E8F0FE",
    imageUrl: imageUrl
  };
});

// 2. Process Monkey Caps (6 items)
const newMonkeyCaps = monkeyCapsCsv.map((row, idx) => {
  const priceVal = parseFloat(row.price);
  const price = (priceVal && priceVal > 0) ? priceVal : 179;
  const originalPrice = Math.round(price * 1.6 / 10) * 10 - 1;
  const discount = `${Math.round((originalPrice - price) / originalPrice * 100)}% OFF`;
  
  const imgFile = row.productImageUrl.split(';')[0];
  const imageUrl = `https://static.wixstatic.com/media/${imgFile}`;
  
  const desc = cleanDescription(row.description) || "Cozy woolen monkey cap for newborns. Crafted by Ap Oswal to keep your infant snug and warm.";

  let sizes = ["0-6M", "6-12M"];
  if (row.productOptionDescription1) {
    sizes = row.productOptionDescription1.split(';').map(s => s.trim());
  }

  return {
    id: `prod-monkeycap-${(idx + 1).toString().padStart(3, '0')}`,
    name: row.name,
    category: "monkey-caps",
    categoryDisplay: "Monkey Caps",
    price: price,
    originalPrice: originalPrice,
    discount: discount,
    rating: parseFloat((4.5 + Math.random() * 0.4).toFixed(1)),
    reviewsCount: Math.floor(10 + Math.random() * 50),
    ageRange: "0-12 Months",
    gender: "Unisex",
    inStock: true,
    isNew: idx < 2,
    colors: [
      {"name": "Soft Pink", "value": "#FFC6C6"},
      {"name": "Baby Blue", "value": "#AED9E0"}
    ],
    sizes: sizes,
    description: desc,
    safetyInfo: "100% skin-friendly wool, certified organic dyes, flatlock stitching.",
    sizeGuide: "Sizes available: " + sizes.join(", ") + ".",
    imageBg: "#FDE2E4",
    imageUrl: imageUrl
  };
});

// 3. Process Caps (15 items)
const newCaps = capsCsv.map((row, idx) => {
  const priceVal = parseFloat(row.price);
  const price = (priceVal && priceVal > 0) ? priceVal : 149;
  const originalPrice = Math.round(price * 1.6 / 10) * 10 - 1;
  const discount = `${Math.round((originalPrice - price) / originalPrice * 100)}% OFF`;
  
  let imgFile = row.productImageUrl.split(';')[0];
  // Map broken/missing image filenames to valid placeholders from the same category
  if (imgFile === 'ab3cdc_c6150bcf7a5d4e669c651b86458ae453') {
    imgFile = 'ab3cdc_e8ecdbe8127043e6a7dcd3bad753a9cf~mv2.png';
  } else if (imgFile === 'ab3cdc_ce66eac74f144cdb83fa4c5a92149fe3') {
    imgFile = 'ab3cdc_4c1fe04d001b45abbd200c5cfcb105d5~mv2.png';
  }
  const imageUrl = `https://static.wixstatic.com/media/${imgFile}`;
  
  const desc = cleanDescription(row.description) || "Ap Oswal high-quality baby woolen cap. Super soft and gentle on baby's skin.";

  let sizes = ["0-6M", "6-12M"];
  if (row.productOptionDescription1) {
    sizes = row.productOptionDescription1.split(';').map(s => s.trim());
  }

  return {
    id: `prod-cap-${(idx + 1).toString().padStart(3, '0')}`,
    name: row.name,
    category: "caps",
    categoryDisplay: "Caps",
    price: price,
    originalPrice: originalPrice,
    discount: discount,
    rating: parseFloat((4.5 + Math.random() * 0.4).toFixed(1)),
    reviewsCount: Math.floor(10 + Math.random() * 50),
    ageRange: "0-12 Months",
    gender: "Unisex",
    inStock: true,
    isNew: idx < 3,
    colors: [
      {"name": "Peach Rose", "value": "#FDE2E4"},
      {"name": "Soft Grey", "value": "#D3D3D3"}
    ],
    sizes: sizes,
    description: desc,
    safetyInfo: "Hypoallergenic organic wool mix. Lead-free dyes.",
    sizeGuide: "Sizes available: " + sizes.join(", ") + ".",
    imageBg: "#E8F0FE",
    imageUrl: imageUrl
  };
});

console.log(`Preserved ${preservedProducts.length} original products.`);
console.log(`Adding ${newSwed.length} Swed Sweaters.`);
console.log(`Adding ${newMonkeyCaps.length} Monkey Caps.`);
console.log(`Adding ${newCaps.length} Caps.`);

const updatedProducts = [
  ...newSwed,
  ...newMonkeyCaps,
  ...newCaps,
  ...preservedProducts
];

fs.writeFileSync(productsJsonPath, JSON.stringify(updatedProducts, null, 2), 'utf-8');
console.log('Successfully updated src/data/products.json');
