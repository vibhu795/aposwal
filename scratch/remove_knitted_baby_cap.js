import fs from 'fs';
import path from 'path';

const productsJsonPath = 'c:\\Users\\Vaibhav Jain\\Downloads\\AP Oswal re design\\src\\data\\products.json';
const products = JSON.parse(fs.readFileSync(productsJsonPath, 'utf-8'));

const filteredProducts = products.filter(p => p.name.trim() !== 'Knitted Baby Cap');

console.log(`Original count: ${products.length}`);
console.log(`New count: ${filteredProducts.length}`);
console.log(`Removed: ${products.length - filteredProducts.length} product(s).`);

fs.writeFileSync(productsJsonPath, JSON.stringify(filteredProducts, null, 2), 'utf-8');
console.log('Successfully updated src/data/products.json');
