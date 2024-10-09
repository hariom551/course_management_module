import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdmissionForm = () => {
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [mode, setMode] = useState('');
  const [fees, setFees] = useState(0);
  const [registrationNo, setRegistrationNo] = useState('');
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    DOB: '',
    Gender: '',
    category: '',
    minority: '',
    minoritySpecify: '',
    abled: '',
    Nationality: '',
    FName: '',
    MName: '',
    presentAddress: '',
    permanentAddress: '',
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/course-categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      if (selectedCategory) {
        try {
          const response = await axios.get(`/api/courses?category=${selectedCategory}`);
          setCourses(response.data);
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      }
    };

    fetchCourses();
  }, [selectedCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', {
      selectedCategory,
      selectedCourse,
      mode,
      fees,
      registrationNo,
      userDetails,
    });
  };

  return (
    <div className="p-6 max-w mx-auto bg-white shadow-md rounded-lg">
      {/* <h1 className="text-3xl font-semibold text-gray-800 mb-6">Admission Form</h1> */}
      <h1 class="text-center text-3xl font-bold bg-gray-800 text-white p-3 mb-6 rounded-t-lg">
      Admission Form
          </h1>
      <form onSubmit={handleSubmit}>
        {/* Course Details */}
        <fieldset className="mb-6">
          <legend className="text-2xl font-medium text-gray-900 mb-4">Course Details</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-gray-600 mb-2">Course Category</label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                required
                className="border p-2 w-full rounded"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="course" className="block text-gray-600 mb-2">Course</label>
              <select
                id="course"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                required
                className="border p-2 w-full rounded"
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id} onClick={() => setFees(course.fees)}>
                    {course.name} - ₹{course.fees}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="mode" className="block text-gray-600 mb-2">Mode of Study</label>
              <select
                id="mode"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                required
                className="border p-2 w-full rounded"
              >
                <option value="">Select mode</option>
                <option value="offline">Offline</option>
                <option value="online">Online</option>
                <option value="distance">Distance</option>
              </select>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-600 mt-2">Fees</h2>
              <p className="text-gray-800">₹{fees}</p>
            </div>
          </div>
        </fieldset>

        <fieldset className="mb-6">
          <legend className="text-xl font-medium text-gray-700 mb-4">User Details</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-gray-600 mb-2">Name</label>
              <input
                type="text"
                id="name"
                value={userDetails.name}
                onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                required
                className="border p-2 w-full rounded"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-600 mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={userDetails.email}
                onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                required
                className="border p-2 w-full rounded"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-600 mb-2">Phone</label>
              <input
                type="tel"
                id="phone"
                value={userDetails.phone}
                onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
                required
                className="border p-2 w-full rounded"
              />
            </div>

            <div>
              <label htmlFor="DOB" className="block text-gray-600 mb-2">Date of Birth</label>
              <input
                type="date"
                id="DOB"
                value={userDetails.DOB}
                onChange={(e) => setUserDetails({ ...userDetails, DOB: e.target.value })}
                required
                className="border p-2 w-full rounded"
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-600 mb-2">Gender</label>
              <div className="flex items-center">
                <label className="mr-4">
                  <input
                    type="radio"
                    name="sex"
                    value="male"
                    onChange={(e) => setUserDetails({ ...userDetails, Gender: e.target.value })}
                    required
                    className="mr-2"
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="sex"
                    value="female"
                    onChange={(e) => setUserDetails({ ...userDetails, Gender: e.target.value })}
                    required
                    className="mr-2"
                  />
                  Female
                </label>
              </div>
            </div>

            <div>
              <label className="block text-gray-600 mb-2">Category</label>
              <div className="flex items-center space-x-4">
                {['General', 'OBC', 'SC', 'ST'].map((cat) => (
                  <label key={cat} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      onChange={(e) => setUserDetails({ ...userDetails, category: e.target.value })}
                      required
                      className="mr-2"
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-600 mb-2">Minority</label>
              <div className="flex items-center">
                <label className="mr-4">
                  <input
                    type="radio"
                    name="minority"
                    value="yes"
                    onChange={(e) => setUserDetails({ ...userDetails, minority: e.target.value })}
                    required
                    className="mr-2"
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="minority"
                    value="no"
                    onChange={(e) => setUserDetails({ ...userDetails, minority: e.target.value })}
                    required
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>
          </div>
        </fieldset>


        <fieldset className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="FName" className="block text-gray-600 mb-2">Father's Name</label>
              <input
                type="text"
                id="FName"
                value={userDetails.FName}
                onChange={(e) => setUserDetails({ ...userDetails, FName: e.target.value })}
                required
                className="border p-2 w-full rounded"
              />
            </div>

            <div>
              <label htmlFor="MName" className="block text-gray-600 mb-2">Mother's Name</label>
              <input
                type="text"
                id="MName"
                value={userDetails.MName}
                onChange={(e) => setUserDetails({ ...userDetails, MName: e.target.value })}
                required
                className="border p-2 w-full rounded"
              />
            </div>
          </div>
        </fieldset>


        <fieldset className="mb-6">
          <legend className="text-2xl font-medium text-gray-900 mb-4">Contact Details</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="presentAddress" className="block text-gray-600 mb-2">Present Address</label>
              <textarea
                id="presentAddress"
                value={userDetails.presentAddress}
                onChange={(e) => setUserDetails({ ...userDetails, presentAddress: e.target.value })}
                required
                className="border p-2 w-full rounded"
                rows="3"
              />
            </div>

            <div>
              <label htmlFor="permanentAddress" className="block text-gray-600 mb-2">Permanent Address</label>
              <textarea
                id="permanentAddress"
                value={userDetails.permanentAddress}
                onChange={(e) => setUserDetails({ ...userDetails, permanentAddress: e.target.value })}
                required
                className="border p-2 w-full rounded"
                rows="3"
              />
            </div>
          </div>
        </fieldset>

        <div class="max-w mx-auto p-4 bg-beige-100 rounded-lg shadow-md">
          <h2 class="text-center text-lg font-bold bg-gray-800 text-white p-2 rounded-t-lg">
            EDUCATIONAL DETAILS
          </h2>
          <table class="min-w-full bg-white">
            <thead>
              <tr class="bg-gray-800 text-white"> 
                <th class="py-2 px-1 border">S.No.</th>
                <th class="py-2 px-4 border">Examination Passed</th>
                <th class="py-2 px-6 border">School/College</th>
                <th class="py-2 px-4 border">Board/Univ.</th>
                <th class="py-2 px-4 border">Year of Passing</th>
                <th class="py-2 px-4 border">% of Marks</th>
                <th class="py-2 px-4 border">Class/Division</th>
                <th class="py-2 px-4 border">Subjects</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="py-2 px-4 border">
                  <input type="text" class="w-full p-1 border rounded" placeholder="1" />
                </td>
                <td class="py-2 px-4 border">
                  <input type="text" class="w-full p-1 border rounded" placeholder="Enter exam" />
                </td>
                <td class="py-2 px-4 border">
                  <input type="text" class="w-full p-1 border rounded" placeholder="Enter school/college" />
                </td>
                <td class="py-2 px-4 border">
                  <input type="text" class="w-full p-1 border rounded" placeholder="Enter board/university" />
                </td>
                <td class="py-2 px-4 border">
                  <input type="text" class="w-full p-1 border rounded" placeholder="Enter year of passing" />
                </td>
                <td class="py-2 px-4 border">
                  <input type="text" class="w-full p-1 border rounded" placeholder="Enter % of marks" />
                </td>
                <td class="py-2 px-4 border">
                  <input type="text" class="w-full p-1 border rounded" placeholder="Enter class/division" />
                </td>
                <td class="py-2 px-4 border">
                  <input type="text" class="w-full p-1 border rounded" placeholder="Enter subjects" />
                </td>
              </tr>
           
            </tbody>
            <tbody>
              <tr>
                <td class="py-2 px-4 border">
                  <input type="text" class="w-full p-1 border rounded" placeholder="2" />
                </td>
                <td class="py-2 px-4 border">
                  <input type="text" class="w-full p-1 border rounded" placeholder="Enter exam" />
                </td>
                <td class="py-2 px-4 border">
                  <input type="text" class="w-full p-1 border rounded" placeholder="Enter school/college" />
                </td>
                <td class="py-2 px-4 border">
                  <input type="text" class="w-full p-1 border rounded" placeholder="Enter board/university" />
                </td>
                <td class="py-2 px-4 border">
                  <input type="text" class="w-full p-1 border rounded" placeholder="Enter year of passing" />
                </td>
                <td class="py-2 px-4 border">
                  <input type="text" class="w-full p-1 border rounded" placeholder="Enter % of marks" />
                </td>
                <td class="py-2 px-4 border">
                  <input type="text" class="w-full p-1 border rounded" placeholder="Enter class/division" />
                </td>
                <td class="py-2 px-4 border">
                  <input type="text" class="w-full p-1 border rounded" placeholder="Enter subjects" />
                </td>
              </tr>
           
            </tbody>
          </table>
        </div>



        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          Submit Form
        </button>
      </form>
    </div>
  );
};

export default AdmissionForm;
