import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../pages/layouts/Layout';
import { history } from '../module/store';
import Main from '../pages/main/Main';
import { ConnectedRouter } from 'connected-react-router';

const Routes = () => {
  return (
    <ConnectedRouter history={history}>
      <Layout>
        <Switch>
          <Route path="/" exact={true} component={Main} />
        </Switch>
      </Layout>
    </ConnectedRouter>
  );
};

export default React.memo(Routes);
