import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import app from './app/app';
// import createStore from './module/store';

// const store = createStore();


const render = () => {
  const App = app;

  ReactDOM.render(
    // <Provider store={store}>
      <App />,
    // </Provider>,
    document.getElementById('root'),
  );
};

render();
