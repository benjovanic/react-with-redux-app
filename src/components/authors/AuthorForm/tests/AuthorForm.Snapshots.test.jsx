import React from 'react';
import renderer from 'react-test-renderer';
import AuthorForm from '../AuthorForm';
import { authors } from '../../../../../tools/mockData';

it('set submit button label to \'Saving...\' when saving is true', () => {
  const tree = renderer.create(
    <AuthorForm
      author={authors[0]}
      authors={authors}
      onSave={jest.fn()}
      onChange={jest.fn()}
      saving
    />,
  );

  expect(tree).toMatchSnapshot();
});

it('set submit button label to \'Save\' when saving is false', () => {
  const tree = renderer.create(
    <AuthorForm
      author={authors[0]}
      authors={authors}
      onSave={jest.fn()}
      onChange={jest.fn()}
      saving={false}
    />,
  );

  expect(tree).toMatchSnapshot();
});
