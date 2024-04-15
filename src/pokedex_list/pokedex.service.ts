import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PokemonDto } from './pokedex.interface'; // Importa la interfaz PokemonData

@Injectable()
export class PokedexService {
  async fetchPokemons(): Promise<any[]> {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=151', { timeout: 10000 });
      return response.data.results;
    } catch (error) {
      throw error;
    }
  }

  async fetchPokemonDetails(pokemonData): Promise<PokemonDto[]> {
    try {
      if (pokemonData) {
        const promises = pokemonData.map(async (element) => {
          const response = await axios.get(element.url);
          const imagen = response.data.sprites.front_default;
          const type = response.data.types[0].type.name;
          const secondType = response.data.types[1]?.type.name;
          const name = element.name;
          const id = response.data.id;
          return { id, name, imagen, type, secondType } as PokemonDto; // Asegura que el objeto devuelto se ajuste a la interfaz PokemonData
        });
        return await Promise.all(promises);
      }
    } catch (error) {
      throw error;
    }
  }
}