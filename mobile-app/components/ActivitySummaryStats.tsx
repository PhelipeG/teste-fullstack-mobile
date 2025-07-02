import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useActivitiesSummary } from '../hooks/useActivitiesQuery';
import { LoadingCard } from './ui/LoadingCard';

interface ActivityStats {
  totalActivities: number;
  totalMinutes: number;
  intensityBreakdown: {
    low: number;
    medium: number;
    high: number;
  };
}

export default function ActivitySummaryStats(){
  const { data: summaryData, isLoading, error, refetch } = useActivitiesSummary();

  // Mapear dados da API para o formato esperado
  const stats: ActivityStats = summaryData ? {
    totalActivities: summaryData.totalActivities || 0,
    totalMinutes: summaryData.totalMinutes || 0,
    intensityBreakdown: summaryData.intensityBreakdown || { low: 0, medium: 0, high: 0 }
  } : {
    totalActivities: 0,
    totalMinutes: 0,
    intensityBreakdown: { low: 0, medium: 0, high: 0 }
  };

  if (isLoading) {
    return (
      <LoadingCard message="Carregando estatísticas..." />
    );
  }

  if (error) {
    return (
      <View className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-4">
        <Text className="font-inter text-red-500 text-center mb-4">
          Erro ao carregar estatísticas
        </Text>
        <TouchableOpacity
          className="bg-blue-500 px-4 py-2 rounded-lg mx-auto"
          onPress={() => refetch()}
        >
          <Text className="font-inter text-white text-center font-medium">
            Tentar novamente
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="bg-white rounded-xl shadow-lg  border border-gray-100 p-6 mb-4">
      <Text className="font-inter-semibold text-lg text-gray-900 text-center mb-4">
        Resumo das Atividades
      </Text>
      
      <View className="flex-row justify-between">
        {/* Total de Atividades */}
        <View className="flex-1 items-center">
          <View className="bg-orange-100 p-3 rounded-full mb-2">
            <MaterialCommunityIcons name="fire" size={24} color="#EA580C" />
          </View>
          <Text className="font-inter-semibold text-2xl text-gray-900">
            {stats.totalActivities}
          </Text>
          <Text className="font-inter text-sm text-gray-500 text-center">
            Atividades
          </Text>
        </View>

        {/* Total de Minutos */}
        <View className="flex-1 items-center">
          <View className="bg-blue-100 p-3 rounded-full mb-2">
            <MaterialCommunityIcons name="clock-outline" size={24} color="#2563EB" />
          </View>
          <Text className="font-inter-semibold text-2xl text-gray-900">
            {stats.totalMinutes}
          </Text>
          <Text className="font-inter text-sm text-gray-500 text-center">
            Minutos
          </Text>
        </View>

        {/* Intensidade Mais Comum */}
        <View className="flex-1 items-center">
          <View className="bg-purple-100 p-3 rounded-full mb-2">
            <MaterialCommunityIcons name="chart-bar" size={24} color="#7C3AED" />
          </View>
          <Text className="font-inter-semibold text-2xl text-gray-900">
            {Math.max(stats.intensityBreakdown.low, stats.intensityBreakdown.medium, stats.intensityBreakdown.high)}
          </Text>
          <Text className="font-inter text-sm text-gray-500 text-center">
            {stats.intensityBreakdown.high > stats.intensityBreakdown.medium && 
             stats.intensityBreakdown.high > stats.intensityBreakdown.low ? 'Alta' :
             stats.intensityBreakdown.medium > stats.intensityBreakdown.low ? 'Média' : 'Baixa'}
          </Text>
        </View>
      </View>

      {/* Detalhamento da Intensidade */}
      <View className="mt-4 pt-4 border-t border-gray-100">
        <Text className="font-inter-semibold text-sm text-gray-900 mb-3 text-center">
          Distribuição por Intensidade
        </Text>
        <View className="flex-row justify-between">
          <View className="items-center">
            <View className="bg-green-100 px-3 py-1 rounded-full mb-1">
              <Text className="font-inter text-xs font-medium text-green-700">
                Baixa
              </Text>
            </View>
            <Text className="font-inter text-sm text-gray-600">
              {stats.intensityBreakdown.low}
            </Text>
          </View>
          
          <View className="items-center">
            <View className="bg-yellow-100 px-3 py-1 rounded-full mb-1">
              <Text className="font-inter text-xs font-medium text-yellow-700">
                Média
              </Text>
            </View>
            <Text className="font-inter text-sm text-gray-600">
              {stats.intensityBreakdown.medium}
            </Text>
          </View>
          
          <View className="items-center">
            <View className="bg-red-100 px-3 py-1 rounded-full mb-1">
              <Text className="font-inter text-xs font-medium text-red-700">
                Alta
              </Text>
            </View>
            <Text className="font-inter text-sm text-gray-600">
              {stats.intensityBreakdown.high}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
