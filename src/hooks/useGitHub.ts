import { useQuery } from '@tanstack/react-query';
import { githubService } from '../services/github';

export function useGitHubUser() {
  return useQuery({
    queryKey: ['github-user'],
    queryFn: () => githubService.getUser(),
    staleTime: 10 * 60 * 1000,
  });
}

export function useGitHubRepos(limit = 6) {
  return useQuery({
    queryKey: ['github-repos', limit],
    queryFn: () => githubService.getRepos(limit),
    staleTime: 5 * 60 * 1000,
  });
}

export function useGitHubActivity(limit = 10) {
  return useQuery({
    queryKey: ['github-activity', limit],
    queryFn: () => githubService.getActivity(limit),
    staleTime: 5 * 60 * 1000,
  });
}
