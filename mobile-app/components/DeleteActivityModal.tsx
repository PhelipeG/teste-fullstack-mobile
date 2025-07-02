import React from 'react';
import { Activity } from '../types';
import ConfirmationModal from './ConfirmationModal';

type Props = {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  activity: Activity | null;
  isLoading?: boolean;
};

export default function DeleteActivityModal({
  isVisible,
  onClose,
  onConfirm,
  activity,
  isLoading = false,
}: Props) {
  return (
    <ConfirmationModal
      isVisible={isVisible}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Excluir atividade"
      description={`Tem certeza que deseja excluir a atividade "${activity?.name}"? Esta ação não pode ser desfeita.`}
      confirmButtonText="Excluir atividade"
      confirmButtonColor="bg-red-800"
      requirePassword={false}
      isLoading={isLoading}
    />
  );
}
