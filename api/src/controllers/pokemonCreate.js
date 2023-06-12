const { Pokemon, Type } = require('../db');

const createPokemon = async (
  name, image, life, attack, defense, speed, height, weight, types
) => {
  try {
    const existingType = await Type.findOne({ where: { name: types } });

    if (!existingType) {
      throw new Error('El tipo proporcionado no existe');
    }

    const newPokemon = await Pokemon.create({
      name,
      image,
      life,
      attack,
      defense,
      speed,
      height,
      weight,
    });

    await newPokemon.addType(existingType);

    return newPokemon;
  } catch (error) {
    throw error;
  }
};

module.exports = createPokemon;




