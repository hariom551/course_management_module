// src/StudentForm.jsx

import { useState } from 'react';

const Student = () => {
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message

    try {
      const response = await fetch('http://localhost:3000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, rollNo }), // Convert data to JSON
      });

      if (!response.ok) {
        // Handle HTTP error responses
        const errorData = await response.json();
        throw new Error(errorData.error || 'An error occurred');
      }

      const data = await response.json();
      console.log('Response:', data);
      
      // Optionally reset the form or show success message
      setName('');
      setRollNo('');
    } catch (error) {
      // Handle errors here
      setErrorMessage(error.message);
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-lg font-bold mb-4">Student Form</h2>
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border rounded px-3 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="rollNo" className="block mb-2">Roll No</label>
        <input
          type="text"
          id="rollNo"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          required
          className="border rounded px-3 py-2 w-full"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
};

export default Student;
