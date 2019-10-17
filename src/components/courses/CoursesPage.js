import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, deleteCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

export const CoursesPage = ({
  courses,
  loadCourses,
  loadAuthors,
  deleteCourse,
  loading
}) => {
  const [redirectToAddCoursePage, setRedirectToAddCoursePage] = useState(false);
  const [coursesFiltered, setCoursesFiltered] = useState(null);

  useEffect(() => {
    loadCourses().catch(error => {
      toast.error("Loading courses failed: " + error);
    });

    loadAuthors().catch(error => {
      toast.error("Loading authors failed: " + error);
    });
  }, []);

  const handleDeleteCourse = course => {
    deleteCourse(course)
      .then(() => {
        toast.success("Course deleted");
      })
      .catch(error => {
        toast.error("Delete failed. " + error.message, { autoClose: false });
      });
  };

  const filterCourses = event => {
    const value = event.target.value.toUpperCase();

    if (value.length === 0) {
      setCoursesFiltered(null);
    } else {
      setCoursesFiltered(
        courses.filter(
          c =>
            c.title.toUpperCase().indexOf(value) > -1 ||
            c.authorName.toUpperCase().indexOf(value) > -1 ||
            c.category.toUpperCase().indexOf(value) > -1
        )
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

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  deleteCourse: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(a => a.id === course.authorId).name
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  };
};

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  deleteCourse
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
