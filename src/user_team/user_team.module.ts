import { User_teamService } from "./user_team.service";
import { User_teamController } from "./user_team.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersEntity } from "src/users/users.entity";
import { Module } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { TeamService } from "src/pokemon_team_entity/team.service";
import { TeamEntity } from "src/pokemon_team_entity/team.entity";
import { List_pokemon_teamsEntity } from "src/list_pokemon_teams/list.entity";
import { ListService } from "src/list_pokemon_teams/list.service";
/*
https://docs.nestjs.com/modules
*/

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersEntity,
      TeamEntity,
      List_pokemon_teamsEntity,
    ]), // Importa el repositorio de UsersEntity
  ],
  controllers: [User_teamController],
  providers: [User_teamService, UsersService, TeamService, ListService],
})
export class User_teamModule {}
