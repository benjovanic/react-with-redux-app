import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Header from '../Header';

it('render Header component', () => {
  const tree = renderer.create(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  );
  expect(tree).toMatchSnapshot();
});
