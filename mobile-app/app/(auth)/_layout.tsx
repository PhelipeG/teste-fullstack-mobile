import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

export default function AuthLayout() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
        }}
      />
    </>
  );
}
