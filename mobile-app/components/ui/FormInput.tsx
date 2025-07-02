import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { cn } from '@/utils/cn';

interface FormInputProps extends TextInputProps {
  label?: string;
  error?: string;
  required?: boolean;
}

export function FormInput({
  label,
  error,
  required = false,
  className,
  ...props
}: FormInputProps) {
  return (
    <View className="mb-4">
      {label && (
        <Text className="text-base font-medium text-gray-700 mb-2">
          {label}
          {required && <Text className="text-red-500 ml-1">*</Text>}
        </Text>
      )}

      <TextInput
        className={cn(
          'border-b border-gray-300 pb-2 text-base text-gray-800',
          error && 'border-red-500',
          className,
        )}
        placeholderTextColor="#9CA3AF"
        {...props}
      />

      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
}
