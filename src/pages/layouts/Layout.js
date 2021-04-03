import React, { Suspense, useEffect } from 'react';
import styled from 'styled-components';
import Side from '../common/Side';

const Header = React.lazy(() => import('../common/Header'));
const Footer = React.lazy(() => import('../common/Footer'));

const loading = () => <div>로딩중ㅋ</div>;

const Layout = props => {
  return (
    <Wrap>
      <Suspense fallback={loading()}>
        <Footer />
      </Suspense>
      <Suspense fallback={loading()}>
        <Header />
      </Suspense>
      <Suspense fallback={loading()}>
        <Side />
      </Suspense>
      <Suspense fallback={loading()}>{props.children}</Suspense>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 4rem 1fr 2.5rem;
  grid-template-areas:
    'header header'
    'side main'
    'side footer';
`;

export default Layout;
