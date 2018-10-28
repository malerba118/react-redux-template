import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import App from './App'
import initStore from 'store/initStore'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <HashRouter>
      <Provider store={initStore()}>
        <App />
      </Provider>
    </HashRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
