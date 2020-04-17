import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export const BASE_URL = 'https://api.themoviedb.org/3';

export default function MovieDetail() {
  const location = useLocation();
  const [isFetching, setFetching] = React.useState(false);
  const [reviews, setReviews] = React.useState([]);
  const {
    state: {
      movie: {
        popularity,
        vote_count,
        video,
        poster_path,
        id,
        adult,
        backdrop_path,
        original_language,
        original_title,

        title,
        vote_average,
        overview,
        release_date,
      },
    },
  } = location;

  return (
    <div>
      <div className='movieTitle'>
        <span className='title'>{title}</span>
        <span>{original_title}</span>
      </div>

      <p>평점: {vote_average}</p>
      <p>{adult ? '청소년 관람 불가' : '청소년 관람 가능'}</p>
      <p>출시 날짜: {release_date}</p>
      <p>줄거리: {overview}</p>
    </div>
  );
}
