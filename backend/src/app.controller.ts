import { Controller, Post, Body } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Controller('api')
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  @Post('respond')
  async getAIResponse(@Body() body: { data: string }) {
    const openaiApiKey = this.configService.get<string>('OPENAI_API_KEY');

    if (!openaiApiKey) {
      throw new Error('OpenAI API Key is missing!');
    }

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          model: 'text-davinci-003', // 또는 다른 GPT 모델 사용 가능
          prompt: body.data,
          max_tokens: 150,
        },
        {
          headers: {
            Authorization: `Bearer ${openaiApiKey}`,
          },
        },
      );

      return { answer: response.data.choices[0].text.trim() };
    } catch (error) {
      console.error('Error fetching data from OpenAI API:', error);
      throw new Error(`Failed to fetch response from OpenAI: ${error.message}`);
    }
  }
}
