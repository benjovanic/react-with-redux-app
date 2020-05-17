import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loadAuthors, deleteAuthor } from '../../../redux/actions/authorActions';
import AuthorList from '../AuthorList';
import Spinner from '../../common/Spinner';

const AuthorsPage = () => {
  const [redirectToAddAuthorPage, setRedirectToAddAuthorPage] = useState(false);
  const [authorsFiltered, setAuthorsFiltered] = useState(null);

  const dispatch = useDispatch();

  const { authors, loading } = useSelector((state) => ({
    authors: state.authors,
    loading: state.apiCallsInProgress > 0,
  }));

  useEffect(() => {
    dispatch(loadAuthors()).catch((error) => {
      toast.error(`Loaing authors failed: ${error}`);
    });
  }, []);

  const handleDeleteAuthor = (author) => {
    dispatch(deleteAuthor(author))
      .then(() => {
        setAuthorsFiltered(null);
        toast.success('Author deleted');
      })
      .catch((error) => {
        toast.error(`Delete failed. ${error.message}`, { autoClose: false });
      });
  };

  const filterAuthors = (event) => {
    const value = event.target.value.toUpperCase();

    if (value.length === 0) {
      setAuthorsFiltered(null);
    } else {
      setAuthorsFiltered(authors.filter((c) => c.name.toUpperCase().indexOf(value) > -1));
    }
  };

  return (
    <>
      {redirectToAddAuthorPage && <Redirect to="/author" />}
      <h2>Authors</h2>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <button
            type="button"
            style={{ marginBottom: 20 }}
            className="btn btn-primary add-course"
            onClick={() => setRedirectToAddAuthorPage(true)}
          >
            Add Author
          </button>

          <input
            id="filter-courses"
            type="text"
            name="filter"
            className="form-control"
            placeholder="Filter authors"
            onChange={filterAuthors}
          />

          <AuthorList
            onDeleteClick={handleDeleteAuthor}
            authors={authorsFiltered != null ? authorsFiltered : authors}
          />
        </>
      )}
    </>
  );
};

export default AuthorsPage;
