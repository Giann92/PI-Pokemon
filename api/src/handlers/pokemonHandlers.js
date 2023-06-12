const { createPokemon } = require('../controllers/pokemonCreate')
const { getAllPokemons, getPokemonApiByName, getPokeDbByName, getPokemonApiById, getPokeDbId, getDbPokeInfo } = require('../controllers/getPokemons')
const { DB } = require("sequelize");
const { Pokemon, Type } = require('../db')


const getPokemonHandler = async (req, res, next) => {
  try {
    const { name } = req.query;
    let allPokemons = await getAllPokemons();

    if (name) {
      const pokeName = await getPokemonApiByName(name.toLowerCase());
      const pokeByNameDb = await getPokeDbByName(name.toLowerCase());

      if (pokeName) {
        res.status(200).json(pokeName);
      } else if (pokeByNameDb) {
        res.status(200).json(pokeByNameDb);
      } else {
        res.status(404).json("No se encontró el nombre del Pokemon");
      }
    } else {
      res.status(200).json(allPokemons);
    }
  } catch (error) {
    next(error);
  }
};

const getPokemonIdHandler = async (req, res) => {
  const { id } = req.params;

  if (id) {
    let pokeId = null;
    pokeId = await getPokemonApiById(id);
    
    if (!pokeId) {
      pokeId = await getPokeDbId(id);
    }

    if (pokeId) {
      res.status(200).json(pokeId);
    } else {
      res.status(404).json("No se encontró un Pokémon con ese ID");
    }
  } else {
    res.status(400).json("ID de Pokémon no proporcionado");
  }
};

const createPokemonHandler = async (req, res) => {
  try {
    const { name, image, life, attack, defense, speed, height, weight, types } = req.body;

    // Check if the name property exists
    if (!name) {
      return res.status(400).json({ info: "El nombre es obligatorio" });
    }

    // Create a new Pokémon
    const newPokemon = await Pokemon.create({
      name: name.toLowerCase(),
      image,
      life,
      attack,
      defense,
      speed,
      height,
      weight,
    });

    let type = await Type.findAll({
      where: { name: types },
    });

    await newPokemon.setTypes(type);

    let resultPokemon = await Pokemon.findAll({
      where: { name: name },
      include: [
        {
          model: Type,
          attributes: ['name'],
        },
      ],
    });

    res.status(200).json(resultPokemon);
  } catch (error) {
    console.log(error);
    res.status(400).json("Error al verificar los datos");
  }
};


module.exports = {
    getPokemonHandler,
    getPokemonIdHandler,
    createPokemonHandler
}