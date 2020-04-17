import React from 'react';
import styled from 'styled-components';
const SummaryContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

function MovieSummary({ releaseDate, avgScore }) {
  return (
    <SummaryContainer>
      <span>{releaseDate}</span>
      <span>{avgScore}</span>
    </SummaryContainer>
  );
}
export default React.memo(MovieSummary);
