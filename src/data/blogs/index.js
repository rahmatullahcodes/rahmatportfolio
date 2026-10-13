import { laravelBlogs } from './laravelBlogs';
import { reactBlogs } from './reactBlogs';
import { nodeBlogs } from './nodeBlogs';
import { databaseBlogs } from './databaseBlogs';
import { devopsSecurityBlogs } from './devopsSecurityBlogs';
import { aiSeoCareerBlogs } from './aiSeoCareerBlogs';

// Aggregated Master Array of All 20 Technical Blogs
export const allBlogs = [
  ...laravelBlogs,
  ...reactBlogs,
  ...nodeBlogs,
  ...databaseBlogs,
  ...devopsSecurityBlogs,
  ...aiSeoCareerBlogs,
];

// Helper: Get Blog by Slug
export function getBlogBySlug(slug) {
  if (!slug) return null;
  const cleanSlug = slug.toLowerCase().trim();
  return allBlogs.find((b) => b.slug.toLowerCase() === cleanSlug) || null;
}

// Helper: Get Featured Articles
export function getFeaturedBlogs() {
  return allBlogs.filter((b) => b.featured);
}

// Helper: Get Related Articles
export function getRelatedBlogs(currentSlug, category, limit = 3) {
  return allBlogs
    .filter((b) => b.slug !== currentSlug)
    .sort((a, b) => {
      // Prioritize same category
      if (a.category === category && b.category !== category) return -1;
      if (b.category === category && a.category !== category) return 1;
      return 0;
    })
    .slice(0, limit);
}

// Helper: Get All Distinct Categories with Counts
export const categories = [
  { name: 'All', count: allBlogs.length },
  { name: 'Laravel & PHP', count: laravelBlogs.length },
  { name: 'React & Frontend', count: reactBlogs.length },
  { name: 'Node.js & Backend', count: nodeBlogs.length },
  { name: 'Databases & SQL', count: databaseBlogs.length },
  { name: 'DevOps & Security', count: devopsSecurityBlogs.length },
  { name: 'AI & Modern Tech', count: aiSeoCareerBlogs.length },
];

// Helper: Search and Filter Blogs
export function filterBlogs({ search = '', category = 'All' } = {}) {
  let filtered = allBlogs;

  if (category && category !== 'All') {
    filtered = filtered.filter((b) => b.category === category);
  }

  if (search && search.trim()) {
    const q = search.toLowerCase().trim();
    filtered = filtered.filter((b) => {
      const titleMatch = b.title.toLowerCase().includes(q);
      const excerptMatch = b.excerpt.toLowerCase().includes(q);
      const keywordsMatch = b.keywords.some((k) => k.toLowerCase().includes(q));
      const categoryMatch = b.category.toLowerCase().includes(q);
      return titleMatch || excerptMatch || keywordsMatch || categoryMatch;
    });
  }

  return filtered;
}

export {
  laravelBlogs,
  reactBlogs,
  nodeBlogs,
  databaseBlogs,
  devopsSecurityBlogs,
  aiSeoCareerBlogs,
};
