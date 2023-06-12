import React from "react";
import s from './cardStyle.module.css'


const CardPokemon = ({ id, name, types, image }) => {

  return (
    <div className={s.cardContainer}>
      
      <h1 className={s.nameStyle}>name: {name.charAt(0).toUpperCase() + name.slice(1)}</h1>
      <img src={image || '../../image/sombraPikachu.png'} alt={name}  width="120px" height="120px"/>
      <h3 className={s.typeStyle}> type: {types.toString().split('')}</h3>
    </div>
  );
};
export default CardPokemon;