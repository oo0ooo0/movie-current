import React from 'react';
import GlobalStyle from './styles/GlobalStyle';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import MovieList from './components/MovieList';
import { MovieListProvider } from './contexts/MoveListContext';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <div className='App'>
        <header>
          <h1>Now Playing</h1>
        </header>
        <MovieListProvider>
          <Route exact path='/'>
            <MovieList />
          </Route>
        </MovieListProvider>
      </div>
    </Router>
  );
}

export default App;
