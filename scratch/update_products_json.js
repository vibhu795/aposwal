import fs from 'fs';
import path from 'path';

const workspaceDir = 'c:\\Users\\Vaibhav Jain\\Downloads\\AP Oswal re design';
const smallCsvPath = path.join(workspaceDir, 'small.csv');
const mlxlCsvPath = path.join(workspaceDir, 'mlxl.csv');
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

const smallProducts = parseCsv(smallCsvPath);
const mlxlProducts = parseCsv(mlxlCsvPath);
const existingProducts = JSON.parse(fs.readFileSync(productsJsonPath, 'utf-8'));

// Filter out all current suits (category === 'suits')
const nonSuits = existingProducts.filter(p => p.category !== 'suits');

// Create the new list of 13 suits
const newSuits = [];

// Helper to find existing product by image name
function findExistingByImage(imgName) {
  // Check in the old suits first to preserve their ID and specific fields
  return existingProducts.find(p => p.category === 'suits' && p.imageUrl && p.imageUrl.includes(imgName));
}

// 1. Process MLXL suits (5 items)
mlxlProducts.forEach(mp => {
  const imgName = mp.productImageUrl;
  const existing = findExistingByImage(imgName);
  if (existing) {
    newSuits.push({
      ...existing,
      sizes: ["M", "L", "XL"] // Ensure sizes match MLXL
    });
  } else {
    console.error('Could not find existing suit for MLXL image:', imgName);
  }
});

// 2. Process Small suits (8 items)
smallProducts.forEach(sp => {
  const imgName = sp.productImageUrl;
  const existing = findExistingByImage(imgName);
  if (existing) {
    newSuits.push({
      ...existing,
      sizes: ["Small"] // Ensure size matches Small
    });
  } else if (imgName.includes('ab3cdc_5d38772c7e3d4459960d8dacc9b7d4bd')) {
    // This is the new product
    newSuits.push({
      id: "prod-036",
      name: "New Born Cable-Knit Sweater Set - Cozy Oatmeal",
      category: "suits",
      categoryDisplay: "Baba Suits",
      price: 749,
      originalPrice: 1249,
      discount: "40% OFF",
      rating: 4.8,
      reviewsCount: 32,
      ageRange: "0-3 Months",
      gender: "Unisex",
      inStock: true,
      isNew: true,
      colors: [
        {"name": "Oatmeal Cream", "value": "#F5EBE0"}
      ],
      sizes: ["Small"],
      description: "These suits are available in small size only. This is for new born baby made with soft wool. (0-3 Months)",
      safetyInfo: "100% baby-safe acrylic wool. Dyed with organic azo-free dyes. Non-scratch elastic stitching.",
      sizeGuide: "Small (0-3 Months, Height: 50-62cm, Weight: 3-5.5kg).",
      imageBg: "#F5EBE0",
      imageUrl: "https://static.wixstatic.com/media/ab3cdc_5d38772c7e3d4459960d8dacc9b7d4bd~mv2.png"
    });
  } else {
    console.error('Could not find existing suit for Small image:', imgName);
  }
});

console.log(`Prepared ${newSuits.length} new suits.`);

// Merge them back in the correct position (e.g. index 23, where prod-024 starts)
const indexToInsert = existingProducts.findIndex(p => p.category === 'suits');
const updatedProducts = [
  ...existingProducts.slice(0, indexToInsert),
  ...newSuits,
  ...existingProducts.slice(indexToInsert).filter(p => p.category !== 'suits')
];

// Write back to products.json
fs.writeFileSync(productsJsonPath, JSON.stringify(updatedProducts, null, 2), 'utf-8');
console.log('Successfully updated src/data/products.json');
