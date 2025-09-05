const express = require('express');
const countStudents = require('./3-read_file_async');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  const dbPath = process.argv[2];
  let output = 'This is the list of our students\n';

  if (!dbPath) {
    res.status(500).send('Cannot load the database');
    return;
  }

  try {
    const studentsData = await countStudents(dbPath);
    output += studentsData;
    res.send(output);
  } catch (error) {
    res.status(500).send('Cannot load the database');
  }
});

// فقط شغّل السيرفر إذا الملف تم تشغيله مباشرة
if (require.main === module) {
  app.listen(1245, () => {
    console.log('Express server is listening on port 1245');
  });
}

module.exports = app;
