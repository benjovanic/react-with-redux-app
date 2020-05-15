import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

const getCourseBySlug = (courses, slug) => {
  return courses.find((course) => course.slug === slug) || null;
};

export const ManageCoursePage = ({ history, match }) => {
  const dispatch = useDispatch();

  const courses = useSelector((state) => state.courses);
  const authors = useSelector((state) => state.authors);

  const [course, setCourse] = useState();
  const [errors, setErrors] = useState();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      dispatch(loadCourses()).catch((error) => {
        toast.error(`Loading courses failed: ${error}`);
      });
    } else {
      const slug = match.params.slug;
      setCourse(slug ? getCourseBySlug(courses, slug) : newCourse);
    }

    if (authors.length === 0) {
      dispatch(loadAuthors()).catch((error) => {
        toast.error(`Loading authors failed: ${error}`);
      });
    }
  }, [courses]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    }));
  };

  const formIsValid = () => {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  };

  const handleSave = (event) => {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    dispatch(saveCourse(course))
      .then(() => {
        toast.success("Course saved.");
        history.push("/courses");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  };

  return !course || authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
};

ManageCoursePage.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default ManageCoursePage;
