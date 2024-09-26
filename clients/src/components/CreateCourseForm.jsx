import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateCourseForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_id: '',
    active: true,
    eligibility: '',
    training_mode: 'online',
    course_fee: 0.00,
    duration: '',
    brochure: null,
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0], // Handle file upload
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Form Data: ', formData);
    // Further logic for form submission with file data
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Course</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1" htmlFor="category_id">Category</label>
          <select
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium mb-1" htmlFor="title">Course Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>


        <div className="mb-2">
          <label className="block text-sm font-medium mb-1" htmlFor="eligibility">Eligibility</label>
          <input
            type='text'
            id="eligibility"
            name="eligibility"
            value={formData.eligibility}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>


        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Training Mode</label>
          <select
            name="training_mode"
            value={formData.training_mode}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
          >
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="course_fee">Course Fee</label>
          <input
            type="number"
            id="course_fee"
            name="course_fee"
            value={formData.course_fee}
            onChange={handleChange}
            step="0.01"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="duration">Course Duration</label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="e.g., 3 months"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="active">Active</label>
          <input
            type="checkbox"
            id="active"
            name="active"
            checked={formData.active}
            onChange={handleChange}
            className="h-5 w-5"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="brochure">Upload Course Brochure</label>
          <input
            type="file"
            id="brochure"
            name="brochure"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Create Course
        </button>
      </div>
    </form>
  );
};

export default CreateCourseForm;
