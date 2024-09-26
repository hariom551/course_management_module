import mysql from 'mysql2/promise';  // Use promise-based version

// Create a connection pool with promise-based mysql2
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "course_management",
    connectionLimit: 10,
    connectTimeout: 10000,
});

// Test the database connection using async/await
async function testConnection() {
    try {
        const [rows] = await pool.query('SELECT 1 + 1 AS solution');
        console.log('Database connected successfully. Solution:', rows[0].solution);
    } catch (error) {
        console.error('Database connection test failed.', error);
    }
}

// Call the function to test the connection
testConnection();

// Graceful shutdown: close the pool when the app terminates
process.on('SIGINT', () => {
    pool.end((err) => {
        if (err) {
            console.error('Error closing the database connection:', err);
        } else {
            console.log('Database connection closed.');
        }
        process.exit();
    });
});

export { pool };
