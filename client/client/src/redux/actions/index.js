import axios from "axios";
import { FILTER_ATTACK, FILTER_CREATE, FILTER_TYPE, GET_DETAIL, GET_POKEMONS, GET_TYPE, SEARCH_ID, SEARCH_NAME, SORT, ADD_POKEMON ,RESTORE } from '../actions/types'

export function getPokemons() {
    return async function (dispatch) {
        try {
            const response = await axios.get('http://localhost:3001/pokemons');
            const pokemons = response.data;
          //  console.log(pokemons);
            return dispatch({
                type: GET_POKEMONS,
                payload: pokemons,
            });
        } catch (error) {
            console.log("Error fetching pokemons:", error);
        }
    };
}

export function getDetail(id) {
    return async function (dispatch) {
      try {
        const pokem = await axios.get(`http://localhost:3001/pokemons/${id}`);
        const poke = pokem.data;
        console.log(poke);
        return dispatch({
          type: GET_DETAIL,
          payload: poke,
        });
      } catch (error) {
        return alert("No se encontró el pokemon");
      }
    };
  }


export function searchPokeByName(name) {
    return async function (dispach) {
        try {
            const search = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
            const poke = search.data
            console.log(poke);
            return dispach({
                type: SEARCH_NAME,
                payload: poke,
            });

        } catch (error) {
            return alert("No se encontro el pokemon con ese nombre");
        }
    }
}

export function searchPokeById(id) {
    return async function (dispach) {
        try {
            const search = await axios.get(`/pokemons/${id}`)
            const searchs = search.data
            return dispach({
                type: SEARCH_ID,
                payload: searchs,
            });
        } catch (error) {
            return alert("No se encontro el pokemon caca");
        }
    }
}

export function filterPokemonsByType(payload) {
    return {
        type: FILTER_TYPE,
        payload,
    }
}

export function Sort(order) {
    return {
        type: SORT,
        payload: order
    }
}

export function filterCreated(payload) {
    return {
        type: FILTER_CREATE,
        payload,
    }
}

export function filterByAttack(payload) {
    return {
        type: FILTER_ATTACK,
        payload,
    }
}



export function getType() {
    return async function(dispatch) {
      try {
        const response = await axios.get('http://localhost:3001/types');
        const types = response.data;
        console.log(types);
        dispatch({
          type: GET_TYPE,
          payload: types,
        });
      } catch (error) {
        alert("No se encontraron los tipos de Pokémon.");
      }
    }
  }


  export function addPokemon(payload) {
    return async function (dispatch) {
      try {
        const response = await axios.post("/pokemons",payload);
        console.log(response.data);
        // Dispatch con la respuesta de la API
        dispatch({
          type: ADD_POKEMON,
          payload: response.data,
        });
      } catch (error) {
        // Manejo de errores
      }
    };
  }
  

export function restore() {
    return {
        type: RESTORE,
    }
}