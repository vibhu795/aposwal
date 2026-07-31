import fs from 'fs';

const contentPath = 'C:\\Users\\Vaibhav Jain\\.gemini\\antigravity-ide\\brain\\ecda1c38-e113-48c1-a8b6-82c9e99dd83c\\.system_generated\\steps\\116\\content.md';

try {
  const content = fs.readFileSync(contentPath, 'utf-8');

  // Let's search for json structures that contain product data.
  // Wix stores render raw page data, let's look for "name":"Crochet baby booties" or similar.
  const regex = /"name"\s*:\s*"([^"]+)"/g;
  let match;
  const names = [];
  while ((match = regex.exec(content)) !== null) {
    names.push(match[1]);
  }
  
  console.log('Names found by "name":...', names.slice(0, 40));

  // Let's search for prices like "price": 499 or "formattedPrice": "₹499"
  // Let's write a regular expression to find JSON blocks corresponding to products
  // E.g., {"id":"...", "name":"...", "price":..., "mediaUrl":"..."}
  // Let's try to extract specific product structures.
  
  const productObjects = [];
  
  // Let's search for the wix product schema, which often contains name, price, description, images
  // Wix uses window.__PRELOADED_STATE__ or viewerModel or siteFeaturesConfigs or OOI
  // Let's search for some patterns:
  const slugs = [
    'new-born-sweater-set-4',
    'frock-ddd',
    'swed-5',
    'babysoft-fur-suit-7',
    'blanket-7',
    'crochet-baby-booties',
    'copy-of-monkey-cap',
    'mitton-gloves-multi-colour'
  ];

  for (const slug of slugs) {
    const idx = content.indexOf(slug);
    if (idx > -1) {
      console.log(`\n=================== ${slug} ===================`);
      // Find the surrounding {...} JSON
      let start = idx;
      let openBrackets = 0;
      while (start > 0 && content[start] !== '{') {
        start--;
      }
      // If we find '{', let's print 1000 characters before and after to inspect
      console.log(content.substring(start - 200, start + 800).replace(/<[^>]+>/g, '').trim());
    }
  }

} catch (err) {
  console.error(err);
}
