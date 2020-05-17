import React from 'react';
import { cleanup, render } from '@testing-library/react';
import CourseForm from '../CourseForm';

afterEach(cleanup);

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
  return render(<CourseForm
    authors={props.authors}
    course={props.course}
    saving={props.saving}
    errors={props.errors}
    onSave={props.onSave}
    onChange={props.onChange}
  />);
};

it('should render Add Course header', () => {
  const { getByText } = renderCourseForm();
  getByText('Add Course');
});

it('should label save button as \'Save\' when not saving', () => {
  const { getByText } = renderCourseForm();
  getByText('Save');
});

it('should label save button as \'Save\' when not saving', () => {
  const { getByText } = renderCourseForm({ saving: true });
  getByText('Saving...');
});
