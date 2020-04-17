import React from 'react';
import styled from 'styled-components';

const MovieContainer = styled.ul``;
const MovieItem = styled.li``;

function MovieList() {
  return (
    <MovieContainer>
      <h2>MovieList</h2>
      <MovieItem>MovieItem</MovieItem>
    </MovieContainer>
  );
}

export default MovieList;
