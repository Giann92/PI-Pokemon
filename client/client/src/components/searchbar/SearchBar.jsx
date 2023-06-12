import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPokeByName } from "../../redux/actions";
import s from './searchStyle.module.css';

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value.replaceAll(/^\s+/g, "").replaceAll(/\s+/g, " "))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name !== '') {
      dispatch(searchPokeByName(name))
      setName("")
      console.log(name);
    };
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className={s.search}
          type="text"
          value={name}
          onChange={handleInputChange}
          placeholder="Buscar pokemon..."
        />
        <button className={s.boton} type="submit">Buscar</button>
      </form>
    </div>
  );
}