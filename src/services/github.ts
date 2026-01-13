import type { GitHubUser, GitHubRepo, GitHubEvent } from '../types/github';

const GITHUB_API = 'https://api.github.com';
const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'niksbanna';

export const githubService = {
  async getUser(): Promise<GitHubUser> {
    const res = await fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`);
    if (!res.ok) throw new Error('Failed to fetch user');
    return res.json();
  },

  async getRepos(limit = 6): Promise<GitHubRepo[]> {
    const res = await fetch(
      `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=${limit}`
    );
    if (!res.ok) throw new Error('Failed to fetch repos');
    return res.json();
  },

  async getActivity(limit = 10): Promise<GitHubEvent[]> {
    const res = await fetch(
      `${GITHUB_API}/users/${GITHUB_USERNAME}/events/public?per_page=${limit}`
    );
    if (!res.ok) throw new Error('Failed to fetch activity');
    return res.json();
  },
};
