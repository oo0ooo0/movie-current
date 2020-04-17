import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import PosterLoader from './PosterLoader';
import styled from 'styled-components';

export const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_CDN_URL = 'https://image.tmdb.org/t/p/w440_and_h660_face/';

const StyledMovieDetail = styled.div`
  .movie-title {
  }
  .image-wrap {
    display: flex;
    justify-content: center;
    margin: 20px 0px;

    img {
      width: 60%;
      max-width: 381.82px;
    }
  }
  .info-wrap > p {
    text-align: center;
    margin-bottom: 20px;
  }
  .review {
    .review-title {
      display: flex;
      justify-content: space-between;
    }
    .review-content {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      line-height: 1.2;
      height: 3.6em;
      text-align: left;
      word-wrap: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
`;
export default function MovieDetail() {
  const location = useLocation();
  const [isFetching, setFetching] = React.useState(false);
  const [reviews, setReviews] = React.useState([]);
  const {
    state: {
      movie: {
        poster_path,
        id,
        adult,
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
    <StyledMovieDetail>
      <div className='movie-title'>
        <h3 className='title'>{title}</h3>
        <small>( original title : {original_title} )</small>
      </div>
      <div className='image-wrap'>
        <PosterLoader url={`${IMAGE_CDN_URL}/${poster_path}`} />
      </div>

      <div className='info-wrap'>
        <p>
          <b>vote_average:</b>
          <br />
          {vote_average}
        </p>
        <p>{adult ? 'NC-17' : ''}</p>
        <p>
          <b>Release date:</b>
          <br />
          {release_date}
        </p>
        <p>
          <b>overview:</b>
          <br />
          {overview}
        </p>
      </div>

      <div className='review'>
        {reviews.map((review) => {
          return (
            <React.Fragment key={review.id}>
              <div className='review-title'>
                <span className='review-author'>author: {review.author}</span>
                <span className='review-url'>
                  <a href={review.url}>Visit review page</a>
                </span>
              </div>
              <li className='review-content'>내용: {review.content}</li>
            </React.Fragment>
          );
        })}
      </div>
    </StyledMovieDetail>
  );
}
