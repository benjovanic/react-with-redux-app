import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import AuthorList from '../AuthorList';
import { authors } from '../../../../../tools/mockData';

it('render list of authors', () => {
  const tree = renderer.create(
    <MemoryRouter>
      <AuthorList
        authors={authors}
        onDeleteClick={jest.fn()}
      />
    </MemoryRouter>,
  );

  expect(tree).toMatchSnapshot();
});

it('render empty list of authors', () => {
  const tree = renderer.create(
    <MemoryRouter>
      <AuthorList
        authors={[]}
        onDeleteClick={jest.fn()}
      />
    </MemoryRouter>,
  );

  expect(tree).toMatchSnapshot();
});
