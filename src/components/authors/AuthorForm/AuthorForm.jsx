import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import TextInput from '../../common/TextInput';

const AuthorForm = ({
  author,
  onSave,
  onChange,
  saving = false,
  errors = {},
}) => {
  const [redirectToAuthorsPage, setRedirectToAuthorsPage] = useState(false);

  return (
    <>
      {redirectToAuthorsPage && <Navigate to="/authors" />}
      <form onSubmit={onSave}>
        <h2>
          {author.id ? 'Edit' : 'Add'}
          {' '}
          Author
        </h2>
        {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
        )}
        <TextInput
          name="name"
          label="Name"
          value={author.name}
          onChange={onChange}
          error={errors.name}
        />

        <button type="submit" disabled={saving} className="btn btn-primary">
          {saving ? 'Saving...' : 'Save'}
        </button>

        <button
          type="button"
          className="btn btn-secondary cancel-button"
          onClick={() => setRedirectToAuthorsPage(true)}
        >
          Cancel
        </button>
      </form>
    </>
  );
};

AuthorForm.defaultProps = {
  errors: {},
  saving: false,
};

AuthorForm.propTypes = {
  author: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  errors: PropTypes.shape({}),
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default AuthorForm;
