import React from 'react';
import { View, Text, Modal, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type AlertType = 'success' | 'error';

type AlertModalProps = {
  visible: boolean;
  type: AlertType;
  message: string;
  onClose?: () => void;
};

export default function AlertModal({
  visible,
  type,
  message,
  onClose,
}: AlertModalProps) {
  const isError = type === 'error';

  // Configuração baseada no tipo de alerta
  const bgColor = isError ? 'bg-red-50' : 'bg-green-50';
  const textColor = isError ? 'text-red-500' : 'text-green-500';
  const iconName = isError ? 'close' : 'check-circle';
  const iconColor = isError ? '#EF4444' : '#10B981';

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 justify-center items-center bg-black/50"
        onPress={onClose}
      >
        <View
          className={`w-4/5 max-w-xs ${bgColor} rounded-3xl px-6 py-5 items-center`}
        >
          <View className="rounded-full w-12 h-12 justify-center items-center mb-3">
            <MaterialIcons name={iconName} size={48} color={iconColor} />
          </View>
          <Text className={`${textColor} text-center font-semibold text-base`}>
            {message}
          </Text>
        </View>
      </Pressable>
    </Modal>
  );
}
