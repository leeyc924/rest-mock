import React from 'react';
import styled from 'styled-components';
import ResolutionEditor from './ResolutionEditor';
import Workspace from './Wrokspace';

const CanvasEditor = () => {
  return (
    <Container>
      <ResolutionEditor />
      <Workspace />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

export default CanvasEditor;