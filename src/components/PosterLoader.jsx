import React, { useEffect } from 'react';
import styled from 'styled-components';

const StyledImage = styled.img`
  background: ${(props) => (props.isLoaded ? 'none' : '#D1D3D5')};
  width: 100%;

  max-height: 572px;
  min-height: 200px;
  ${(props) => (props.isLoaded ? 'padding-top: 66.7%' : 'padding-top: 0;')};
`;

function PosterLoader(props) {
  const { url } = props;

  const [isLoaded, setLoaded] = React.useState(false);
  const ref = React.useRef(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.src = url;
      setLoaded(false);
      ref.current.onLoad = () => {
        setLoaded(true);
      };
    }
  }, [url, ref]);

  return (
    <>
      <StyledImage src={url} alt={'포스터'} ref={ref} isLoaded={isLoaded} />
      {/* {
      url ?       <StyledImage src={url} alt={'포스터'} ref={ref} isLoaded={isLoaded} />
 : <p>이미지가 존재하지 안ㅎ아</p>;
    } */}
    </>
  );
}

export default PosterLoader;
