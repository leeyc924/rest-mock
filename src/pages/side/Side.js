import React from 'react';
import styled from 'styled-components';
import { FiPlusSquare as PlusIcon } from 'react-icons/fi';
import { FiMinusSquare as MinusIcon } from 'react-icons/fi';
import Frame from './Frame';

const Side = () => {
  return (
    <Container>
      <FrameBox>
        <Frame />
        <Frame />
        <Frame />
        <Frame />
        <Frame />
        <Frame />
        <Frame />
        <Frame />
        <Frame />
        <Frame />
        <Frame />
        <Frame />
        <Frame />
        <Frame />
        <Frame />
        <Frame />
        <Frame /> 
        <Frame />
      </FrameBox>
      <AddRemoveBox>
        <div>
          <PlusIcon color="blue" size={30} onClick={() => console.log('plus')}/>
        </div>
        <div>
          <MinusIcon color="red" size={30} onClick={() => console.log('minus')}/>
        </div>
      </AddRemoveBox>
    </Container>
  );
};

const Container = styled.div`
  grid-area: side;
  background-color: darkgrey;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: 0.625rem;
`;

const FrameBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 90%;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 0.625rem 0 0.625rem 0.625rem;

  &::-webkit-scrollbar {
    width: 0.9375rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #cccccc;
    border-radius: 0.375rem;
  }
`;

const AddRemoveBox = styled.div`
  height: 10%;
  border-top: 1px solid #dddddd;
  display: flex;

  & > div {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    & > svg {
      cursor: pointer;
    }

    &:not(:last-child) {
      border-right: 1px solid #dddddd;
    }
  }
`;

export default Side;
