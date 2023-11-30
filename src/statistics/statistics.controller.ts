import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StatisticsService } from './statistics.service';

@ApiTags('statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('/orgStatistics')
  orgStatistics() {
    return this.statisticsService.OrgStatistics();
  }

  @Get('/proStatistics')
  proStatistics() {
    return this.statisticsService.projectStatistics();
  }

  @Get('/allStatistics')
  allStatistics() {
    return this.statisticsService.allStatistics();
  }
}
