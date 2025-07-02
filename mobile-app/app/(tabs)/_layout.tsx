import { Tabs } from 'expo-router';
import { TabBarIcon } from '@/components/ui/TabBarIcon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#292929',
        headerShown: false,
        tabBarStyle: {
          height: 77,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          paddingTop: 5,
          paddingBottom: 5,
          width: '100%',
          alignSelf: 'center',
        },
      }}
    >
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name={'chatbubble-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name={'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name={'settings-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="register-activity"
        options={{
          title: 'Registrar Atividade',
          href: null, // Oculta da tab bar
        }}
      />
    </Tabs>
  );
}
