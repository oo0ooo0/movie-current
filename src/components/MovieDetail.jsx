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
  // console.log(movie);

  useEffect(() => {
    async function callReviews() {
      if (!isFetching) {
        setFetching(true);
        try {
          const { data } = await axios.get(
            `/movie/${id}/reviews?api_key=40bf80f6870c3b230323ccf339f432f4&page=1`,
            {
              baseURL: BASE_URL,
            }
          );
          setReviews(data.results);
        } finally {
          setFetching(false);
        }
      }
    }
    callReviews();
  }, []);

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

      <ul>
        {reviews.map((review) => {
          return (
            <React.Fragment key={review.id}>
              <li>작성자: {review.author}</li>
              <li>내용: {review.content}</li>
              <li>리뷰 페이지 가기:{review.url}</li>
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
}
