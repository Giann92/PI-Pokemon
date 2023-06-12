
import { FILTER_ATTACK, FILTER_CREATE, FILTER_TYPE, GET_DETAIL, GET_POKEMONS, GET_TYPE, SEARCH_ID, SEARCH_NAME, SORT, ADD_POKEMON, RESTORE } from '../actions/types'

const initialState = {
    pokemons: [],
    allPokemons: [],
    detail: [],
    types: [],
    filteredPokemons: [],
};

const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_POKEMONS:

            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload,
            };

        case GET_DETAIL:

            return {
                ...state,
                detail: action.payload,
            };
        case GET_TYPE:
            console.log(action.payload);
            return {
                ...state,
                types: action.payload,
            };
        case SEARCH_NAME:
            console.log(action.payload);
            return {
                ...state,
                pokemons: [action.payload],
            };
        case SEARCH_ID:
            return {
                ...state,
                pokemons: [action.payload],

            };
        case FILTER_TYPE:
            const allPokemons = state.allPokemons;
            const filterType = action.payload === "type" ? allPokemons : allPokemons.filter((el) => el.types.includes(action.payload))
            return {
                ...state,
                pokemons: filterType,
            };
        case FILTER_ATTACK:
            let filterAttack = [...state.allPokemons];
            filterAttack = filterAttack.sort((a, b) => {
                if (a.attack > b.attack) {
                    return action.payload === "Mayor fuerza" ? -1 : 1;

                }
                if (a.attack < b.attack) {
                    return action.payload === "Menor fuerza" ? -1 : 1;
                }
                return 0;
            });
            return {
                ...state,
                pokemons: action.payload === "Fuerza" ? state.allPokemons : filterAttack
            };
        case FILTER_CREATE:
            const filerCreate = action.payload === "Creados"
                ? state.allPokemons.filter((el) => el.id.length > 2)
                : state.allPokemons.filter((el) => el.id <= 40);
            return {
                ...state,
                pokemons: action.payload === "Todos" ? state.allPokemons : filerCreate
            };
        case SORT:
            let orderName = [...state.pokemons];
            orderName = orderName.sort((a, b) => {
                if (a.name < b.name) {
                    return action.payload === "ASCENDENTE" ? -1 : 1;
                }
                if (a.name > b.name) {
                    return action.payload === "DESCENDENTE" ? 1 : -1;
                }
                return 0;
            });
            return {
                ...state,
                pokemons: action.payload === "Filtro" ? state.allPokemons : orderName
            };

        case ADD_POKEMON:
            return {
                ...state,
                allPokemons: [...state.allPokemons, action.payload]
            };

        case RESTORE:
            return {
                ...state,
                allPokemons: state.filteredPokemons,
                pokemons: [],

            };


        default: return state;

    }
}
export default rootReducer;