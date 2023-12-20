import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loadCourses, saveCourse } from '../../../redux/actions/courseActions';
import { loadAuthors } from '../../../redux/actions/authorActions';
import CourseForm from '../CourseForm';
import { newCourse } from '../../../../tools/mockData';
import Spinner from '../../common/Spinner';

const getCourseBySlug = (courses, slug) => courses.find((course) => course.slug === slug) || null;

const ManageCoursePage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const {
    courses, coursesLoaded, authors, authorsLoaded,
  } = useSelector((state) => state);

  const [course, setCourse] = useState();
  const [errors, setErrors] = useState();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(loadCourses()).catch((error) => {
      toast.error(`Loading courses failed: ${error}`);
    });

    dispatch(loadAuthors()).catch((error) => {
      toast.error(`Loading authors failed: ${error}`);
    });
  }, [coursesLoaded, authorsLoaded]);

  useEffect(() => {
    const getCourse = slug && courses && courses.length > 0
      ? getCourseBySlug(courses, slug)
      : newCourse;
    setCourse({ ...getCourse });
  }, [courses, slug]);

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
        navigate('/courses');
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  };

  if (authorsLoaded && authors.length === 0) {
    return (<p>Create an author first</p>);
  }

  return !coursesLoaded || !course ? (
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

export default ManageCoursePage;
