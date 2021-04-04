import React from 'react';
import styled from 'styled-components';

const Frame = () => {
  return (
    <Container>
      <div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 9.375rem;
  background-color: skyblue;
  border-radius: 0.375rem;
  cursor: pointer;

  & + & {
    margin-top: 1.25rem;
  }

  & > div {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    background-color: #333333;
  }
`;

export default Frame;
