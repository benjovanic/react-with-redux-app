import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CourseList = ({ courses, onDeleteClick }) => (courses.length > 0 ? (
  <table className="table">
    <thead>
      <tr>
        <th>&nbsp;</th>
        <th>Title</th>
        <th>Author</th>
        <th>Category</th>
        <th>&nbsp;</th>
      </tr>
    </thead>
    <tbody>
      {courses.map((course) => (
        <tr key={course.id}>
          <td>
            <a
              className="btn btn-light"
              href={`http://pluralsight.com/courses/${course.slug}`}
            >
              Watch
            </a>
          </td>
          <td>
            <Link to={`/course/${course.slug}`}>{course.title}</Link>
          </td>
          <td>{course.authorName}</td>
          <td>{course.category}</td>
          <td>
            <button
              type="submit"
              className="btn btn-outline-danger"
              onClick={() => onDeleteClick(course)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
) : (
  <p>There are no courses to display.</p>
));

CourseList.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    authorId: PropTypes.number,
    category: PropTypes.string,
  })).isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default CourseList;
