import React from 'react';
import { shallow } from 'enzyme';
import AuthorForm from '../AuthorForm';

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
  return shallow(<AuthorForm
    authors={props.authors}
    author={props.author}
    saving={props.saving}
    errors={props.errors}
    onSave={props.onSave}
    onChange={props.onChange}
  />);
};

it('renders form and header', () => {
  const wrapper = renderAuthorForm();
  expect(wrapper.find('form').length).toBe(1);
  expect(wrapper.find('h2').text()).toEqual('Add Author');
});

it('labels save buttons as "Save" when not saving', () => {
  const wrapper = renderAuthorForm();
  expect(wrapper.find('button.btn-primary').text()).toBe('Save');
});

it('labels save button as "Saving..." when saving', () => {
  const wrapper = renderAuthorForm({ saving: true });
  expect(wrapper.find('button.btn-primary').text()).toBe('Saving...');
});
