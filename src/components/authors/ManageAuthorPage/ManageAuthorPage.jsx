import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loadAuthors, saveAuthor } from '../../../redux/actions/authorActions';
import AuthorForm from '../AuthorForm';
import { newAuthor } from '../../../../tools/mockData';
import Spinner from '../../common/Spinner';

const getAuthorBySlug = (authors, slug) => authors.find((author) => author.slug === slug) || null;

const ManageAuthorPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { authors, authorsLoaded } = useSelector((state) => state);

  const [author, setAuthor] = useState();
  const [errors, setErrors] = useState();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(loadAuthors()).catch((error) => {
      toast.error(`Loading authors failed: ${error}`);
    });
  }, [authorsLoaded]);

  useEffect(() => {
    const getAuthor = slug && authors && authors.length > 0
      ? getAuthorBySlug(authors, slug)
      : newAuthor;
    setAuthor({ ...getAuthor });
  }, [authors, slug]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAuthor((prevAuthor) => ({
      ...prevAuthor,
      [name]: name === 'authorId' ? parseInt(value, 10) : value,
    }));
  };

  const formIsValid = () => {
    const { name } = author;
    const errs = {};

    if (!name) errs.name = 'Name is required.';

    setErrors(errs);
    // Form is valid if the errors object still has no properties
    return Object.keys(errs).length === 0;
  };

  const handleSave = (event) => {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    dispatch(saveAuthor(author))
      .then(() => {
        toast.success('Author saved.');
        navigate('/authors');
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  };

  return !author || !authors ? (
    <Spinner />
  ) : (
    <>
      <AuthorForm
        author={author}
        errors={errors}
        onChange={handleChange}
        onSave={handleSave}
        saving={saving}
      />
    </>
  );
};

export default ManageAuthorPage;
