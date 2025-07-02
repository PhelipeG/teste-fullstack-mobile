import ActionButton from '@/components/ActionButton';
import ActivitySummaryStats from '@/components/ActivitySummaryStats';
import AppHeader from '@/components/AppHeader';
import RecentActivitiesCard from '@/components/RecentActivitiesCard';


import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';

export default function HomeScreen() {
  const handleNewActivity = () => {
    router.push('/register-activity');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <AppHeader title="Início" />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Seção de Atividades */}
        <View className="mx-2 my-1 rounded-lg">
          <View className="px-4">
            <ActivitySummaryStats />
          </View>
        </View>

        <View className="mx-2 rounded-lg">
          <View className="px-4">
            <RecentActivitiesCard maxItems={5} showEditIcon={false} />
          </View>
        </View>

        {/* Botão Nova Atividade */}
        <View className="px-4 py-6">
          <ActionButton
            title="Nova atividade"
            onPress={handleNewActivity}
            variant="primary"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
