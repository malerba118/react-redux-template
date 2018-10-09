import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import initStore from 'store/initStore'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={initStore()}>
      <App />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
