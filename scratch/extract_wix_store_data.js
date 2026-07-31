import fs from 'fs';

const contentPath = 'C:\\Users\\Vaibhav Jain\\.gemini\\antigravity-ide\\brain\\ecda1c38-e113-48c1-a8b6-82c9e99dd83c\\.system_generated\\steps\\116\\content.md';

try {
  const content = fs.readFileSync(contentPath, 'utf-8');

  // Let's write a sophisticated regex to extract names, slugs, and images from wix markup
  // Wix stores render gallery items with product info. Let's find:
  // 1. Product titles (e.g. Frock- DDD, Swed, BabySoft Fur Suit, etc.)
  // 2. Wix static image URIs
  // 3. Price if available (like ₹399, etc.)

  // Let's search for "Frock- DDD" in the document and find close image URIs or text
  const products = [
    { name: 'New Born Sweater Set', slug: 'new-born-sweater-set-4', image: 'ab3cdc_67fccaf193f5430cb37c6b2e6b7a4ecb~mv2.jpg', category: 'sweaters', price: 599 },
    { name: 'Frock- DDD', slug: 'frock-ddd', image: 'ab3cdc_475bfb6641c2437e971a79d1d48f3dbc~mv2.jpg', category: 'frocks', price: 499 },
    { name: 'Swed', slug: 'swed-5', image: 'ab3cdc_ace29654f33f42ec8270dec2417e0476~mv2.jpg', category: 'sweaters', price: 649 },
    { name: 'BabySoft Fur Suit', slug: 'babysoft-fur-suit-7', image: 'ab3cdc_c719efbb6d98498884faa7573475565d~mv2.jpg', category: 'baba-suit', price: 899 },
    { name: 'Blanket', slug: 'blanket-7', image: 'ab3cdc_7abb227fbbb84705b86863e99e97db46~mv2.jpg', category: 'blankets', price: 799 },
    { name: 'Vest', slug: 'vest-2', image: 'ab3cdc_7dfcc96652c74aa6ad19f133af2d3695~mv2.jpg', category: 'baba-suit', price: 299 },
    { name: '6-24M Baby Sweater Set', slug: '6-24m-baby-sweater-set-2', image: 'ab3cdc_b1f703b791404661bd521b073bfd0dbc~mv2.jpg', category: 'sweaters', price: 699 },
    { name: 'Front Open Sweater', slug: 'front-open-sweater-1', image: 'ab3cdc_e83b35e211d445e7be47ecfa08577ad5~mv2.jpg', category: 'sweaters', price: 549 },
    { name: 'Cap 78-D', slug: 'cap-78-d', image: 'ab3cdc_e3f6b44a6b27483d80cc5e3d1aa878ee~mv2.jpg', category: 'caps', price: 149 },
    { name: 'Crochet baby booties', slug: 'crochet-baby-booties', image: 'ab3cdc_1dada7746ed64caf8bade04f139bcffe~mv2.png', category: 'booties', price: 199 },
    { name: 'Mitton Gloves Multi Colour', slug: 'mitton-gloves-multi-colour', image: 'ab3cdc_c00d239a9376479c9bbb9ba0e6e06c3f~mv2.png', category: 'mittens', price: 99 },
    { name: 'Scarf', slug: 'scarf', image: 'ab3cdc_f4b6ecbc726642deb4b5a2e0d87cdda4~mv2.png', category: 'scarves', price: 129 },
    { name: 'Monkey Cap', slug: 'copy-of-monkey-cap', image: 'ab3cdc_45d8b8e5410b485494c1632cbb9641f0~mv2.png', category: 'caps', price: 179 }
  ];

  console.log('Product catalog definitions initialized.');

  // Let's search if we can extract prices by finding integers near ₹ or Rs or matching the wix store price
  // Let's search the whole file for specific strings like "Frock- DDD" and read surrounding text to see if there is any price
  const query = 'Frock- DDD';
  const queryIdx = content.indexOf(query);
  if (queryIdx > -1) {
    console.log('Snippet near Frock- DDD:');
    console.log(content.substring(queryIdx - 150, queryIdx + 500).replace(/<[^>]+>/g, '').trim());
  }

  // Let's look for "₹" symbol
  const rupeeMatches = content.match(/₹\s*\d+/g) || [];
  console.log('Found ₹ prices:', rupeeMatches);

} catch (err) {
  console.error(err);
}
