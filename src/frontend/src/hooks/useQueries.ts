import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { SpeedTestResult } from '../backend';

export function useSpeedTestTrend() {
  const { actor, isFetching } = useActor();

  return useQuery<SpeedTestResult[]>({
    queryKey: ['speedTestTrend'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSpeedTestTrend();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRecordSpeedTest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (result: SpeedTestResult) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.recordSpeedTest(result);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['speedTestTrend'] });
    },
  });
}
