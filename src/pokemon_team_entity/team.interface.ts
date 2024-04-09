import { List_pokemon_teamsEntity } from "src/list_pokemon_teams/list.entity";

export interface TeamDto{
    id: number;
    id_trainer: number;
    pokemon_list: number;

    list: List_pokemon_teamsEntity;
}