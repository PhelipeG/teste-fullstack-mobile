import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useActivities } from '../hooks/useActivitiesQuery';
import type { Activity } from '../types';
import AlertModal from './AlertModal';
import { EmptyActivities } from './ui/EmptyActivities';
import { LoadingCard } from './ui/LoadingCard';

interface RecentActivitiesCardProps {
  maxItems?: number;
  onActivityPress?: (activity: Activity) => void;
  showEditIcon?: boolean;
}

export default function RecentActivitiesCard({
  maxItems = 5,
  onActivityPress,
  showEditIcon = false,
}: RecentActivitiesCardProps) {
  const { data: activities = [], isLoading, error } = useActivities();
  const [showErrorModal, setShowErrorModal] = useState(false);

  // Mapear intensidade da API (inglês) para interface (português)
  const mapIntensity = (intensity: string) => {
    const intensityMap: Record<string, string> = {
      'low': 'Baixa',
      'medium': 'Média', 
      'high': 'Alta'
    };
    return intensityMap[intensity] || intensity;
  };

  // Mapear atividades com intensidade traduzida
  const mappedActivities = activities.map(activity => ({
    ...activity,
    intensity: mapIntensity(activity.intensity)
  }));
  // pegando as ultimas atividades registradas no caso as 5 ultimas
  const recentActivities = mappedActivities.slice(0, maxItems);

  if (isLoading) {
    return <LoadingCard message="Carregando atividades..." />;
  }

  if (error) {
    return (
      <>
        <TouchableOpacity
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-4 my-2"
          onPress={() => setShowErrorModal(true)}
          activeOpacity={0.7}
        >
          <View className="py-8 items-center">
            <Text className="font-inter text-red-500 text-center font-medium">
              Erro ao carregar atividades
            </Text>
            <Text className="font-inter text-sm text-gray-400 text-center mt-1">
              Toque para ver detalhes
            </Text>
          </View>
        </TouchableOpacity>
        
        <AlertModal
          visible={showErrorModal}
          type="error"
          message={error instanceof Error ? error.message : 'Erro ao carregar atividades'}
          onClose={() => setShowErrorModal(false)}
        />
      </>
    );
  }

  return (
    <View className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-4">
      {/* Divider */}
      <View className="h-px bg-gray-200 mb-4" />

      {/* Recent Activities */}
      <View>
        <Text className="font-inter-semibold text-center text-lg text-gray-900 mb-3">
          Últimas atividades registradas
        </Text>

        {recentActivities.length > 0 ? (
          <View>
            {/* Header da tabela */}
            <View className="flex-row bg-gray-50 rounded-lg p-3 mb-2">
              <Text className="font-inter-semibold text-sm text-gray-600 w-16">
                Data
              </Text>
              <Text className="font-inter-semibold text-sm text-gray-600 flex-1 ml-2">
                Nome da Atividade
              </Text>
              <Text className="font-inter-semibold text-sm text-gray-600 w-24 text-center">
                Intensidade
              </Text>
              <Text className="font-inter-semibold text-sm text-gray-600 w-16 text-right">
                Duração
              </Text>
              {showEditIcon && (
                <Text className="font-inter-semibold text-sm text-gray-600 w-8 text-right">
                  
                </Text>
              )}
            </View>

            {/* Linhas das atividades */}
            {recentActivities.slice(0, maxItems).map((activity: Activity, index: number) => (
              <TouchableOpacity
                key={activity.id}
                className={`flex-row items-center py-3 ${
                  index !== recentActivities.slice(0, maxItems).length - 1
                    ? 'border-b border-gray-100'
                    : ''
                }`}
                onPress={() => onActivityPress?.(activity)}
                activeOpacity={0.7}
              >
                <Text className="font-inter text-xs text-gray-700 w-16">
                  {new Date(activity.createdAt)
                    .toLocaleDateString('pt-BR')
                    .slice(0, 5)}
                </Text>
                <View className="flex-1 ml-2">
                  <Text
                    className="font-inter text-sm text-gray-900 font-medium"
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {activity.name}
                  </Text>
                </View>
                <View className="w-24 items-center">
                  <View
                    className={`px-3 py-1 rounded-full ${
                      activity.intensity === 'Alta'
                        ? 'bg-red-100'
                        : activity.intensity === 'Média'
                          ? 'bg-yellow-100'
                          : 'bg-green-100'
                    }`}
                  >
                    <Text
                      className={`font-inter text-xs font-medium ${
                        activity.intensity === 'Alta'
                          ? 'text-red-700'
                          : activity.intensity === 'Média'
                            ? 'text-yellow-700'
                            : 'text-green-700'
                      }`}
                    >
                      {activity.intensity}
                    </Text>
                  </View>
                </View>
                <Text className="font-inter text-xs text-gray-700 w-16 text-right mr-2">
                  {activity.duration}min 
                </Text>
                {showEditIcon && (
                  <MaterialIcons name="edit" size={16} color="#4B5563" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <EmptyActivities />
        )}
      </View>
    </View>
  );
};
