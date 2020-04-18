import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import MoveListContext from '../contexts/MoveListContext';
import PosterLoader from './PosterLoader';
import MovieSummary from './MovieSummary';
import { Link } from 'react-router-dom';

export const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_CDN_URL = 'https://image.tmdb.org/t/p/w440_and_h660_face/';
const PAGE_PER_MOVIES = 20;

const MovieContainer = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 1150px;
  margin: 0px auto;
`;

const MovieItem = styled.li`
  background-color: #f2f2f2;
  flex: none;
  width: 33%;
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

const LoadingState = styled.div`
  position: fixed;
  background: rgba(0.5, 0.5, 0.5, 0.5);
  width: 100%;
  height: 100%;
  top: 0;
`;

const MovieTitle = styled.h3`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: bold;
  padding: 0px 5px;
`;

function MovieList() {
  const { totalPage, setTotalPage, setMovies, movies, currentPage, setPage } = React.useContext(
    MoveListContext
  );

  const [isFetching, setFetching] = React.useState(false);

  const scrollController = React.useCallback(
    (event) => {
      const element = event.target.body;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (1 + scrollTop + window.innerHeight >= element.scrollHeight) {
        if (!totalPage || totalPage > currentPage) {
          setPage((value) => value + 1);
        }
      }
    },
    [currentPage, setPage, totalPage]
  );
  React.useEffect(() => {
    window.addEventListener('scroll', scrollController);
    return () => {
      window.removeEventListener('scroll', scrollController);
    };
  }, [totalPage, currentPage, scrollController]);

  React.useEffect(() => {
    console.log('process.env', process.env);
    async function callMovies() {
      if (!isFetching) {
        setFetching(true);
        try {
          const { data } = await axios.get(
            `/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&page=${currentPage}`,
            {
              baseURL: BASE_URL,
              // cancelToken: axios.CancelToken,
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
    if (Math.floor(movies.length / PAGE_PER_MOVIES) !== currentPage) {
      callMovies();
    }

    return () => {};
  }, [currentPage, movies, totalPage, setMovies, setTotalPage, isFetching, setPage]);

  return (
    <>
      <MovieContainer>
        {movies.map(
          (movie) =>
            // 포스터가 없는 영화는 영화가 아님
            movie.poster_path && (
              <MovieItem key={movie.id}>
                <Link to={{ pathname: `/detail/${movie.id}`, state: { movie } }}>
                  <PosterLoader url={movie.poster_path} />
                  <MovieTitle>{movie.title}</MovieTitle>
                  <MovieSummary releaseDate={movie.release_date} avgScore={movie.vote_average} />
                </Link>
              </MovieItem>
            )
        )}
      </MovieContainer>
      {isFetching && <LoadingState />}
    </>
  );
}
export default MovieList;
