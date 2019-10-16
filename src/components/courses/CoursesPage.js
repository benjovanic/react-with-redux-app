import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

export const CoursesPage = ({ courses, authors, actions, loading }) => {
  const [redirectToAddCoursePage, setRedirectToAddCoursePage] = useState(false);
  const [coursesFiltered, setCoursesFiltered] = useState(null);

  useEffect(() => {
    if (courses.length === 0) {
      actions.loadCourses().catch(error => {
        toast.error("Loading courses failed: " + error);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch(error => {
        toast.error("Loading authors failed: " + error);
      });
    }
  });

  const handleDeleteCourse = course => {
    actions
      .deleteCourse(course)
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
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
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
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
