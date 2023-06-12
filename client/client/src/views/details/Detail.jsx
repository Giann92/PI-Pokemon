import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../redux/actions';
import { Link } from 'react-router-dom';
import s from './detail.module.css'
  ;

export default function Detail(props) {

  const dispatch = useDispatch();
  const details = useSelector((state) => state.detail);
  // console.log(details);

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  if (!details) {
    return <div>Cargando los detalles del Pokémon...</div>;
  }

  return (
    <div className={s.container}>
      <div className={s.pokemonDetail} >
        <h2 className={s.pokemonDetailName}>{details.name}</h2>
        <h3 className={s.nameType}>{details.type}</h3>
        <img className={s.pokemonDetail__image} src={details.image} alt={details.name} />
        <div className={s.progressBar}>
          <div className={s.progressBar__stat}>
            <span className={s.pokemonDetail__name} >Attack:</span>
            <div className={s.progressBar__fill} style={{ width: `${details.attack}%` }}>
              <span className={s.progressBar__number}>{details.attack}%</span>
            </div>
          </div>
          <div className={s.progressBar__stat}>
            <span className={s.pokemonDetail__name}>Life: </span>
            <div className={s.progressBar__fill} style={{ width: `${details.life}%` }}>
              <span className={s.progressBar__number}>{details.life}%</span>
            </div>
          </div>
          <div className={s.progressBar__stat}>
            <span className={s.pokemonDetail__name}>Defense:</span>
            <div className={s.progressBar__fill} style={{ width: `${details.defense}%` }}>
              <span className={s.progressBar__number}>{details.defense}%</span>
            </div>
          </div>
          <div className={s.progressBar__stat}>
            <span className={s.pokemonDetail__name}>Speed:</span>
            <div className={s.progressBar__fill} style={{ width: `${details.speed}%` }}>
              <span className={s.progressBar__number}>{details.speed}%</span>
            </div>
          </div>
          <div className={s.progressBar__stat}>
            <span className={s.pokemonDetail__name}>Height:</span>
            <div className={s.progressBar__fill} style={{ width: `${details.height}%` }}>
              <span className={s.progressBar__number}>{details.height}%</span>
            </div>
          </div>
          <div className={s.progressBar__stat}>
            <span className={s.pokemonDetail__name}>Weight:</span>
            <div className={s.progressBar__fill} style={{ width: `${details.weight}%` }}>
              <span className={s.progressBar__number}>{details.weight}%</span>
            </div>
          </div>
        </div>
      </div>
      <div className={s.pokemonDetail__closeBtn}>
        <Link to="/pokemons">Volver a la lista de Pokémons</Link>
      </div>
    </div>
  );
}






