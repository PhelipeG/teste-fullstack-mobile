import { QueryProvider } from '@/providers/QueryProvider';
import {
  Inter_400Regular,
  Inter_600SemiBold,
  useFonts,
} from '@expo-google-fonts/inter';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import '../global.css';


export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
  });


  if (!fontsLoaded) {
    return (
      <>
        <View className='flex-1 items-center justify-center'>
          <Text className='text-2xl font-bold text-center'>Carregando fontes...</Text>
        </View>
      </>
    );
  }

  return (
    <QueryProvider>
      <StatusBar style="dark" backgroundColor="#F9FAFB" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="index" />
      </Stack>
    </QueryProvider>
  );
}
