import React, { useEffect } from 'react';
import styled from 'styled-components';

const StyledImage = styled.img`
  background: ${(props) => (props.isLoaded ? '#D1D3D5' : '#D1D3D5')};
  width: 100%;
  max-height: 572px;
  min-height: 100%;
  ${(props) => (props.isLoaded ? 'padding-top: 66.7%' : 'padding-top: 0;')};
`;
const IMAGE_CDN_URL = 'https://image.tmdb.org/t/p/w440_and_h660_face/';

function PosterLoader(props) {
  const { url } = props;

  const [isLoaded, setLoaded] = React.useState(false);
  const ref = React.useRef(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.src = `${IMAGE_CDN_URL}${url}`;
      setLoaded(false);
      ref.current.onLoad = () => {
        setLoaded(true);
      };
    }
  }, [url, ref]);

  return <StyledImage alt={'포스터'} ref={ref} isLoaded={isLoaded} />;
}

export default PosterLoader;
