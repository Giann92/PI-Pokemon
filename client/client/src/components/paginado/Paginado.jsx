import React from "react";
import s from './paginado.module.css';

export default function Paginado({ pokemonsPerPage, pokemons, paginado, page }) {
  const pageNumbers = [];
  const totalPages = Math.ceil(pokemons.length / pokemonsPerPage);

  if (totalPages <= 4) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (page <= 4) {
      for (let i = 1; i <= 4; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...", totalPages); // Agregar "..." y el número de la última página
    } else if (page >= totalPages - 3) {
      pageNumbers.push(1, "..."); // Agregar el número de la primera página y "..."
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1, "...", page - 1, page, page + 1, "...", totalPages); // Agregar "..." y los números adyacentes a la página actual
    }
  }

  return (
    <nav className={s.nav}>
      <ul className={s.number}>
        {page > 1 && (
          <li>
            <button className={s.btnNP} onClick={() => paginado(page - 1)}>
              Anterior
            </button>
          </li>
        )}
        {pageNumbers.map((number, index) => (
          <li key={index}>
            <button
              className={s.btn}
              onClick={() => paginado(number)}
              disabled={number === page} // Desactivar el botón si corresponde a la página actual
            >
              {number === "..." ? "..." : number}
            </button>
          </li>
        ))}
        {page < totalPages && (
          <li>
            <button className={s.btnNP} onClick={() => paginado(page + 1)}>
              Siguiente
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}




