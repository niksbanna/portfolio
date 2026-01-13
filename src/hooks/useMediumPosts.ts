import { useQuery } from '@tanstack/react-query';
import { mediumService } from '../services/medium';

export function useMediumPosts() {
  return useQuery({
    queryKey: ['medium-posts'],
    queryFn: () => mediumService.getPosts(),
    staleTime: 10 * 60 * 1000,
  });
}
