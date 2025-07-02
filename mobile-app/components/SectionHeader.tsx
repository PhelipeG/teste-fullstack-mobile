import React from 'react';
import { Text, View } from 'react-native';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <View className="mb-4">
      <Text className="font-inter font-medium text-xl leading-none tracking-normal text-gray-900 mb-1">
        {title}
      </Text>
      {subtitle && <Text className="text-sm text-gray-600">{subtitle}</Text>}
    </View>
  );
};
