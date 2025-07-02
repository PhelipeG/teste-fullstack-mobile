import { Activity, ActivityRequest } from '../types';
import { api } from './api';

export async function getActivities(): Promise<Activity[]> {
  const { data } = await api.get('/activities');
  return data || [];
}

export async function createActivity(activity: ActivityRequest): Promise<Activity> {
  // Mapear intensidade para o formato da API
  const intensityMap: Record<string, string> = {
    'Baixa': 'low',
    'Média': 'medium', 
    'Alta': 'high'
  };

  const apiData = {
    name: activity.name,
    duration: activity.duration,
    intensity: intensityMap[activity.intensity] || 'medium'
  };

  console.log('Enviando para API:', apiData);
  
  const { data } = await api.post('/activities', apiData);
  return data.data || data;
}

export async function updateActivity(id: string, activity: ActivityRequest): Promise<Activity> {
  // Mapear intensidade para o formato da API
  const intensityMap: Record<string, string> = {
    'Baixa': 'low',
    'Média': 'medium', 
    'Alta': 'high'
  };

  const apiData = {
    name: activity.name,
    duration: activity.duration,
    intensity: intensityMap[activity.intensity] || activity.intensity.toLowerCase()
  };

  console.log('Atualizando atividade:', id, apiData);
  
  const { data } = await api.patch(`/activities/${id}`, apiData);
  return data.data || data;
}

export async function deleteActivity(id: string): Promise<void> {
  await api.delete(`/activities/${id}`);
}

export async function getActivitiesSummary(): Promise<any> {
  const { data } = await api.get('/activities/summary');
  return data || {};
}
