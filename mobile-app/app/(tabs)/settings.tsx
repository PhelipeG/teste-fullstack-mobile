import AppHeader from '@/components/AppHeader';
import DeleteAccountModal from '@/components/DeleteAccountModal';
import { useAuth } from '@/hooks/useAuth';
import { useCurrentUser } from '@/hooks/useUserQuery';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SettingsScreen() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { logout } = useAuth();
  const { data: apiUser, isLoading } = useCurrentUser();

  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogout = async () => {
    Alert.alert('Sair', 'Tem certeza que deseja sair?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        onPress: async () => {
          try {
            await logout();
            router.replace('/(auth)/login');
          } catch (error) {
            console.error('Erro ao fazer logout:', error);
          }
        },
      },
    ]);
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <AppHeader title="Configurações" />
        <View className="flex-1 justify-center items-center">
          <Text className="font-inter text-gray-500">Carregando...</Text>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <AppHeader title="Configuração" />

      <View className="flex-1 px-6">
        {/* Ilustração */}
        <View className="items-center my-6">
          <Image
            source={require('../../assets/images/perfil.png')} // substitua pela imagem real
            className="w-40 h-40"
          />
        </View>

        {/* Informações do usuário */}
        <View className="space-y-4">
          <View className="flex-row justify-between items-center bg-white shadow-sm rounded-xl px-4 py-3">
            <Text className="text-lg text-gray-800 font-inter py-2">
              Email: {apiUser?.email || 'Carregando...'}
            </Text>
            <TouchableOpacity>
              <MaterialIcons name="edit" size={18} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Senha */}
          <View className="flex-row justify-between items-center bg-white shadow-sm rounded-xl px-4 py-3 mt-4">
            <Text className="text-lg text-gray-800 font-inter py-2">
              Senha: {showPassword ? (apiUser?.password || '123456') : '••••••••'}
            </Text>
            <TouchableOpacity 
              onPress={handleTogglePassword}
              className="p-2 -m-2"
              activeOpacity={0.6}
            >
              <MaterialIcons 
                name={showPassword ? "visibility-off" : "visibility"} 
                size={20} 
                color={showPassword ? "#DC2626" : "#6B7280"} 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Ações */}
        <Text className="text-lg font-inter-semibold mt-8 mb-3">Ações</Text>

        <View className="space-y-3">
          {/* Excluir conta */}
          <TouchableOpacity
            className="flex-row items-center bg-white shadow-sm rounded-xl px-4 py-3"
            onPress={handleDeleteAccount}
          >
            <MaterialIcons name="delete-outline" size={20} color="#DC2626" />
            <Text className="text-red-600 ml-2 text-lg font-inter leading-none tracking-normal">
              Excluir conta
            </Text>
          </TouchableOpacity>

          {/* Sair */}
          <TouchableOpacity
            className="flex-row items-center bg-white shadow-sm rounded-xl px-4 py-3 mt-3"
            onPress={handleLogout}
          >
            <MaterialIcons name="logout" size={20} color="#111827" />
            <Text className="text-gray-800 ml-2 text-lg font-inter leading-none tracking-normal">
              Sair
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal de exclusão de conta */}
      <DeleteAccountModal
        isVisible={showDeleteModal}
        onClose={handleCloseModal}
      />
    </SafeAreaView>
  );
}
