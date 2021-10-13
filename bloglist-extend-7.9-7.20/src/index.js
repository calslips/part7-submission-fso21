import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import store from './store';
import Container from '@mui/material/Container';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Container>
        <App />
      </Container>
    </Router>
  </Provider>,
  document.getElementById('root')
);
