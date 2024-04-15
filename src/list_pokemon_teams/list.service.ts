import { TeamService } from 'src/pokemon_team_entity/team.service';
import { Injectable, Logger } from "@nestjs/common";
import { List_pokemon_teamsEntity } from "./list.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { TeamEntity } from 'src/pokemon_team_entity/team.entity';

@Injectable()
export class ListService {

  private readonly logger = new Logger(ListService.name);

  constructor(
    @InjectRepository(List_pokemon_teamsEntity)
    private listsRepository: Repository<List_pokemon_teamsEntity>,
    private readonly teamService: TeamService,
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

  async create(list: List_pokemon_teamsEntity): Promise<List_pokemon_teamsEntity> {
    // Buscar al entrenador por su ID
    const trainer = await this.listsRepository.findOne({ where: { trainer_id: list.trainer_id } });
  
    // Si no se encuentra al entrenador, lanzar un error o manejar el caso según lo desees
    if (!trainer) {
      this.listsRepository.save(list);
    }
  
    // Utilizar await para esperar el resultado de teamService.findOne
    const foundTeam = await this.teamService.findOne({ where: { id_trainer: list.trainer_id } });
    if(!foundTeam){
      const teamEntity: TeamEntity = {
        id_trainer: list.trainer_id,
        pokemon_list: list.trainer_id,
        id: 0,
        list: new List_pokemon_teamsEntity
      };
      await this.teamService.create(teamEntity);
    }
  
    const camposPokemon = ['pokemon_1', 'pokemon_2', 'pokemon_3', 'pokemon_4', 'pokemon_5', 'pokemon_6'];
    for (let i = 0; i < camposPokemon.length; i++) {
      if (trainer[camposPokemon[i]] === null) {
        trainer[camposPokemon[i]] = list.pokemonId;
        break;
      }
    }
    const updatedList = await this.listsRepository.save(trainer);
    return updatedList;
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
