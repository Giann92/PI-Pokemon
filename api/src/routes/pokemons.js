const {Router} = require("express")

const{getPokemonHandler , getPokemonIdHandler, createPokemonHandler} = require('../handlers/pokemonHandlers')


const pokemonsRouter = Router();

pokemonsRouter.get('/', getPokemonHandler);

pokemonsRouter.get('/:id', getPokemonIdHandler);

pokemonsRouter.post('/', createPokemonHandler)

module.exports = pokemonsRouter;