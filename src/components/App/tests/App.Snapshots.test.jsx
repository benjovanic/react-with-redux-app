import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

it('render App component', () => {
  const tree = renderer.create(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(tree).toMatchSnapshot();
});
