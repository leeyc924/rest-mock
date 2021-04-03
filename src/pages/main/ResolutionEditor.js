import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

const ResolutionEditor = () => {
  const [values, setValues] = useState({
    horizontal: '',
    vertical: '',
  });

  const changeValue = useCallback(e => {
    const { name, value } = e.target;
    setValues(values => ({
      ...values,
      [name]: value,
    }));
  }, []);

  return (
    <Container>
      <label>가로</label>
      <input
        type="text"
        name="horizontal"
        value={values.horizontal}
        onChange={e => changeValue(e)}
      />
      <label>세로</label>
      <input
        type="text"
        name="vertical"
        value={values.vertical}
        onChange={e => changeValue(e)}
      />
    </Container>
  );
};

const Container = styled.div``;

export default React.memo(ResolutionEditor);
