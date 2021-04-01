import React from 'react';
import styled from 'styled-components';

const ResolutionEditor = () => {
  return (
    <Container>
      <label>
        가로
      </label>
      <input type="number" />
      <label>
        세로
      </label>
      <input type="number" />
    </Container>
  )
}

const Container = styled.div`
`;

export default ResolutionEditor;