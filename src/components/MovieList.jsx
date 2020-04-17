import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import MoveListContext from '../contexts/MoveListContext';

export const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_CDN_URL = 'https://image.tmdb.org/t/p/w440_and_h660_face/';
const PAGE_PER_MOVIES = 20;

const MovieContainer = styled.ul``;

const MovieItem = styled.li``;

function MovieList() {
  const { totalPage, setTotalPage, setMovies, movies, currentPage, setPage } = React.useContext(
    MoveListContext
  );

  const [isFetching, setFetching] = React.useState(false);

  const scrollController = (event) => {
    // console.log(totalPage, currentPage);
    const element = event.target.body;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    // console.log(scrollTop + window.innerHeight, element.scrollHeight);
    if (1 + scrollTop + window.innerHeight >= element.scrollHeight) {
      // if (!isFetching) {
      if (!totalPage || totalPage > currentPage) {
        setPage((value) => value + 1); //오류가 있어 로드되는 동안 로드가 되서
      }
      // }
    }
  };
  React.useEffect(() => {
    window.addEventListener('scroll', scrollController);
    return () => {
      window.removeEventListener('scroll', scrollController);
    };
  }, [totalPage, currentPage]);

  React.useEffect(() => {
    async function callMovies() {
      if (!isFetching) {
        setFetching(true);
        try {
          const { data } = await axios.get(
            `/movie/now_playing?api_key=40bf80f6870c3b230323ccf339f432f4&page=${currentPage}`,
            {
              baseURL: BASE_URL,
            }
          );
          setMovies([...movies, ...data.results]);
          setPage(data.page);
          setTotalPage(data.total_pages);
        } finally {
          setFetching(false);
        }
      }
    }
    console.log(movies);
    if (Math.floor(movies.length / PAGE_PER_MOVIES) !== currentPage) {
      callMovies();
    }

    return () => {};
  }, [currentPage, movies]);

  return (
    <MovieContainer>
      <h2>MovieList</h2>
      <MovieItem>MovieItem</MovieItem>
    </MovieContainer>
  );
}

export default MovieList;
