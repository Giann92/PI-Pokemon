import './App.css';
import { Route } from 'react-router-dom'
import LandingPage from './views/landing/LandingPage';

import Detail from './views/details/Detail';
import Home from './views/home/home';
import AddPokemonForm from './views/create/CreateForm';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';


const backgroundImages = {
  '/': 'https://www.xtrafondos.com/wallpapers/pokemon-unite-8254.jpg',
  '/pokemons': 'https://wallpaperset.com/w/full/5/0/c/383733.jpg',
  '/pokemons/:id':'https://www.xtrafondos.com/wallpapers/pokemon-unite-8254.jpg',
  '/create': 'https://www.xtrafondos.com/wallpapers/pokemon-unite-8254.jpg',
};

function App() {

  const location = useLocation();
  const [currentRoute, setCurrentRoute] = useState('');

  useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location]);
  
  const getBackgroundImage = (route) => {
    if (route === '/pokemons/:id') {
      return `url(${backgroundImages['/']})`;
    }
    return `url(${backgroundImages[route]})`;
  };
  useEffect(() => {
    const backgroundImage = getBackgroundImage(currentRoute);
    document.body.style.backgroundImage = backgroundImage;
  }, [currentRoute]);
  return (
    
      <div className="App">
        <Route exact path="/" component={LandingPage}/> 
        <Route exact path="/pokemons" component={Home}/>
        <Route exact path="/pokemons/:id" component={Detail}/>
        <Route exact path="/create" component={AddPokemonForm} />
      </div>
  
  );
}

export default App;
