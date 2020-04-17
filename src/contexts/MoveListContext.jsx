import React from 'react';

const MovieListContext = React.createContext({ movies: [], selectedMovie: null });
export default MovieListContext;

export function MovieListProvider(props) {
  const [movies, setMovies] = React.useState([]); //[]기본값
  const [currentPage, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);
  return (
    <MovieListContext.Provider
      value={{
        movies,
        currentPage,
        setPage,
        selectedMovie: null,
        setMovies,
        totalPage,
        setTotalPage,
      }}
    >
      {props.children}
    </MovieListContext.Provider>
  );
}
