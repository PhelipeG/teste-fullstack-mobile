import axios from 'axios';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const getBaseURL = () => {
  if (__DEV__) {
    // Se estiver usando tunnel do Expo, use seu IP local
    if (Constants.expoConfig?.hostUri?.includes('exp.direct')) {
      return 'http://192.168.3.77:3000'; // Seu IP local mesmo com tunnel
    }
    
    // Desenvolvimento normal
    if (Platform.OS === 'android') {
      return Constants.platform?.android?.isDevice 
        ? 'http://192.168.3.77:3000' // Dispositivo físico(substitua pelo seu IP local + porta da api)
        : 'http://10.0.2.2:3000';     // Emulador
    }
    
    if (Platform.OS === 'ios') {
      return 'http://192.168.3.77:3000'; // iPhone
    }
    
    return 'http://localhost:3000'; // Web
  }
  
  return 'https://sua-api-producao.com'; // Produção
};

export const API_BASE_URL = getBaseURL();

console.log('🌐 Using API URL:', API_BASE_URL);
console.log('🚇 Expo Host URI:', Constants.expoConfig?.hostUri);

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('token');
  if (token) config.headers.Authorization = `Bearer ${token}`; 
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: {
        method: error.config?.method,
        url: error.config?.url,
        data: error.config?.data
      }
    });
    return Promise.reject(error);
  }
);
