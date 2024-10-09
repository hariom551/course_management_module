import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login';
import Sms from './components/Sms';
import Whatsapp from './components/Whatsapp';
import { Home } from './components/Home';
import CreateCategory from './components/CreateCategory';
import CreateCourseForm from './components/CreateCourseForm';
import AdmissionForm from './components/AdmissionForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createCategory" element={<CreateCategory />} />
          <Route path="/CreateCourse" element={<CreateCourseForm />} />
          <Route path="/AddmisionForm" element={<AdmissionForm />} />
          {/* <Route path="/whatsapp" element={<Whatsapp />} /> */}
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
