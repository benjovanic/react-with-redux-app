import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const activeStyle = { color: '#F15B2A' };

  return (
    <nav>
      <NavLink style={({ isActive }) => (isActive ? activeStyle : {})} to="/">
        Home
      </NavLink>
      {' | '}
      <NavLink  style={({ isActive }) => (isActive ? activeStyle : {})} to="/courses">
        Courses
      </NavLink>
      {' | '}
      <NavLink  style={({ isActive }) => (isActive ? activeStyle : {})} to="/authors">
        Authors
      </NavLink>
      {' | '}
      <NavLink  style={({ isActive }) => (isActive ? activeStyle : {})} to="/about">
        About
      </NavLink>
    </nav>
  );
};

export default Header;
