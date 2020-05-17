import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loadCourses, deleteCourse } from '../../../redux/actions/courseActions';
import { loadAuthors } from '../../../redux/actions/authorActions';
import CourseList from '../CourseList';
import Spinner from '../../common/Spinner';

const mapAuthorsToCourses = (courses, authors) => (
  courses.map((course) => ({
    ...course,
    authorName: authors.find((a) => a.id === course.authorId)?.name,
  }))
);

const CoursesPage = () => {
  const [redirectToAddCoursePage, setRedirectToAddCoursePage] = useState(false);
  const [coursesFiltered, setCoursesFiltered] = useState(null);

  const dispatch = useDispatch();

  const { courses, loading } = useSelector((state) => ({
    courses: state.authors.length === 0 ? [] : mapAuthorsToCourses(state.courses, state.authors),
    loading: state.apiCallsInProgress > 0,
  }));

  useEffect(() => {
    dispatch(loadCourses()).catch((error) => {
      toast.error(`Loading courses failed: ${error}`);
    });

    dispatch(loadAuthors()).catch((error) => {
      toast.error(`Loading authors failed: ${error}`);
    });
  }, []);

  const handleDeleteCourse = (course) => {
    dispatch(deleteCourse(course))
      .then(() => {
        setCoursesFiltered(null);
        toast.success('Course deleted');
      })
      .catch((error) => {
        toast.error(`Delete failed. ${error.message}`, { autoClose: false });
      });
  };

  const filterCourses = (event) => {
    const value = event.target.value.toUpperCase();

    if (value.length === 0) {
      setCoursesFiltered(null);
    } else {
      setCoursesFiltered(
        courses.filter(
          (c) => c.title.toUpperCase().indexOf(value) > -1
            || c.authorName.toUpperCase().indexOf(value) > -1
            || c.category.toUpperCase().indexOf(value) > -1,
        ),
      );
    }
  };

  return (
    <>
      {redirectToAddCoursePage && <Redirect to="/course" />}
      <h2>Courses</h2>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <button
            type="button"
            style={{ marginBottom: 20 }}
            className="btn btn-primary add-course"
            onClick={() => setRedirectToAddCoursePage(true)}
          >
            Add Course
          </button>

          <input
            id="filter-courses"
            type="text"
            name="filter"
            className="form-control"
            placeholder="Filter courses"
            onChange={filterCourses}
          />

          <CourseList
            onDeleteClick={handleDeleteCourse}
            courses={coursesFiltered != null ? coursesFiltered : courses}
          />
        </>
      )}
    </>
  );
};

export default CoursesPage;
