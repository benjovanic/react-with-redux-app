import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import TextInput from '../../common/TextInput';
import SelectInput from '../../common/SelectInput';

const CourseForm = ({
  course,
  authors,
  onSave,
  onChange,
  saving = false,
  errors = {},
}) => {
  const [redirectToCoursesPage, setRedirectToCoursesPage] = useState(false);

  return (
    <>
      {redirectToCoursesPage && <Navigate to="/courses" />}
      <form onSubmit={onSave}>
        <h2>
          {course.id ? 'Edit' : 'Add'}
          {' '}
          Course
        </h2>
        {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
        )}
        <TextInput
          name="title"
          label="Title"
          value={course.title}
          onChange={onChange}
          error={errors.title}
        />

        <SelectInput
          name="authorId"
          label="Author"
          value={course.authorId || ''}
          defaultOption="Select Author"
          options={authors.map((author) => ({
            value: author.id,
            text: author.name,
          }))}
          onChange={onChange}
          error={errors.author}
        />

        <TextInput
          name="category"
          label="Category"
          value={course.category}
          onChange={onChange}
          error={errors.category}
        />

        <button type="submit" disabled={saving} className="btn btn-primary">
          {saving ? 'Saving...' : 'Save'}
        </button>

        <button
          type="button"
          className="btn btn-secondary cancel-button"
          onClick={() => setRedirectToCoursesPage(true)}
        >
          Cancel
        </button>
      </form>
    </>
  );
};

CourseForm.defaultProps = {
  errors: {},
  saving: false,
};

CourseForm.propTypes = {
  authors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  course: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    authorId: PropTypes.number,
    category: PropTypes.string,
  }).isRequired,
  errors: PropTypes.shape({}),
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default CourseForm;
