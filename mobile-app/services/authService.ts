import * as SecureStore from 'expo-secure-store';
import { User } from '../types';
import { api } from './api';

export async function login(email: string, password: string): Promise<User> {
  const { data } = await api.post('/auth/login', { email, password });
  await SecureStore.setItemAsync('token', data.token);
  await SecureStore.setItemAsync('user', JSON.stringify({ email, password }));
  return { email, password };
}

export async function register(email: string, password: string): Promise<User> {
  const { data } = await api.post('/auth/register', { email, password });
  await SecureStore.setItemAsync('token', data.token);
  await SecureStore.setItemAsync('user', JSON.stringify({ email, password }));
  return { email, password };
}

export async function logout(): Promise<void> {
  await SecureStore.deleteItemAsync('token');
  await SecureStore.deleteItemAsync('user');
}

export async function getCurrentUser(): Promise<User> {
  const { data } = await api.get('/users/me');
  return data;
}
