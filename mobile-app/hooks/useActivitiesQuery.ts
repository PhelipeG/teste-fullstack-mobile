import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createActivity, deleteActivity, getActivities, getActivitiesSummary, updateActivity } from '../services/activitiesService';
import { ActivityRequest } from '../types';

// Hook para buscar todas as atividades
export function useActivities() {
  return useQuery({
    queryKey: ['activities'],
    queryFn: getActivities,
  });
}

// Hook para buscar resumo das atividades
export function useActivitiesSummary() {
  return useQuery({
    queryKey: ['activities-summary'],
    queryFn: getActivitiesSummary,
  });
}

// Hook para criar nova atividade
export function useCreateActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (activity: ActivityRequest) => {
      return createActivity(activity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      queryClient.invalidateQueries({ queryKey: ['activities-summary'] });
    },
    onError: (error) => {
      console.error('Hook: Erro ao criar atividade:', error);
    },
  });
}

// Hook para deletar atividade
export function useDeleteActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteActivity(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      queryClient.invalidateQueries({ queryKey: ['activities-summary'] });
    },
  });
}

// Hook para atualizar atividade
export function useUpdateActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, activity }: { id: string; activity: ActivityRequest }) => 
      updateActivity(id, activity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      queryClient.invalidateQueries({ queryKey: ['activities-summary'] });
    },
  });
}
