import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../services/authService';

// Hook para obter dados do usuário atual
export function useCurrentUser() {
  return useQuery({
    queryKey: ['user', 'current'],
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: false,
  });
}
