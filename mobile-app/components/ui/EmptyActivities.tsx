import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

interface EmptyProps {
  title?: string;
  subtitle?: string;
}

export const EmptyActivities: React.FC<EmptyProps> = ({
  title = 'Nenhuma atividade registrada ainda',
  subtitle = 'Registre sua primeira atividade!'
}) => (
  <View className="py-8 items-center">
    <MaterialCommunityIcons name="emoticon-sad-outline" size={48} color="#9CA3AF" style={{ marginBottom: 8 }} />
    <Text className="font-inter text-gray-500 text-center">
      {title}
    </Text>
    <Text className="font-inter text-sm text-gray-400 text-center mt-1">
      {subtitle}
    </Text>
  </View>
);


