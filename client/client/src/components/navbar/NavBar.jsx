import React from "react";
import s from './navStyle.module.css'
import { Link } from "react-router-dom/cjs/react-router-dom";



export default function NavBar() {

    return (
        <header id="navegador" className={s.header}>
          <Link to="/">
            <img  className={s.logo} src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg" alt="404" />
          </Link>
         <div> <Link to="/create" className={s.created} >
              <button className={s.btn}>
                Crear Pokemon
                </button> 
              </Link></div>
    
        </header>
  
    );
}
