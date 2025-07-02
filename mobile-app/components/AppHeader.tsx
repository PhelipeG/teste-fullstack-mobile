import React from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';

interface AppHeaderProps {
  title: string;
  rightComponent?: React.ReactNode;
}

export default function AppHeader({ title, rightComponent }: AppHeaderProps) {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
      <SafeAreaView>
        {Platform.OS === 'android' && (
          <View style={{ height: StatusBar.currentHeight }} />
        )}
        <View
          className={`flex-row items-center justify-between p-4 bg-white border-b border-gray-200`}
        >
          <View className="flex-row items-center flex-1">
            <Image
              source={require('../assets/images/logo.png')} 
              className={`w-10 h-10 mr-3`}
              resizeMode="contain"
            />
            <Text className={`text-2xl font-bold text-black`}>{title}</Text>
          </View>
          
          {rightComponent && (
            <View className="ml-3">
              {rightComponent}
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};
