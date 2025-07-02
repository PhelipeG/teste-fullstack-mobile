import AppHeader from '@/components/AppHeader';
import Input from '@/components/Input';
import { useChatbot } from '@/hooks/useChatbot';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const INITIAL_MESSAGE: Message = {
  id: '1',
  text: 'Olá! Sou seu assistente de fitness. Como posso te ajudar hoje?',
  isUser: false,
  timestamp: new Date(),
};

export default function ChatScreen() {
  const { mutate: sendChatMessage, isPending } = useChatbot();
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  const keyboardAwareRef = useRef<KeyboardAwareScrollView>(null);

  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const sendMessage = () => {
    if (inputText.trim() === '' || isPending) return;

    const messageText = inputText.trim();
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    sendChatMessage(messageText, {
      onSuccess: (reply) => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: reply,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      },
      onError: () => {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Desculpe, ocorreu um erro. Tente novamente.',
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      },
    });
  };

  const clearHistory = () => {
    Alert.alert(
      'Limpar Conversa',
      'Tem certeza que deseja limpar todo o histórico da conversa?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Limpar',
          style: 'destructive',
          onPress: () => {
            setMessages([INITIAL_MESSAGE]);
          },
        },
      ]
    );
  };

  const renderClearButton = () => (
    <TouchableOpacity
      onPress={clearHistory}
      className="p-2 rounded-lg bg-gray-100"
      activeOpacity={0.7}
    >
      <MaterialIcons name="delete-sweep" size={20} color="#6B7280" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppHeader
        title="Chat IA"
        rightComponent={renderClearButton()}
      />

      <KeyboardAwareScrollView
        ref={keyboardAwareRef}
        style={{ flex: 1 }}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        enableResetScrollToCoords={false}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        extraHeight={Platform.OS === 'android' ? 200 : 50}
        extraScrollHeight={Platform.OS === 'android' ? 180 : 50}
        keyboardOpeningTime={100}
      >
        <View className="flex-1">
          {/* Área de mensagens com scroll */}
          <ScrollView
            ref={scrollViewRef}
            className="flex-1 px-4 py-4"
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            showsVerticalScrollIndicator={false}
          >
            {messages.map((message) => (
              <View
                key={message.id}
                className={`mb-4 ${message.isUser ? 'items-end' : 'items-start'}`}
              >
                <View
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-blue-500 rounded-br-none'
                      : 'bg-gray-200 rounded-bl-none'
                  }`}
                >
                  <Text
                    className={`text-base font-inter ${
                      message.isUser ? 'text-white' : 'text-gray-800'
                    }`}
                  >
                    {message.text}
                  </Text>
                </View>
                <Text className="text-xs text-gray-500 mt-1 font-inter">
                  {message.timestamp.toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </View>
            ))}
          </ScrollView>

          {/* Input fixo na parte inferior */}
          <View className="flex-row items-center p-4 border-t border-gray-200 bg-white">
            <Input
              value={inputText}
              onChangeText={setInputText}
              placeholder="Digite sua mensagem..."
              className="flex-1 mr-3"
              multiline
              maxLength={500}
              onSubmitEditing={sendMessage}
              returnKeyType="send"
            />
            <TouchableOpacity
              onPress={sendMessage}
              className={`w-12 h-12 rounded-lg items-center justify-center ${
                inputText.trim() === '' || isPending
                  ? 'bg-gray-100 border border-gray-300'
                  : 'bg-[#0A0A0A]'
              }`}
              disabled={inputText.trim() === '' || isPending}
              activeOpacity={0.8}
            >
              <MaterialIcons
                name={isPending ? 'hourglass-empty' : 'send'}
                size={20}
                color={inputText.trim() === '' || isPending ? '#6B7280' : 'white'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
