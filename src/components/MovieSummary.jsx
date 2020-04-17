import React from 'react';
import styled from 'styled-components';
const SummaryContainer = styled.div`
  display: flex;
  justify-content: center;
  color: gray;
  padding: 0px 4px;
`;

function MovieSummary({ releaseDate, avgScore }) {
  return (
    <SummaryContainer>
      <span>{releaseDate} &emsp;</span>
      <span>{avgScore}</span>
    </SummaryContainer>
  );
}
export default React.memo(MovieSummary);
