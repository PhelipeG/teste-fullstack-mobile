import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ActionButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  icon?: string;
  fullWidth?: boolean;
  backgroundColor?: string;
}

export default function ActionButton({
  title,
  onPress,
  variant = 'primary',
  icon,
  fullWidth = true,
}: ActionButtonProps) {
  const getButtonStyles = () => {
    const baseStyles = 'py-4 px-6 rounded-lg items-center justify-center';

    if (variant === 'primary') {
      return `${baseStyles} bg-[#0A0A0A]`;
    }
    return `${baseStyles} bg-gray-100 border border-gray-300`;
  };

  const getTextStyles = () => {
    if (variant === 'primary') {
      return 'text-white font-semibold text-base';
    }
    return 'text-gray-900 font-semibold text-base';
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${getButtonStyles()} ${fullWidth ? 'w-full' : ''}`}
      activeOpacity={0.8}
    >
      <View className="flex-row items-center">
        {icon && <Text className="text-lg mr-2">{icon}</Text>}
        <Text className={getTextStyles()}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
