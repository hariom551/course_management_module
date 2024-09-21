import { useState, useEffect } from 'react';

function Login() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', options);
    setDate(dateString);
    setTime(`${hours}:${minutes}:${seconds}`);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    try {
      const response = await fetch(`/api/v1/users/login`, {
        method: 'POST',
        body: JSON.stringify({ userid: userId, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();

      if (response.ok) {
        const { user, token } = data.data;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        window.location.href = '/home';
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Login request failed:', error);
      setError('Invalid user credentials.');
    }
  };

  return (
    <>
      <header className="bg-[#011627] fixed top-0 left-0 w-full h-16 flex justify-between items-center px-6 text-white z-50">
        <span className="text-lg">Login Page</span>
        <div className="text-right">
          <span className="text-lg block">{date}</span>
          <span className="text-lg block">{time}</span>
        </div>
      </header>

      <div className="flex justify-center items-center h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-[#011627] p-8 rounded-lg shadow-lg max-w-md w-full mt-20">
          <div className="mb-4">
            <label htmlFor="userid" className="block text-white mb-2">User Id:</label>
            <input
              type="text"
              id="userid"
              name="userid"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              placeholder="Enter User Id"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-white mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg">
              Login
            </button>
            {error && <p className="mx-4 text-red-600 text-sm">{error}</p>}
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
