import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

interface LoadingCardProps {
  message?: string;
}

export const LoadingCard: React.FC<LoadingCardProps> = ({ 
  message = "Carregando..." 
}) => {
  return (
    <View className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-4 my-2">
      <View className="py-8 items-center">
        <ActivityIndicator size="small" color="#6B7280" />
        <Text className="font-inter text-gray-500 text-center mt-3">
          {message}
        </Text>
      </View>
    </View>
  );
};
