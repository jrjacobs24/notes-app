/**
 * Following lowdb's instructions for integrating with Express
 * @see https://github.com/typicode/lowdb/tree/master/examples#server
 */
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

// Create the server
const app = express();

// Server the static files from the React app
app.use(bodyParser.json(), express.static('dist'));

const adapter = new FileAsync('db.json');

low(adapter)
  .then(db => {
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
    })
    return db.defaults({ notes: [] }).write();
  })
  .then(() => {
    const port = 8080;
    app.listen(port, () => console.log('Listening on port ' + port));
  });
