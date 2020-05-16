import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { loadCourses, saveCourse } from '../../../redux/actions/courseActions';
import { loadAuthors } from '../../../redux/actions/authorActions';
import CourseForm from '../CourseForm/CourseForm';
import { newCourse } from '../../../../tools/mockData';
import Spinner from '../../common/Spinner';

const getCourseBySlug = (courses, slug) => courses.find((course) => course.slug === slug) || null;

export const ManageCoursePage = ({ history, match }) => {
  const dispatch = useDispatch();

  const courses = useSelector((state) => state.courses);
  const authors = useSelector((state) => state.authors);

  const [course, setCourse] = useState();
  const [errors, setErrors] = useState();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!courses) {
      dispatch(loadCourses()).catch((error) => {
        toast.error(`Loading courses failed: ${error}`);
      });
    }

    if (authors.length === 0) {
      dispatch(loadAuthors()).catch((error) => {
        toast.error(`Loading authors failed: ${error}`);
      });
    }
  }, [course]);

  useEffect(() => {
    const { slug } = match.params;
    const getCourse = slug && courses && courses.length > 0
      ? getCourseBySlug(courses, slug)
      : newCourse;
    setCourse({ ...getCourse });
  }, [courses]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === 'authorId' ? parseInt(value, 10) : value,
    }));
  };

  const formIsValid = () => {
    const { title, authorId, category } = course;
    const errs = {};

    if (!title) errs.title = 'Title is required.';
    if (!authorId) errs.author = 'Author is required';
    if (!category) errs.category = 'Category is required';

    setErrors(errs);
    // Form is valid if the errors object still has no properties
    return Object.keys(errs).length === 0;
  };

  const handleSave = (event) => {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    dispatch(saveCourse(course))
      .then(() => {
        toast.success('Course saved.');
        history.push('/courses');
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  };

  return !course || authors.length === 0 || !courses ? (
    <Spinner />
  ) : (
    <>
      <CourseForm
        course={course}
        errors={errors}
        authors={authors}
        onChange={handleChange}
        onSave={handleSave}
        saving={saving}
      />
    </>
  );
};

ManageCoursePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string,
    }),
  }).isRequired,
};

export default ManageCoursePage;
