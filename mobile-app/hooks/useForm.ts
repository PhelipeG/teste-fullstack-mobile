import { useState } from 'react';

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  options?: string[];
}

interface ValidationSchema {
  [key: string]: ValidationRule;
}

export function useForm<T extends Record<string, any>>(
  initialValues: T,
  validationSchema?: ValidationSchema,
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const setValue = (field: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));

    // Limpar erro quando campo for alterado
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const setFieldTouched = (field: keyof T, isTouched = true) => {
    setTouched((prev) => ({ ...prev, [field]: isTouched }));
  };

  const validate = (): boolean => {
    if (!validationSchema) return true;

    const newErrors: Partial<Record<keyof T, string>> = {};

    Object.keys(validationSchema).forEach(field => {
      const rule = validationSchema[field];
      const value = values[field as keyof T];

      if (rule.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
        newErrors[field as keyof T] = `${field} é obrigatório`;
        return;
      }

      if (typeof value === 'string') {
        if (rule.minLength && value.length < rule.minLength) {
          newErrors[field as keyof T] = `${field} deve ter pelo menos ${rule.minLength} caracteres`;
        }
        if (rule.maxLength && value.length > rule.maxLength) {
          newErrors[field as keyof T] = `${field} deve ter no máximo ${rule.maxLength} caracteres`;
        }
        if (rule.options && !rule.options.includes(value)) {
          newErrors[field as keyof T] = `${field} deve ser uma das opções válidas`;
        }
      }

      if (typeof value === 'number') {
        if (rule.min && value < rule.min) {
          newErrors[field as keyof T] = `${field} deve ser pelo menos ${rule.min}`;
        }
        if (rule.max && value > rule.max) {
          newErrors[field as keyof T] = `${field} deve ser no máximo ${rule.max}`;
        }
      }
    });

    setErrors(newErrors);
    setTouched(Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    return Object.keys(newErrors).length === 0;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  const isFieldInvalid = (field: keyof T): boolean => {
    return Boolean(touched[field] && errors[field]);
  };

  return {
    values,
    errors,
    touched,
    setValue,
    setFieldTouched,
    validate,
    reset,
    setValues,
    isFieldInvalid,
    isValid: Object.keys(errors).length === 0,
    isDirty: JSON.stringify(values) !== JSON.stringify(initialValues),
  };
}
