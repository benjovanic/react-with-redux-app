import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AuthorList = ({ authors, onDeleteClick }) => (authors.length > 0 ? (
  <table className="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>&nbsp;</th>
      </tr>
    </thead>
    <tbody>
      {authors.map((author) => (
        <tr key={author.id}>
          <td>
            <Link to={`/author/${author.slug}`}>{author.name}</Link>
          </td>
          <td>
            <button
              type="submit"
              className="btn btn-outline-danger"
              onClick={() => onDeleteClick(author)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
) : (
  <p>There are no authors to display.</p>
));

AuthorList.propTypes = {
  authors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default AuthorList;
