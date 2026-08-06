/**
 * Computes a relevance score for a product based on the search query.
 * Higher score means more relevant. A score of 0 means no match.
 * Priority:
 * 1. Product name exact match (1000)
 * 2. Product name starts with query (900)
 * 3. Any word in product name starts with query (800)
 * 4. Category display/key exact match (700)
 * 5. Category display/key starts with query (600)
 * 6. Any word in category display/key starts with query (500)
 * 7. Description starts with query (400)
 * 8. Any word in description starts with query (300)
 * 9. Substring match in name (200)
 * 10. Substring match in category (100)
 * 11. Substring match in description (50)
 */
export const getSearchRelevanceScore = (product, query) => {
  if (!query) return 0;
  const q = query.trim().toLowerCase();
  if (!q) return 0;

  const name = (product.name || '').toLowerCase();
  const category = (product.category || '').toLowerCase();
  const categoryDisplay = (product.categoryDisplay || '').toLowerCase();
  const description = (product.description || '').toLowerCase();

  // 1. Exact matches / startsWith on name
  if (name === q) return 1000;
  if (name.startsWith(q)) return 900;

  // 2. Word startsWith in name
  const nameWords = name.split(/[\s\-_,./]+/);
  if (nameWords.some(w => w.startsWith(q))) return 800;

  // 3. Category matches
  if (category === q || categoryDisplay === q) return 700;
  if (category.startsWith(q) || categoryDisplay.startsWith(q)) return 600;

  // 4. Word startsWith in category
  const catWords = [...category.split(/[\s\-_,./]+/), ...categoryDisplay.split(/[\s\-_,./]+/)];
  if (catWords.some(w => w.startsWith(q))) return 500;

  // 5. Description startsWith
  if (description.startsWith(q)) return 400;

  // 6. Word startsWith in description
  const descWords = description.split(/[\s\-_,./]+/);
  if (descWords.some(w => w.startsWith(q))) return 300;

  // 7. Substring matches
  if (name.includes(q)) return 200;
  if (category.includes(q) || categoryDisplay.includes(q)) return 100;
  if (description.includes(q)) return 50;

  return 0;
};
