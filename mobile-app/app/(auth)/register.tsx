import Button from '@/components/Button';
import Input from '@/components/Input';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      return Alert.alert('Erro', 'Preencha todos os campos');
    }

    if (password !== confirmPassword) {
      return Alert.alert('Erro', 'As senhas não coincidem');
    }

    setLoading(true);
    try {
      await register({ email, password });
      Alert.alert('Sucesso', 'Conta criada com sucesso!', [
        { text: 'OK', onPress: () => router.replace('/(tabs)') },
      ]);
    } catch (error: any) {
      Alert.alert('Erro', error?.message || 'Erro ao registrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
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
              className="w-[226px] h-[226px]"
              resizeMode="contain"
            />
          </View>

          {/* Título */}
          <Text className="text-2xl font-bold mb-6 text-center">
            Crie sua conta
          </Text>

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
            className="mb-4"
          />
          <Input
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            className="mb-6"
          />

          {/* Botão */}
          <Button
            title={loading ? 'Criando...' : 'Criar conta'}
            onPress={handleRegister}
            disabled={loading}
          />

          {/* Link */}
          <Text
            className="text-center text-blue-500 mt-4"
            onPress={() => router.replace('/(auth)/login')}
          >
            Já tem conta? Entrar
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
