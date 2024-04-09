import { ListService } from './../list_pokemon_teams/list.service';
import { TeamService } from "src/pokemon_team_entity/team.service";
import { Controller, Get, Param } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { User_TeamDto } from './user_team.interface';
import pokemonDetails from 'src/utils/pokemonDetails';

@Controller("trainer")
export class User_teamController {
  constructor(
    private readonly usersService: UsersService,
    private readonly teamService: TeamService,
    private readonly listService: ListService,
  ) {}

  @Get(":id")
  async encontrarUsuarioYEquipoPorId(
    
    @Param("id") id: number,
  ): Promise<User_TeamDto | undefined> {
    try {
      const user = await this.usersService.findOne(id);
      if (!user) {
        return undefined; // Si no se encuentra el usuario, devolver undefined
      }
      
      const team = await this.teamService.findOneByIdTrainer(user.id);
      if (!team) {
        return undefined; // Si no se encuentra el equipo, devolver undefined
      }

      const list = await this.listService.findOneByIdList(team.pokemon_list);
      if (!list) {
        return undefined; // Si no se encuentra la lista, devolver undefined
      }
      
      const pokemonDetailsApi=await pokemonDetails(list)
      const returnedData = { 
        id:user.id,
        nombre:user.nombre,
        email:user.email,
        pokemonDetailsApi
      }
      return returnedData;
    } catch (error) {
      console.error("Error:", error);
      return undefined;
    }
  }

  
}
