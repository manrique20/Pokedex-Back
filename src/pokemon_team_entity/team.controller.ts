/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamEntity } from './team.entity';
import { FindOneOptions } from 'typeorm';

@Controller('team')
export class TeamController {
    constructor(private readonly teamService: TeamService) {}

  @Get()
  async findAll(): Promise<TeamEntity[]> {
    return this.teamService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<TeamEntity> {
    const teamId: FindOneOptions<TeamEntity> = { where: { id: parseInt(id) } };
    return this.teamService.findOne(teamId);
  }

  @Post()
  async create(@Body() team: TeamEntity): Promise<TeamEntity> {
    return this.teamService.create(team);
  }
}
