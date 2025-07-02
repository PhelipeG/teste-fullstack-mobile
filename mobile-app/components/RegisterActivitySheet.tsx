import React, { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { Activity, ActivityRequest } from '../types';
import DeleteActivityModal from './DeleteActivityModal';
import { ActivityForm } from './forms/ActivityForm';
import { LoadingButton } from './ui/LoadingButton';

interface RegisterActivitySheetProps {
  visible: boolean;
  onClose: () => void;
  onRegister: (data: ActivityRequest) => Promise<void>;
  onEdit?: (data: ActivityRequest) => Promise<void>;
  onDelete?: () => Promise<void>;
  editingActivity?: Activity | null;
  isEditing?: boolean;
}

export default function RegisterActivitySheet({
  visible,
  onClose,
  onRegister,
  onEdit,
  onDelete,
  editingActivity,
  isEditing = false,
}: RegisterActivitySheetProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSubmit = async (data: ActivityRequest) => {
    try {
      if (isEditing && onEdit) {
        await onEdit(data);
      } else {
        await onRegister(data);
      }
      onClose();
    } catch (error) {
      console.error('Error submitting activity:', error);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;

    setIsDeleting(true);
    try {
      await onDelete();
      setShowDeleteModal(false);
      onClose();
    } catch (error) {
      console.error('Error deleting activity:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white p-6 rounded-t-3xl">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-semibold">
              {isEditing ? 'Editar Atividade' : 'Nova Atividade'}
            </Text>
            <Pressable onPress={onClose}>
              <Feather name="x" size={22} color="#000" />
            </Pressable>
          </View>

          {/* Form */}
          <ActivityForm
            initialData={editingActivity || undefined}
            onSubmit={handleSubmit}
            submitButtonText={
              isEditing ? 'Salvar Alterações' : 'Registrar Atividade'
            }
          />

          {/* Delete Button (only when editing) */}
          {isEditing && onDelete && (
            <LoadingButton
              title="Excluir Atividade"
              onPress={() => setShowDeleteModal(true)}
              loading={false}
              variant="danger"
              size="md"
              className="mt-4"
            />
          )}
        </View>
      </View>

      {/* Delete Confirmation Modal */}
      <DeleteActivityModal
        isVisible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        activity={editingActivity || null}
        isLoading={isDeleting}
      />
    </Modal>
  );
}
