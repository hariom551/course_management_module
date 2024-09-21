
import mysql from 'mysql2'; 


const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "course_management",
    connectionLimit:  10,
    connectTimeout: 10000, 
});


pool.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
    if (error) {
        console.error('Database connection test failed.', error);
    } else {
        console.log('Database connected successfully.');
    }
});


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
