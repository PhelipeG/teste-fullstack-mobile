import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { cn } from '@/utils/cn';

interface FormPickerOption {
  label: string;
  value: string | number;
}

interface FormPickerProps {
  label?: string;
  value: string | number;
  onValueChange: (value: string | number) => void;
  options: FormPickerOption[];
  error?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

export function FormPicker({
  label,
  value,
  onValueChange,
  options,
  error,
  required = false,
  placeholder = 'Selecione uma opção',
  className,
}: FormPickerProps) {
  return (
    <View className="mb-4">
      {label && (
        <Text className="text-base font-medium text-gray-700 mb-2">
          {label}
          {required && <Text className="text-red-500 ml-1">*</Text>}
        </Text>
      )}

      <View
        className={cn(
          'border border-gray-300 rounded-lg',
          error && 'border-red-500',
          className,
        )}
      >
        <Picker
          selectedValue={value}
          onValueChange={onValueChange}
          style={{ height: 50 }}
        >
          <Picker.Item label={placeholder} value="" enabled={false} />
          {options.map((option, index) => (
            <Picker.Item
              key={index}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>

      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
}
