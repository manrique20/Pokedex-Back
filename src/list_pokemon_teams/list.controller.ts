

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ListService } from './list.service';
import { List_pokemon_teamsEntity } from './list.entity';
import { FindOneOptions } from 'typeorm';

@Controller('lists')
export class ListController {
    constructor(private readonly listService: ListService) {}

  @Get()
  async findAll(): Promise<List_pokemon_teamsEntity[]> {
    return this.listService.findAll();
  }
  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<List_pokemon_teamsEntity>{
    const listId: FindOneOptions<List_pokemon_teamsEntity> = { where: { id: parseInt(id) } };
    return this.listService.findOne(listId)
  }

  @Post()
  async create(@Body() list: List_pokemon_teamsEntity): Promise<List_pokemon_teamsEntity> {
    return this.listService.create(list);
  }
}
