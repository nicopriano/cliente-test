import React from 'react';
import './scss/index.scss';
import SearchBar from './components/SearchBar';
import {
  Route,
  Switch,
} from 'react-router-dom';

import HomePage from './views/HomePage';
import ItemsList from './views/ItemsList';
import ItemDetail from './views/ItemDetail';

function App() {

  return (
      <div className="App light">
        <SearchBar />
        <article className="base-container">
          <Switch>
            <Route path="/" exact component={HomePage}/>
            <Route path="/items" strict exact component={ItemsList}/>
            <Route path="/items/:id" component={ItemDetail}/>
          </Switch>
        </article>
      </div>
  );
}

export default App;
