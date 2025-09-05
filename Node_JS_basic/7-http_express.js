const express = require('express');
const countStudents = require('./3-read_file_async');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  const dbFile = process.argv[2];
  if (!dbFile) {
    res.status(500).send('Cannot load the database');
    return;
  }

  try {
    let output = 'This is the list of our students\n';
    const studentsData = await countStudents(dbFile);
    output += studentsData;
    res.send(output);
  } catch (err) {
    res.status(500).send('Cannot load the database');
  }
});

app.listen(1245);

module.exports = app;
