import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useUserStore } from '../store/userStore';

export default function RootIndex() {
  const router = useRouter();
  const { isAuthenticated, isLoading, loadSession } = useUserStore();
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  // Carregar a sessão e verificar autenticação
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Verificando autenticação...');
        await loadSession();
        setHasCheckedAuth(true);
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        setHasCheckedAuth(true);
      }
    };

    checkAuth();
  }, [loadSession]);

  // Redirecionar após verificar autenticação
  useEffect(() => {
    if (hasCheckedAuth && !isLoading) {
      console.log(
        'Status de autenticação:',
        isAuthenticated ? 'Autenticado' : 'Não autenticado',
      );

      if (isAuthenticated) {
        console.log('Redirecionando para tabs...');
        router.replace('/(tabs)');
      } else {
        console.log('Redirecionando para login...');
        router.replace('/(auth)/login');
      }
    }
  }, [router, isAuthenticated, isLoading, hasCheckedAuth]);

  if (isLoading || !hasCheckedAuth) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={{ marginTop: 20 }}>Verificando sessão...</Text>
      </View>
    );
  }

  return null;
}
