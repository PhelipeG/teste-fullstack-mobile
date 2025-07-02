import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from 'dotenv';
import { basePrompt } from './prompt/prompt-fit-coach';

config(); // Carrega variáveis de ambiente

@Injectable()
export class ChatbotService {
  private genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

  async getResponse(prompt: string): Promise<string> {
    const model = this.genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-lite',
    });
    const finalPrompt = `${basePrompt}\nUsuário: ${prompt}\nResposta:`;

    const result = await model.generateContent(finalPrompt);
    const response = result.response;
    return response.text();
  }
}
