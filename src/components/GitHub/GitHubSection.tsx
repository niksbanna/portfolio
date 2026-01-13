import { useRef, useState, useEffect } from 'react';
import { Github, Star, GitFork, Users, BookOpen, ExternalLink } from 'lucide-react';
import { GitHubCalendar } from 'react-github-calendar';
import { useGitHubUser, useGitHubRepos } from '../../hooks/useGitHub';
import { useTheme } from '../../context/ThemeContext';

const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'niksbanna';

export default function GitHubSection() {
  const { data: user, isLoading: userLoading } = useGitHubUser();
  const { data: repos, isLoading: reposLoading } = useGitHubRepos(6);
  const { theme } = useTheme();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const calendarWidth = 880;
        const newScale = Math.min(1, containerWidth / calendarWidth);
        setScale(newScale);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <section id="github" className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl flex items-center justify-center gap-3">
            <Github className="h-8 w-8" />
            GitHub Activity
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
            My open source contributions and recent projects
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1 min-w-0 overflow-hidden">
            <GitHubStats user={user} isLoading={userLoading} />
          </div>
          <div className="lg:col-span-2 min-w-0 overflow-hidden">
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-4 sm:p-6 overflow-hidden">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Contribution Calendar
              </h3>
              <div 
                ref={containerRef} 
                className="w-full overflow-hidden"
              >
                <div 
                  style={{ 
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                    width: `${100 / scale}%`,
                    height: scale < 1 ? `${180 * scale}px` : 'auto',
                  }}
                >
                  <GitHubCalendar
                    username={GITHUB_USERNAME}
                    colorScheme={theme}
                    fontSize={12}
                    blockSize={12}
                    blockMargin={4}
                    theme={{
                      light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                      dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                    }}
                    style={{
                      color: theme === 'dark' ? '#ffffff' : '#1f2937',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Recent Repositories
          </h3>
          {reposLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <RepoSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {repos?.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-600 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-500 transition-colors"
          >
            <Github className="h-5 w-5" />
            View GitHub Profile
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function GitHubStats({
  user,
  isLoading,
}: {
  user: ReturnType<typeof useGitHubUser>['data'];
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-24 mb-4"></div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-8 bg-gray-200 dark:bg-gray-600 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  const stats = [
    { icon: BookOpen, label: 'Public Repos', value: user?.public_repos || 0 },
    { icon: Users, label: 'Followers', value: user?.followers || 0 },
    { icon: Users, label: 'Following', value: user?.following || 0 },
  ];

  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-4 sm:p-6 overflow-hidden min-w-0">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Stats</h3>
      <div className="space-y-3 min-w-0">
        {stats.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-600 rounded-lg"
          >
            <div className="flex items-center gap-2 min-w-0">
              <Icon className="h-5 w-5 text-blue-600 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-200 text-sm">{label}</span>
            </div>
            <span className="font-bold text-gray-900 dark:text-white">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RepoCard({ repo }: { repo: NonNullable<ReturnType<typeof useGitHubRepos>['data']>[0] }) {
  const languageColors: Record<string, string> = {
    TypeScript: 'bg-blue-500',
    JavaScript: 'bg-yellow-400',
    Go: 'bg-cyan-500',
    Python: 'bg-green-500',
    Rust: 'bg-orange-500',
    Java: 'bg-red-500',
    HTML: 'bg-orange-400',
    CSS: 'bg-purple-500',
  };

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white dark:bg-gray-700 rounded-lg shadow p-5 hover:shadow-lg transition-shadow group"
    >
      <div className="flex items-start justify-between">
        <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
          {repo.name}
        </h4>
        <ExternalLink className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2" />
      </div>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-300 line-clamp-2">
        {repo.description || 'No description'}
      </p>
      <div className="mt-4 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        {repo.language && (
          <div className="flex items-center gap-1">
            <span
              className={`w-3 h-3 rounded-full ${languageColors[repo.language] || 'bg-gray-400'}`}
            ></span>
            <span>{repo.language}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4" />
          <span>{repo.stargazers_count}</span>
        </div>
        <div className="flex items-center gap-1">
          <GitFork className="h-4 w-4" />
          <span>{repo.forks_count}</span>
        </div>
      </div>
    </a>
  );
}

function RepoSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-5 animate-pulse">
      <div className="h-5 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
      <div className="mt-2 h-4 bg-gray-200 dark:bg-gray-600 rounded w-full"></div>
      <div className="mt-1 h-4 bg-gray-200 dark:bg-gray-600 rounded w-2/3"></div>
      <div className="mt-4 flex gap-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-16"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-12"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-12"></div>
      </div>
    </div>
  );
}
