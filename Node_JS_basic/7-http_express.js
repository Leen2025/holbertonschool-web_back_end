// 7-http_express.js
const express = require('express');
const fs = require('fs');
const process = require('process');

const app = express();
const port = 1245;

// Function to read CSV and return formatted student info
function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n').filter(line => line.trim() !== '');
      const students = lines.slice(1).map(line => {
        const [firstname, lastname, age, field] = line.split(',');
        return { firstname, lastname, age, field };
      });

      const fields = {};
      students.forEach(student => {
        if (!fields[student.field]) fields[student.field] = [];
        fields[student.field].push(student.firstname);
      });

      let output = `Number of students: ${students.length}\n`;
      for (const [field, names] of Object.entries(fields)) {
        output += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
      }
      resolve(output.trim());
    });
  });
}

// Root route
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Students route
app.get('/students', async (req, res) => {
  const dbFile = process.argv[2];
  if (!dbFile) {
    res.status(500).send('Database file not provided');
    return;
  }

  try {
    const studentInfo = await countStudents(dbFile);
    res.send(`This is the list of our students\n${studentInfo}`);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  // Server is running
});

module.exports = app;
