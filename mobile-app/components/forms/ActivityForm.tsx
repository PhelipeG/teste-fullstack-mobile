import React from 'react';
import { View } from 'react-native';
import { useForm } from '../../hooks/useForm';
import { CreateActivityFormData, createActivitySchema } from '../../schemas';
import { ActivityRequest } from '../../types';
import { FormInput } from '../ui/FormInput';
import { FormPicker } from '../ui/FormPicker';
import { LoadingButton } from '../ui/LoadingButton';

interface ActivityFormProps {
  initialData?: Partial<ActivityRequest>;
  onSubmit: (data: ActivityRequest) => Promise<void>;
  loading?: boolean;
  submitButtonText?: string;
}

const INTENSITY_OPTIONS = [
  { label: 'Baixa', value: 'Baixa' },
  { label: 'Média', value: 'Média' },
  { label: 'Alta', value: 'Alta' },
];

const DURATION_OPTIONS = [
  { label: '30 Min', value: 30 },
  { label: '45 Min', value: 45 },
  { label: '60 Min', value: 60 },
  { label: '90 Min', value: 90 },
  { label: '120 Min', value: 120 },
];

export function ActivityForm({
  initialData,
  onSubmit,
  loading = false,
  submitButtonText = 'Salvar Atividade',
}: ActivityFormProps) {
  const { values, errors, setValue, validate, isFieldInvalid } =
    useForm<CreateActivityFormData>(
      {
        name: initialData?.name || '',
        intensity: initialData?.intensity || 'Média',
        duration: initialData?.duration || 30,
      },
      createActivitySchema,
    );

  const handleSubmit = async () => {
    if (validate()) {
      try {
        await onSubmit({
          name: values.name,
          intensity: values.intensity,
          duration: values.duration,
        });
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  return (
    <View className="space-y-4">
      <FormInput
        label="Nome da Atividade"
        value={values.name}
        onChangeText={(text) => setValue('name', text)}
        error={isFieldInvalid('name') ? errors.name : undefined}
        placeholder="Ex: Corrida, Natação, Musculação..."
        required
      />

      <FormPicker
        label="Intensidade"
        value={values.intensity}
        onValueChange={(value) => setValue('intensity', value)}
        options={INTENSITY_OPTIONS}
        error={isFieldInvalid('intensity') ? errors.intensity : undefined}
        placeholder="Selecione a intensidade"
        required
      />

      <FormPicker
        label="Duração"
        value={values.duration}
        onValueChange={(value) => setValue('duration', Number(value))}
        options={DURATION_OPTIONS}
        error={isFieldInvalid('duration') ? errors.duration : undefined}
        placeholder="Selecione a duração"
        required
      />

      <LoadingButton
        title={submitButtonText}
        onPress={handleSubmit}
        loading={loading}
        variant="primary"
        size="lg"
        className="mt-6"
      />
    </View>
  );
}
