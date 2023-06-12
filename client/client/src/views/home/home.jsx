import React, { useEffect, useState } from "react";
import CardPokemon from "../../components/card/CardPokemon";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import NavBar from "../../components/navbar/NavBar";
import SearchBar from "../../components/searchbar/SearchBar";
import Paginado from "../../components/paginado/Paginado";
import { Sort, filterByAttack, filterCreated, filterPokemonsByType, getPokemons } from "../../redux/actions";
import s from './home.module.css';

function Home() {
  const pokemons = useSelector((state) => state.pokemons);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(12);
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon );
    console.log(currentPokemons);
 
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);

  };

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);


  function handleFilterType(e) {
    dispatch(filterPokemonsByType(e.target.value));
  }

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  function handleFilterAttack(e) {
    dispatch(filterByAttack(e.target.value));
  }

  function onSelectsChange(e) {
    dispatch(Sort(e.target.value));
  }

  return (
    <>
      <NavBar />
      <SearchBar />
      <div>
        <div>
          <select name="select" onChange={onSelectsChange} className="a-z">
            <option value="Filtro"> A-Z:</option>
            <option value="ASCENDENTE">Ascendente</option>
            <option value="DESCENDENTE">Descendente</option>
          </select>
          <select name="selects" onChange={handleFilterAttack} className="attack">
            <option value="Fuerza"> Fuerza </option>
            <option value="Mayor fuerza">Mayor fuerza</option>
            <option value="Menor fuerza">Menor fuerza</option>
          </select>
          <select onChange={handleFilterType}>
            <option value="type"> Tipo </option>
            <option value="normal"> Normal </option>
            <option value="flying"> Flying </option>
            <option value="poison"> Poison </option>
            <option value="ground"> Ground </option>
            <option value="bug"> Bug </option>
            <option value="fire"> Fire </option>
            <option value="water"> Water </option>
            <option value="grass"> Grass </option>
            <option value="electric"> Electric </option>
            <option value="fairy"> Fairy </option>
          </select>
          <select onChange={handleFilterCreated}>
            <option value="Todos"> Todos </option>
            <option value="Creados"> Creados </option>
            <option value="Existentes"> Existentes </option>
          </select>
          <div className={s.paginado}>
            <Paginado
              pokemonsPerPage={pokemonsPerPage}
              pokemons={pokemons}
              paginado={paginado}
              page={currentPage}
            />
          </div>
          <div className={s.cardList}>
            {currentPokemons?.map(pokemon => {
              return (
                <Link key={pokemon.id} to={`/pokemons/${pokemon.id}`}>
                  <CardPokemon
                   
                    name={pokemon.name}
                    image={pokemon.image}
                    types={pokemon.types}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;