import { useAuth } from '@/hooks/useAuth';
import { router } from 'expo-router';
import React from 'react';
import ConfirmationModal from './ConfirmationModal';

type Props = {
  isVisible: boolean;
  onClose: () => void;
};

export default function DeleteAccountModal({
  isVisible,
  onClose,
}: Props) {
  const { logout } = useAuth();

  const handleDeleteAccount = async () => {
    try {
      onClose();
      await logout();
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <ConfirmationModal
      isVisible={isVisible}
      onClose={onClose}
      onConfirm={handleDeleteAccount}
      title="Excluir conta"
      description="Para confirmar a exclusão da sua conta, confirme sua senha no campo abaixo"
      confirmButtonText="Excluir conta"
      confirmButtonColor="bg-red-800"
      requirePassword={true}
    />
  );
}
