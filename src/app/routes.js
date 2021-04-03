import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from '../pages/layouts/Layout';
// import { history } from '../module/store';
import Main from '../pages/main/Main';
// import { ConnectedRouter } from 'connected-react-router';

const Routes = () => {
  return (
    // <ConnectedRouter history={history}>
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" exact={true} component={Main} />
        </Switch>
      </Layout>
    </BrowserRouter>
    // </ConnectedRouter>
  );
};

export default React.memo(Routes);
