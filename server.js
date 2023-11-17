require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs/promises');
const port = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

app.set('views', './');
app.set('view engine', 'html');

app.engine('html', async (filePath, options, callback) => {
    const content = await fs.readFile(filePath, { encoding: 'utf-8' });
    return callback(null, content);
});

// const db = require('./utils/database');
// const Person = require('./models/person.m');
// db.clear('reqresTable');
// Person.run();

const appRouter = require('./routers/router');
app.use('/', appRouter);
// app.get('/', async (req, res) => {
//     res.render('_index');
// });

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => console.log(`example all listening on port ${port}`));