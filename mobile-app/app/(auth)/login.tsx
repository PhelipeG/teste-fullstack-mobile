import Button from '@/components/Button';
import Input from '@/components/Input';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, SafeAreaView, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    setLoading(true);
    try {
      await login({ email, password });
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Erro', error?.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          paddingHorizontal: 24,
          paddingVertical: 20,
        }}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={20}
      >
        <View className="w-full max-w-sm mx-auto">
          {/* Logo */}
          <View className="mb-8 items-center">
            <Image
              source={require('@/assets/images/logo.png')}
              className='w-[226px] h-[226px]'
              resizeMode="contain"
            />
          </View>

          {/* Título */}
          <Text className="text-2xl font-bold mb-6 text-center">Entrar</Text>

          {/* Formulário */}
          <Input
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            className="mb-4"
          />
          <Input
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="mb-6"
          />

          {/* Botão */}
          <Button
            title={loading ? 'Entrando...' : 'Entrar'}
            onPress={handleLogin}
            disabled={loading}
          />

          {/* Link */}
          <Text
            className="text-center text-blue-500 mt-4"
            onPress={() => router.replace('/(auth)/register')}
          >
            Não tem conta? Cadastre-se
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
