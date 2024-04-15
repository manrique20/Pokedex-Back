import { TypeOrmModule } from "@nestjs/typeorm";
import { List_pokemon_teamsEntity } from "./list.entity";
import { ListService } from "./list.service";
/*
https://docs.nestjs.com/modules
*/

import { Module } from "@nestjs/common";
import { ListController } from "./list.controller";
import { TeamService } from "src/pokemon_team_entity/team.service";
import { TeamModule } from "src/pokemon_team_entity/team.module";

@Module({
  imports: [TypeOrmModule.forFeature([List_pokemon_teamsEntity]), TeamModule],
  controllers: [ListController],
  providers: [ListService, TeamService],
})
export class ListModule {}
