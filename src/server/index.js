/**
 * Following lowdb's instructions for integrating with Express
 * @see https://github.com/typicode/lowdb/tree/master/examples#server
 */
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const low = require('lowdb');
const shortid = require('shortid');
const FileAsync = require('lowdb/adapters/FileAsync');

// Create the server
const app = express();

// Server the static files from the React app
app.use(bodyParser.json(), express.static('dist'));

const adapter = new FileAsync('db.json');

low(adapter)
  .then(db => {
    app.get('/getNotes', (req, res) => {
      const notes = db.get('notes').value();
      res.send(notes);
    });

    app.post('/addNote', (req, res) => {
      db.get('notes')
        .push({ ...req.body, id: shortid.generate() })
        .last()
        .write()
        .then(note => res.send(note));
    });

    app.post('/deleteNote', (req, res) => {
      db.get('notes')
        .remove({ id: req.body.id })
        .write();

      const notes = db.get('notes').value();
      res.send(notes);
    });

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
    })
    return db.defaults({ notes: [] }).write();
  })
  .then(() => {
    const port = 8080;
    app.listen(port, () => console.log('Listening on port ' + port));
  });
