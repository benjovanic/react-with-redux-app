import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider as ReduxProvider } from 'react-redux';
import App from './components/App';
import './index.css';
import configureStore from './redux/configureStore';

const store = configureStore();
const container = document.getElementById('app');
const root = createRoot(container);

root.render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>
);
