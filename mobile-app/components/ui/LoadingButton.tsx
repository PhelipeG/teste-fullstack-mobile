import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { cn } from '@/utils/cn';

interface LoadingButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const variants = {
  primary: 'bg-black',
  secondary: 'bg-gray-100 border border-gray-300',
  danger: 'bg-red-600',
};

const textColors = {
  primary: 'text-white',
  secondary: 'text-gray-800',
  danger: 'text-white',
};

const sizes = {
  sm: 'py-2 px-3',
  md: 'py-3 px-4',
  lg: 'py-4 px-6',
};

export function LoadingButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  size = 'md',
  className,
}: LoadingButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      className={cn(
        'rounded-lg items-center justify-center flex-row',
        variants[variant],
        sizes[size],
        isDisabled && 'opacity-50',
        className,
      )}
      onPress={onPress}
      disabled={isDisabled}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={variant === 'secondary' ? '#374151' : 'white'}
          style={{ marginRight: 8 }}
        />
      )}

      <Text className={cn('font-medium text-base', textColors[variant])}>
        {loading ? 'Carregando...' : title}
      </Text>
    </TouchableOpacity>
  );
}
