const { Pool } = require('pg');

// Create a new pool instance
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'postgres',
    database: 'assignment03'
});

// Function to get all students
async function getAllStudents() {
    const res = await pool.query('SELECT * FROM students');
    return res.rows;
}


// Function to add a new student
async function addStudent(first_name, last_name, email, enrollment_date) {
    const res = await pool.query('INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES ($1, $2, $3, $4) RETURNING *',
        [first_name, last_name, email, enrollment_date]);
}

// Function to update a student's email
async function updateStudentEmail(student_id, new_email) {
    const res = await pool.query('UPDATE students SET email = $1 WHERE student_id = $2 RETURNING *',
        [new_email, student_id]);
}

// Function to delete a student
async function deleteStudent(student_id) {
    const res = await pool.query('DELETE FROM students WHERE student_id = $1 RETURNING *',  
        [student_id]); 
}
// Cleanup
async function closePool() {
    await pool.end();
    console.log('Pool closed');
}

// Example usage
(async () => {
    //await addStudent('Ben', 'Holmes', 'ben.holmes@gmail.com', '2020-10-12');
    //await addStudent('Anana', 'Bach', 'Anana.Bach@gmail.com', '2021-11-12');
    //await updateStudentEmail(13, 'BEN.HOLMES@gmail.com');
    await deleteStudent(13);
    const students = await getAllStudents();
    console.log(students);
    await closePool();
})();

