import React  from 'react';
import styled from 'styled-components';
import CanvasEditor from './pages/CanvasEditor';

const App = () => {
  return (
    <Wrap>
      <CanvasEditor />
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
`;

export default App;
