import { Controller, Get } from '@nestjs/common';
import { PokedexService } from './pokedex.service';

@Controller('pokedex')
export class PokedexController {
  constructor(private readonly pokedexService: PokedexService) {}

  @Get()
  async fetchPokemonData() {
    try {
      const pokemonData = await this.pokedexService.fetchPokemons();
      const completePokemonData = await this.pokedexService.fetchPokemonDetails(pokemonData);
      return completePokemonData;
    } catch (error) {
      throw error;
    }
  }
}
