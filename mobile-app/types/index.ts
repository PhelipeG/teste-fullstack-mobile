export interface User {
  id?: string;
  email: string;
  password?: string;
  name?: string;
  createdAt?: string;
}

export interface Activity {
  id: string;
  name: string;
  duration: number;
  intensity: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface ActivityRequest {
  name: string;
  duration: number;
  intensity: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}
