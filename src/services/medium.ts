import type { BlogPost } from '../types/blog';

const MEDIUM_USERNAME = import.meta.env.VITE_MEDIUM_USERNAME || 'bannanicky0';
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

function extractThumbnail(content: string): string | undefined {
  const match = content.match(/<img[^>]+src="([^">]+)"/);
  return match?.[1];
}

function stripHtml(html: string): string {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

export const mediumService = {
  async getPosts(): Promise<BlogPost[]> {
    const feedUrl = `${CORS_PROXY}${encodeURIComponent(
      `https://medium.com/feed/@${MEDIUM_USERNAME}`
    )}`;

    const response = await fetch(feedUrl);
    if (!response.ok) throw new Error('Failed to fetch Medium posts');

    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

    const items = xmlDoc.querySelectorAll('item');
    const posts: BlogPost[] = [];

    items.forEach((item) => {
      const title = item.querySelector('title')?.textContent || '';
      const link = item.querySelector('link')?.textContent || '';
      const pubDate = item.querySelector('pubDate')?.textContent || '';
      const contentEncoded =
        item.querySelector('content\\:encoded')?.textContent ||
        item.getElementsByTagNameNS('*', 'encoded')[0]?.textContent ||
        '';

      const categories: string[] = [];
      item.querySelectorAll('category').forEach((cat) => {
        if (cat.textContent) categories.push(cat.textContent);
      });

      const thumbnail = extractThumbnail(contentEncoded);
      const contentSnippet = stripHtml(contentEncoded).substring(0, 200) + '...';

      posts.push({
        title,
        link,
        pubDate,
        contentSnippet,
        categories,
        thumbnail,
      });
    });

    return posts;
  },
};
