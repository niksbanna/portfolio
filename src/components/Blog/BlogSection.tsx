import { BookOpen, Calendar, ExternalLink, Tag } from 'lucide-react';
import { useMediumPosts } from '../../hooks/useMediumPosts';
import type { BlogPost } from '../../types/blog';

const MEDIUM_USERNAME = import.meta.env.VITE_MEDIUM_USERNAME || 'bannanicky0';

export default function BlogSection() {
  const { data: posts, isLoading, error } = useMediumPosts();

  return (
    <section id="blog" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl flex items-center justify-center gap-3">
            <BookOpen className="h-8 w-8" />
            Blog Posts
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
            Thoughts on software development, architecture, and technology
          </p>
        </div>

        <div className="mt-12 min-w-0 overflow-hidden">
          {isLoading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 min-w-0">
              {[...Array(3)].map((_, i) => (
                <BlogSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">Unable to load blog posts</p>
              <a
                href={`https://medium.com/@${MEDIUM_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                Visit my Medium profile
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 min-w-0">
              {posts.slice(0, 6).map((post) => (
                <BlogCard key={post.link} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No blog posts yet</p>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <a
            href={`https://medium.com/@${MEDIUM_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-600 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-500 transition-colors"
          >
            <BookOpen className="h-5 w-5" />
            Read More on Medium
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow group min-w-0"
    >
      {post.thumbnail && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(post.pubDate)}</span>
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-300 line-clamp-3">
          {post.contentSnippet}
        </p>
        {post.categories.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.categories.slice(0, 3).map((category) => (
              <span
                key={category}
                className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-600 text-xs text-gray-600 dark:text-gray-300 rounded"
              >
                <Tag className="h-3 w-3" />
                {category}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}

function BlogSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden animate-pulse min-w-0">
      <div className="aspect-video w-full bg-gray-200 dark:bg-gray-600"></div>
      <div className="p-5">
        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-24 mb-2"></div>
        <div className="h-5 bg-gray-200 dark:bg-gray-600 rounded w-full mb-1"></div>
        <div className="h-5 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full mb-1"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-2/3"></div>
        <div className="mt-4 flex gap-2">
          <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-16"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-20"></div>
        </div>
      </div>
    </div>
  );
}
