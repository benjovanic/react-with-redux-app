import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HomePage from '../HomePage';
import AboutPage from '../AboutPage';
import Header from '../common/Header';
import PageNotFound from '../PageNotFound';
import CoursesPage from '../courses/CoursesPage';
import ManageCoursePage from '../courses/ManageCoursePage';
import AuthorsPage from '../authors/AuthorsPage';
import ManageAuthorPage from '../authors/ManageAuthorPage';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <div className="container-fluid">
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/course/:slug" element={<ManageCoursePage />} />
      <Route path="/course" element={<ManageCoursePage />} />
      <Route path="/authors" element={<AuthorsPage />} />
      <Route path="/author/:slug" element={<ManageAuthorPage />} />
      <Route path="/author" element={<ManageAuthorPage />} />
      <Route element={<PageNotFound />} />
    </Routes>
    <ToastContainer autoClose={3000} hideProgressBar />
  </div>
);

export default App;
