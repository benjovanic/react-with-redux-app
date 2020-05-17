import React from 'react';
import { cleanup, render } from '@testing-library/react';
import AuthorForm from '../AuthorForm';

afterEach(cleanup);

const renderAuthorForm = (args) => {
  const defaultProps = {
    authors: [],
    author: {},
    saving: false,
    errors: {},
    onSave: jest.fn(),
    onChange: jest.fn(),
  };

  const props = { ...defaultProps, ...args };
  return render(<AuthorForm
    authors={props.authors}
    author={props.author}
    saving={props.saving}
    errors={props.errors}
    onSave={props.onSave}
    onChange={props.onChange}
  />);
};

it('should render Add Author header', () => {
  const { getByText } = renderAuthorForm();
  getByText('Add Author');
});

it('should label save button as \'Save\' when not saving', () => {
  const { getByText } = renderAuthorForm();
  getByText('Save');
});

it('should label save button as \'Save\' when not saving', () => {
  const { getByText } = renderAuthorForm({ saving: true });
  getByText('Saving...');
});
