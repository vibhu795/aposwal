import fs from 'fs';

const productsJsonPath = 'c:\\Users\\Vaibhav Jain\\Downloads\\AP Oswal re design\\src\\data\\products.json';
const products = JSON.parse(fs.readFileSync(productsJsonPath, 'utf-8'));

console.log('--- Verification Summary ---');
const categoryCounts = {};
products.forEach(p => {
  categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
});
console.log('Product counts by category in products.json:', categoryCounts);

const expectedCounts = {
  sweaters: 19,
  frocks: 10,
  suits: 13,
  blankets: 7,
  accessories: 6,
  swed: 8,
  caps: 13, // one was deleted (Knitted Baby Cap)
  'monkey-caps': 6,
  vests: 3,
  'babysoft-fursuits': 8
};

let allOk = true;
Object.entries(expectedCounts).forEach(([cat, expected]) => {
  const actual = categoryCounts[cat] || 0;
  if (actual === expected) {
    console.log(`SUCCESS: Category "${cat}" has exactly ${actual} items.`);
  } else {
    console.log(`ERROR: Category "${cat}" has ${actual} items, but expected ${expected}!`);
    allOk = false;
  }
});

if (allOk) {
  console.log('\nALL ASSERTONS PASSED SUCCESSFULLY!');
} else {
  console.log('\nDIAGNOSTICS FAILED.');
}
