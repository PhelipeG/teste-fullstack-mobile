import { Feather, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (password?: string) => void;
  title: string;
  description: string;
  confirmButtonText: string;
  confirmButtonColor?: string;
  requirePassword?: boolean;
  isLoading?: boolean;
};

export default function ConfirmationModal({
  isVisible,
  onClose,
  onConfirm,
  title,
  description,
  confirmButtonText,
  confirmButtonColor = 'bg-red-800',
  requirePassword = false,
  isLoading = false,
}: Props) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleConfirm = () => {
    if (requirePassword) {
      onConfirm(password);
    } else {
      onConfirm();
    }
    setPassword('');
    setShowPassword(false);
  };

  const handleClose = () => {
    onClose();
    setPassword('');
    setShowPassword(false);
  };

  return (
    <Modal transparent={true} visible={isVisible}>
      <Pressable
        className="flex-1 justify-center items-center bg-black bg-opacity-30"
        onPress={handleClose}
      >
        <View className={`bg-white p-6 rounded-md border border-gray-200 w-96 max-w-sm ${requirePassword ? 'h-72' : 'h-auto'}`}>
          {/* Header */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold text-black">
              {title}
            </Text>
            <TouchableOpacity onPress={handleClose}>
              <Feather name="x" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Texto informativo */}
          <Text className="text-sm text-gray-500 mb-4">
            {description}
          </Text>

          {/* Campo de senha (opcional) */}
          {requirePassword && (
            <View className="flex-row items-center border-b border-gray-300 mb-6">
              <TextInput
                placeholder="CONFIRMAR SENHA"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                className="flex-1 py-2 text-base text-gray-800"
                placeholderTextColor="#9CA3AF"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Feather
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={18}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>
          )}

          {/* Botões */}
          <View className="flex-row justify-end gap-4 mt-4">
            <TouchableOpacity
              className="px-4 py-2 rounded-md bg-gray-100"
              onPress={handleClose}
              disabled={isLoading}
            >
              <Text className="text-gray-800 font-medium">Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-row items-center px-4 py-2 rounded-md ${confirmButtonColor} ${
                isLoading ? 'opacity-50' : ''
              }`}
              onPress={handleConfirm}
              disabled={isLoading}
            >
              <Text className="text-white font-medium mr-2">
                {isLoading ? 'Aguarde...' : confirmButtonText}
              </Text>
              {isLoading ? (
                <MaterialIcons name="hourglass-empty" size={18} color="white" />
              ) : (
                <MaterialIcons name="delete-outline" size={18} color="white" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}
