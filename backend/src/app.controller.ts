import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('data')
  getData() {
    return { message: 'Data fetched successfully' };
  }
  @Post('data')
  postData(@Body() data: any) {
    console.log('Received data:', data);
    return { message: 'Data received successfully' };
  }
}
