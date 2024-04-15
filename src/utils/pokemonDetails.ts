//crear funcion axios que reciba el id del pokemon por parametro, y de la api de postman retorne esa info.

//https://pokeapi.co/api/v2/pokemon/:id/

import axios from "axios";
import { List_pokemon_teamsEntity } from "src/list_pokemon_teams/list.entity";
async function pokemonDetails(pokemonsTeam: List_pokemon_teamsEntity): Promise<any> {
  try {
    const pokeInfo = []
    for (const clave in pokemonsTeam) {
      if ((clave !== "id" && clave!== "trainer_id") && pokemonsTeam.hasOwnProperty(clave)) {
          const valor = pokemonsTeam[clave];
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${valor}`, { timeout: 10000 });
          const responseData = response.data;
          const {name, id, cries:{latest}, sprites:{front_default}, types} = responseData;
          const typeNames = types.map((type) => type.type.name);
          const type=typeNames[0];
          const secondType = typeNames[1] ? typeNames[1] : null;
          pokeInfo.push({name, id, latest, imagen:front_default, type, secondType})
        }
    }
    return pokeInfo;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error;
  }
}

export default pokemonDetails;