import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPokemon, getType } from '../../redux/actions';
import { useHistory } from 'react-router-dom';
import s from './create.module.css';
import { Link } from 'react-router-dom';

const AddPokemonForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector((state) => state.types);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    life: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    types: [], // Cambiado el nombre del campo a selectedTypes
  });

  useEffect(() => {
    dispatch(getType());
  }, [dispatch]);

  const handleTypeSelect = (e) => {
    const selectedType = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      types: [...prevFormData.types, selectedType],
    }));
  };

  function handleInputChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: '',
    }));
  }

  function validate(pokemon) {
    let errors = {};
    if (!pokemon.name) {
      errors.name = 'Se requiere un nombre';
    }
    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validate(formData);
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      await dispatch(addPokemon(formData));
      await dispatch(getType());
      alert('Pokemon creado con éxito.');
      setFormData({
        name: '',
        image: '',
        life: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        types: [], // Cambiado el nombre del campo a selectedTypes
      });
      history.push('/pokemons');
    }
  };

  return (
    <div className={`${s['form-container']}`}>

      <h2>Agregar Pokémon</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className={s['error-message']}>{errors.name}</p>}
        </div>
        <div>
          <label>Imagen:</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Vida:</label>
          <input
            type="number"
            name="life"
            value={formData.life}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Ataque:</label>
          <input
            type="number"
            name="attack"
            value={formData.attack}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Defensa:</label>
          <input
            type="number"
            name="defense"
            value={formData.defense}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Velocidad:</label>
          <input
            type="number"
            name="speed"
            value={formData.speed}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Altura:</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Peso:</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <select onChange={handleTypeSelect}> 
            {types.map((type) => ( 
              <option key={type.name} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
          <ul>
            {formData?.types.map((type) => ( 
              <li key={type}>{type.name}</li>
            ))}
          </ul>
        </div>
        <button className={s['submit-button']} type="submit">
          Agregar
        </button>
      </form>
      <button className={s['backBtn']}>
        <Link className={s['link']} to="/pokemons">Volver a la lista de Pokémons</Link>
      </button>
    </div>
  );
};

export default AddPokemonForm;





