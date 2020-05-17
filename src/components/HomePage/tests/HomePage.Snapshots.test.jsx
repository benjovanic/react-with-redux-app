import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../HomePage';

it('render HomePage component', () => {
  const tree = renderer.create(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );
  expect(tree).toMatchSnapshot();
});
