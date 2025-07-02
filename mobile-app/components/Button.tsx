import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  ...props
}: ButtonProps) {
  const baseClasses = 'w-full mt-6 rounded-md py-3 items-center';

  const getVariantClasses = () => {
    if (disabled) return 'bg-gray-400';

    switch (variant) {
      case 'primary':
        return 'bg-black';
      case 'secondary':
        return 'bg-gray-200';
      case 'danger':
        return 'bg-red-600';
      default:
        return 'bg-black';
    }
  };

  const getTextClasses = () => {
    if (disabled) return 'text-gray-200 font-medium';

    switch (variant) {
      case 'primary':
        return 'text-white font-medium';
      case 'secondary':
        return 'text-gray-800 font-medium';
      case 'danger':
        return 'text-white font-medium';
      default:
        return 'text-white font-medium';
    }
  };

  return (
    <TouchableOpacity
      className={`${baseClasses} ${getVariantClasses()}`}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      {...props}
    >
      <Text className={getTextClasses()}>{title}</Text>
    </TouchableOpacity>
  );
}
