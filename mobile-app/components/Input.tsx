import { TextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  placeholder: string;
}

export default function Input({ placeholder, multiline, ...props }: InputProps) {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="#9CA3AF"
      className={`border-b border-gray-500 px-2 py-3 text-base text-gray-900 bg-transparent ${
        multiline ? 'min-h-[100px]' : ''
      }`}
      multiline={multiline}
      textAlignVertical={multiline ? 'top' : 'center'}
      style={{ backgroundColor: 'transparent' }}
      {...props}
    />
  );
}
