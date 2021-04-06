import React from 'react';
import styled from 'styled-components';

const Header = () => {
  return (
    <Container>
      Editor
    </Container>
  );
}

const Container = styled.div`
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  border-bottom: 1px solid #dddddd;
`;

export default Header;