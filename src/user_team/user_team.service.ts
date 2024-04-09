import { Injectable } from "@nestjs/common";
import { UsersEntity } from "src/users/users.entity";
import { UsersService } from "src/users/users.service";
import { ListService } from "src/list_pokemon_teams/list.service";
import { TeamService } from "src/pokemon_team_entity/team.service";
import { ListDto } from "src/list_pokemon_teams/list.interface";
import { TeamDto } from "src/pokemon_team_entity/team.interface";
import { List_pokemon_teamsEntity } from "src/list_pokemon_teams/list.entity";

@Injectable()
export class User_teamService {
  constructor(
    private readonly usersService: UsersService,
    private readonly teamService: TeamService,
    private readonly listService: ListService,
  ) {}

  async createUserTeam(user: UsersEntity, createListDto: ListDto, createTeamDto: TeamDto): Promise<void> {
    // 1. Crear una nueva entrada en la tabla `list`
    const newList = new List_pokemon_teamsEntity();
    newList.pokemon_1 = createListDto.pokemon_1;
    newList.pokemon_2 = createListDto.pokemon_2;
    newList.pokemon_3 = createListDto.pokemon_3;
    newList.pokemon_4 = createListDto.pokemon_4;
    newList.pokemon_5 = createListDto.pokemon_5;
    newList.pokemon_6 = createListDto.pokemon_6;
    await this.listService.create(newList);
  
    // 2. Crear una nueva entrada en la tabla `pokemon_team`
    const newTeam = await this.teamService.create(createTeamDto);
  
    // 3. Vincular la entrada de `list` con la entrada de `pokemon_team`
    newTeam.list = newList;
    await this.teamService.create(newTeam);
  
    // 4. Vincular el equipo Pokémon con el usuario que lo creó
    user.pokemon_team = newTeam;
    await this.usersService.create(user);
  }
  
}
