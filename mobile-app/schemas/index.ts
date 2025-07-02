// Tipos para formulários
export interface CreateActivityFormData {
  name: string;
  intensity: string;
  duration: number;
}

// Schema simples de validação (sem bibliotecas externas)
export const createActivitySchema = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  intensity: {
    required: true,
    options: ['Baixa', 'Média', 'Alta'],
  },
  duration: {
    required: true,
    min: 15,
    max: 300,
  },
};

// Função de validação simples
export function validateActivityForm(data: CreateActivityFormData): { 
  isValid: boolean; 
  errors: Partial<Record<keyof CreateActivityFormData, string>> 
} {
  const errors: Partial<Record<keyof CreateActivityFormData, string>> = {};

  // Validar nome
  if (!data.name || data.name.trim().length === 0) {
    errors.name = 'Nome é obrigatório';
  } else if (data.name.length < 2) {
    errors.name = 'Nome deve ter pelo menos 2 caracteres';
  } else if (data.name.length > 50) {
    errors.name = 'Nome deve ter no máximo 50 caracteres';
  }

  // Validar intensidade
  if (!data.intensity) {
    errors.intensity = 'Intensidade é obrigatória';
  } else if (!['Baixa', 'Média', 'Alta'].includes(data.intensity)) {
    errors.intensity = 'Intensidade inválida';
  }

  // Validar duração
  if (!data.duration || data.duration <= 0) {
    errors.duration = 'Duração é obrigatória';
  } else if (data.duration < 15) {
    errors.duration = 'Duração mínima é 15 minutos';
  } else if (data.duration > 300) {
    errors.duration = 'Duração máxima é 300 minutos';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
