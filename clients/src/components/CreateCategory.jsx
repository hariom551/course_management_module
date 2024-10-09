import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newCategory = { category_name: categoryName, description };

        try {
            const response = await axios.post('/api/course-categories', newCategory);

            setCategories([...categories, response.data]);

            setCategoryName('');
            setDescription('');
            setShowForm(false); // Hide the form after submission

            alert('Category created successfully!');
        } catch (error) {
            alert('Error creating category. Please try again.');
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-semibold text-gray-700">Course Categories</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-indigo-600 text-white px-2 rounded-md hover:bg-indigo-700 transition duration-200 flex items-center"
                >
                    <span className="text-xl font-bold mr-2">+</span>
                    Create Category
                </button>

            </div>

            {showForm && (
                <div className="relative w-full max-w-md bg-white rounded-lg shadow-md p-6 mb-6 mx-auto">
                    <button
                        onClick={() => setShowForm(false)}
                        className="absolute top-2 right-2 text-gray-400 text-3xl hover:text-gray-600"
                    >
                        &times;
                    </button>
                    <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
                        Create Course Category
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">
                                Category Name
                            </label>
                            <input
                                type="text"
                                id="categoryName"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                id="description"
                                rows="4"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            )}


            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2 text-left text-gray-600">Category Name</th>
                        <th className="px-4 py-2 text-left text-gray-600">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => (
                        <tr key={index} className="border-t">
                            <td className="px-4 py-2">{category.category_name}</td>
                            <td className="px-4 py-2">{category.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CreateCategory;
