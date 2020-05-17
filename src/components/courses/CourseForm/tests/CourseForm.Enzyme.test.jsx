import React from 'react';
import { shallow } from 'enzyme';
import CourseForm from '../CourseForm';

const renderCourseForm = (args) => {
  const defaultProps = {
    authors: [],
    course: {},
    saving: false,
    errors: {},
    onSave: jest.fn(),
    onChange: jest.fn(),
  };

  const props = { ...defaultProps, ...args };
  return shallow(<CourseForm
    authors={props.authors}
    course={props.course}
    saving={props.saving}
    errors={props.errors}
    onSave={props.onSave}
    onChange={props.onChange}
  />);
};

it('renders form and header', () => {
  const wrapper = renderCourseForm();
  expect(wrapper.find('form').length).toBe(1);
  expect(wrapper.find('h2').text()).toEqual('Add Course');
});

it('labels save buttons as "Save" when not saving', () => {
  const wrapper = renderCourseForm();
  expect(wrapper.find('button.btn-primary').text()).toBe('Save');
});

it('labels save button as "Saving..." when saving', () => {
  const wrapper = renderCourseForm({ saving: true });
  expect(wrapper.find('button.btn-primary').text()).toBe('Saving...');
});
