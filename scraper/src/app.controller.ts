import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Property } from './getPropertyInfo';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post()
  startCrawl(): Promise<Property[]> {
    return this.appService.getUR();
  }
}
