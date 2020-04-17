import React from 'react';
import GlobalStyle from './styles/GlobalStyle';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <div className='App'>!!!</div>
    </Router>
  );
}

export default App;
