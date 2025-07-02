import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createActivity, getActivities } from '../services/activitiesService';

export function useActivities() {
  const queryClient = useQueryClient();

  const { data: activities = [], isLoading } = useQuery({
    queryKey: ['activities'],
    queryFn: getActivities,
  });

  const createMutation = useMutation({
    mutationFn: createActivity,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['activities'] }),
  });

  return {
    activities,
    isLoading,
    createActivity: createMutation.mutateAsync,
    createLoading: createMutation.isPending,
  };
}
