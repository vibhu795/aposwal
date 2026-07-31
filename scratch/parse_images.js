import fs from 'fs';

const contentPath = 'C:\\Users\\Vaibhav Jain\\.gemini\\antigravity-ide\\brain\\ecda1c38-e113-48c1-a8b6-82c9e99dd83c\\.system_generated\\steps\\116\\content.md';

try {
  const content = fs.readFileSync(contentPath, 'utf-8');
  
  // Find product-page links
  const productPageRegex = /href="https:\/\/www\.aposwal\.com\/product-page\/([a-zA-Z0-9_-]+)"/g;
  let match;
  const productSlugs = new Set();
  
  while ((match = productPageRegex.exec(content)) !== null) {
    productSlugs.add(match[1]);
  }
  
  console.log('Product Slugs Found:', Array.from(productSlugs));

  // Let's search for Wix Store JSON structures which contain all products, prices, and images!
  // Wix stores render a script tag or JSON string like:
  // "products": [ ... ] or similar
  const storeDataRegex = /"products":\s*\[/g;
  const storeMatch = content.match(storeDataRegex);
  console.log('Wix Store Product array matches:', !!storeMatch);
  
  // Let's find some detailed snippets containing product slugs
  for (const slug of productSlugs) {
    const slugIndex = content.indexOf(slug);
    if (slugIndex > -1) {
      console.log(`\n--- Snippet for ${slug} ---`);
      console.log(content.substring(slugIndex - 200, slugIndex + 400).replace(/<[^>]+>/g, '').trim());
    }
  }

} catch (err) {
  console.error('Error:', err);
}
