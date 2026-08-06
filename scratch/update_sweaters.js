import fs from 'fs';
import path from 'path';

const workspaceDir = 'c:\\Users\\Vaibhav Jain\\Downloads\\AP Oswal re design';
const sweatersCsvPath = path.join(workspaceDir, 'src', 'assets', 'sweaters.csv');
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

const csvData = parseCsv(sweatersCsvPath);
const products = JSON.parse(fs.readFileSync(productsJsonPath, 'utf-8'));

// Filter out variants
const sweaterProductsCsv = csvData.filter(row => row.fieldType === 'Product');

// Filter out all current sweaters in products.json
const nonSweaters = products.filter(p => p.category !== 'sweaters');

const newSweaters = sweaterProductsCsv.map((row, idx) => {
  const priceVal = parseFloat(row.price);
  const price = (priceVal && priceVal > 0) ? priceVal : 599; // Default price if 0.0
  const originalPrice = Math.round(price * 1.6 / 10) * 10 - 1;
  const discount = `${Math.round((originalPrice - price) / originalPrice * 100)}% OFF`;
  
  const imgFile = row.productImageUrl.split(';')[0];
  const imageUrl = `https://static.wixstatic.com/media/${imgFile}`;
  
  const desc = cleanDescription(row.description) || "Ap Oswal high-quality woolen kids sweater, crafted with soft Vardhman babysoft yarn. Offers durable warmth and maximum comfort.";

  // Extract sizes from productOptionDescription1 (like "16-20;22-26")
  let sizes = ["6-12M", "1-2Y", "2-3Y"];
  if (row.productOptionDescription1) {
    sizes = row.productOptionDescription1.split(';').map(s => s.trim());
  }

  // Determine sweater type
  const lowerName = row.name.toLowerCase();
  let sweaterType = "regular";
  if (lowerName.includes("round neck")) {
    sweaterType = "round-neck";
  } else if (lowerName.includes("front open")) {
    sweaterType = "front-open";
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
    isNew: idx < 4,
    colors: [
      {"name": "Sky Blue", "value": "#AED9E0"},
      {"name": "Mint Green", "value": "#D8F3DC"}
    ],
    sizes: sizes,
    description: desc,
    safetyInfo: "Hypoallergenic wool blend. Certified dye safety. Soft cuffs for maximum comfort.",
    sizeGuide: "Sizes available: " + sizes.join(", ") + ".",
    imageBg: "#E8F0FE",
    imageUrl: imageUrl,
    sweaterType: sweaterType
  };
});

console.log(`Parsed ${newSweaters.length} sweater products from CSV.`);

// Combine and write back
const updatedProducts = [
  ...newSweaters,
  ...nonSweaters
];

fs.writeFileSync(productsJsonPath, JSON.stringify(updatedProducts, null, 2), 'utf-8');
console.log('Successfully updated src/data/products.json');
