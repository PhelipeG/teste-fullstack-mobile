import ActivitySummaryStats from '@/components/ActivitySummaryStats';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import AlertModal from '../../components/AlertModal';
import AppHeader from '../../components/AppHeader';
import RecentActivitiesCard from '../../components/RecentActivitiesCard';
import RegisterActivitySheet from '../../components/RegisterActivitySheet';
import {
  useCreateActivity,
  useDeleteActivity,
  useUpdateActivity,
} from '../../hooks/useActivitiesQuery';
import { Activity, ActivityRequest } from '../../types';

export default function RegisterActivityScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);

  // Usar os hooks corretos da API
  const createActivityMutation = useCreateActivity();
  const updateActivityMutation = useUpdateActivity();
  const deleteActivityMutation = useDeleteActivity();

  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlertType(type);
    setAlertMessage(message);
    setAlertVisible(true);

    // Ocultar o alerta após 3 segundos
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000);
  };

  const handleCreateActivity = async (data: ActivityRequest) => {
    try {
      console.log('Criando atividade:', data);
      await createActivityMutation.mutateAsync(data);
      showAlert('success', 'Atividade registrada com sucesso!');
      setModalVisible(false);
    } catch (error) {
      console.error('Erro ao criar atividade:', error);
      showAlert(
        'error',
        'Houve um erro ao registrar sua atividade, tente novamente.',
      );
    }
  };

  const handleEditActivity = async (data: ActivityRequest) => {
    if (!currentActivity?.id) return;

    try {
      console.log('Editando atividade:', currentActivity.id, data);
      await updateActivityMutation.mutateAsync({
        id: currentActivity.id,
        activity: data,
      });
      showAlert('success', 'Atividade atualizada com sucesso!');
      setModalVisible(false);
      setIsEditing(false);
      setCurrentActivity(null);
    } catch (error) {
      console.error('Erro ao atualizar atividade:', error);
      showAlert(
        'error',
        'Houve um erro ao atualizar sua atividade, tente novamente.',
      );
    }
  };

  const handleDeleteActivity = async () => {
    if (!currentActivity?.id) return;

    try {
      console.log('Deletando atividade:', currentActivity.id);
      await deleteActivityMutation.mutateAsync(currentActivity.id);
      showAlert('success', 'Atividade excluída com sucesso!');
      setModalVisible(false);
      setIsEditing(false);
      setCurrentActivity(null);
    } catch (error) {
      console.error('Erro ao excluir atividade:', error);
      showAlert(
        'error',
        'Houve um erro ao excluir sua atividade, tente novamente.',
      );
    }
  };

  const handleOpenCreateModal = () => {
    setIsEditing(false);
    setCurrentActivity(null);
    setModalVisible(true);
  };

  const handleActivityPress = (activity: Activity) => {
    setIsEditing(true);
    setCurrentActivity(activity);
    setModalVisible(true);
  };

  return (
    <View className="flex-1 bg-gray-50">
      <AppHeader title="Nova atividade" />

      <ScrollView className="px-4 mt-4" showsVerticalScrollIndicator={false}>
        <ActivitySummaryStats />

        {/* Card com as últimas atividades */}
        <RecentActivitiesCard
          maxItems={5}
          onActivityPress={handleActivityPress}
          showEditIcon={true}
        />
        <View className="justify-center items-center bg-white mx-2 rounded-lg shadow-sm mb-2">
          <Text className="text-md p-4">
            Clique em uma atividade para editar ou excluir.
          </Text>
        </View>
        
        <TouchableOpacity
          className="bg-black py-4 rounded-xl items-center shadow-sm"
          onPress={handleOpenCreateModal}
          activeOpacity={0.8}
        >
          <Text className="text-white font-inter-semibold text-lg">
            Nova atividade
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal para registrar ou editar atividade */}
      <RegisterActivitySheet
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setIsEditing(false);
          setCurrentActivity(null);
        }}
        onRegister={handleCreateActivity}
        onEdit={handleEditActivity}
        onDelete={handleDeleteActivity}
        editingActivity={currentActivity}
        isEditing={isEditing}
      />

      {/* AlertModal para exibir mensagens */}
      <AlertModal
        visible={alertVisible}
        type={alertType}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
    </View>
  );
}
