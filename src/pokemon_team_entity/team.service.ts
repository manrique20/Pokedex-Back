/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, Logger } from "@nestjs/common";
import { TeamEntity } from "./team.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";

@Injectable()
export class TeamService {
  private readonly logger = new Logger(TeamService.name);

  constructor(
    @InjectRepository(TeamEntity)
    private teamRepository: Repository<TeamEntity>,
  ) {}

  async findAll(): Promise<TeamEntity[]> {
    const teams = await this.teamRepository.find();
    this.logger.log(`Encontrados ${teams.length} usuarios`);
    this.logger.debug(teams);
    return teams;
  }

  async findOne(id: FindOneOptions<TeamEntity>): Promise<TeamEntity> {
    return await this.teamRepository.findOne(id);
  }

  async findOneByIdTrainer(id: number): Promise<TeamEntity> {
    return await this.teamRepository.findOne({ where: { id_trainer: id } });
  }

  async create(team: TeamEntity): Promise<TeamEntity> {
    return await this.teamRepository.save(team);
  }

  async update(id: any, team: TeamEntity): Promise<TeamEntity> {
    await this.teamRepository.update(id, team);
    return await this.teamRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.teamRepository.delete(id);
  }
}
