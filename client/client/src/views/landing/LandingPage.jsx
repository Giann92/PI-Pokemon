import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import s from './landing.module.css'


function LandingPage(){
    return(
        <div className={s['default-image']}>
            <Link to="/pokemons">
                <button className={s.btn}>GO!</button>
            </Link>
        </div>
    )
}

export default LandingPage;