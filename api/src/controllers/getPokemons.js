const axios = require('axios');

const { Pokemon, Type } = require('../db');
const { Db } = require('sequelize')


const URL = "https://pokeapi.co/api/v2/pokemon?limit=80"

const getPokeInfoApi = async () => {
    const resPoke = await axios.get(URL).then((data) => {
        return data.data.results;
    }).then((data) => {
        return Promise.all(data.map((el) => axios.get(el.url)));
    }).then((data) => {
        return data.map((el) => el.data);
    });
    let arrPoke = resPoke.map((poke) => {
        return {
            id: poke.id,
            name: poke.name,
            types: poke.types.map((t) => t.type.name),
            image: poke.sprites.other.dream_world.front_default,
            life: poke.stats[0].base_stat,
            attack: poke.stats[1].base_stat,
            defense: poke.stats[2].base_stat,
            spseed: poke.stats[3].base_stat,
            height: poke.height,
            weight: poke.weight,
        };
    });
    //console.log(arrPoke);
    return arrPoke;
}
const getDbPokeInfo = async () => {
    try {
      const resulInfo = await Pokemon.findAll({
        include: {
          model: Type,
          attributes: ['name'],
          through: {
            attributes: [],
          }
        }
      });
      return resulInfo;
    } catch (error) {
      console.log('Error en la consulta a la base de datos:', error);
    }
  };
  
const getAllPokemons = async () => {
    const apiPokeInfo = await getPokeInfoApi();
    const dbPokeInfo = await getDbPokeInfo();

   
    const allPokeInfo = [...apiPokeInfo, ...dbPokeInfo.reduce((acc, curr) => {
        const duplicateIndex = acc.findIndex((poke) => poke.id === curr.id);
        if (duplicateIndex !== -1) {
        
            acc[duplicateIndex] = curr;
        } else {
          
            acc.push(curr);
        }
        return acc;
    }, [])];

    return allPokeInfo;
};
const getPokemonApiByName = async (name) => {
    try {
        const poke = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)).data;

        const searchNamePokeApi = {
            id: poke.id,
            name: poke.name,
            types: poke.types.map((t) => t.type.name),
            image: poke.sprites.other.dream_world.front_default,
            life: poke.stats[0].base_stat,
            attack: poke.stats[1].base_stat,
            defense: poke.stats[2].base_stat,
            spseed: poke.stats[3].base_stat,
            height: poke.height,
            weight: poke.weight,
        };
        return searchNamePokeApi;
    } catch (error) {
        console.log({error: error.message});
    }
}
const getPokeDbByName = async (name) => {
    try {
        const searchPokeNameDb = await Pokemon.findOne({ where: { name: name.toLowerCase() } });

        return searchPokeNameDb;
    } catch (error) {
        console.log({ error: error.message });
    }
};
const getPokemonApiById = async (id) => {

    try {
        const poke = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data;

        const searchPokeApi = {
            id: poke.id,
            name: poke.name,
            type: poke.types.map((t) => t.type.name),
            image: poke.sprites.other.dream_world.front_default,
            life: poke.stats[0].base_stat,
            attack: poke.stats[1].base_stat,
            defense: poke.stats[2].base_stat,
            speed: poke.stats[3].base_stat,
            height: poke.height,
            weight: poke.weight,
        };
       console.log(searchPokeApi);
        return searchPokeApi;
    } catch (error) {
        console.log({error: error.message});
    }
}
const getPokeDbId = async (id) => {
    try {
      const poke = await Pokemon.findByPk(id, { include: Type });
      const searchPokeDb = {
        id: poke.id,
        name: poke.name,
        type: poke.types.map((t) => t.type.name),
        image: poke.sprites.other.dream_world.front_default,
        life: poke.stats[0].base_stat,
        attack: poke.stats[1].base_stat,
        defense: poke.stats[2].base_stat,
        speed: poke.stats[3].base_stat,
        height: poke.height,
        weight: poke.weight,
      };
      console.log(searchPokeDb);
      return searchPokeDb;
    } catch (error) {
      console.log({ error: error.message });
    }
  };
  
module.exports = {
    getAllPokemons,
    getDbPokeInfo,
    getPokeInfoApi,
    getPokeDbByName,
    getPokemonApiByName,
    getPokemonApiById,
    getPokeDbId,
}