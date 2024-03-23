/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, Logger } from "@nestjs/common";
import { List_pokemon_teamsEntity } from "./list.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";

@Injectable()
export class ListService {
  private readonly logger = new Logger(ListService.name);

  constructor(
    @InjectRepository(List_pokemon_teamsEntity)
    private listsRepository: Repository<List_pokemon_teamsEntity>,
  ) {}

  async findAll(): Promise<List_pokemon_teamsEntity[]> {
    const lists = await this.listsRepository.find();
    this.logger.log(`Encontrados ${lists.length} usuarios`);
    this.logger.debug(lists);
    return lists;
  }

  async findOne(
    id: FindOneOptions<List_pokemon_teamsEntity>,
  ): Promise<List_pokemon_teamsEntity> {
    return await this.listsRepository.findOne(id);
  }
  async findOneByIdList(id: number): Promise<List_pokemon_teamsEntity> {
    return await this.listsRepository.findOne({ where: { id: id } });
  }

  async create(
    list: List_pokemon_teamsEntity,
  ): Promise<List_pokemon_teamsEntity> {
    return await this.listsRepository.save(list);
  }

  async update(
    id: any,
    list: List_pokemon_teamsEntity,
  ): Promise<List_pokemon_teamsEntity> {
    await this.listsRepository.update(id, list);
    return await this.listsRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.listsRepository.delete(id);
  }
}
