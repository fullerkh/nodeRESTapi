// note_routes.js
var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {
  app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
		console.log('An error occured : could not fin ID');
      } else {
        res.send(item);
		console.log(item);
      } 
    });
  });
  app.post('/notes', (req, res) => {
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').insert(note, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error occured : could not insert record' }); 
		console.log('An error occured : could not insert record');
      } else {
        res.send(result.ops[0]);
		console.log('We are live on ' + port);
      }
    });
  });
  app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
		console.log('An error occured : could not remove record');
      } else {
        res.send('Note ' + id + ' deleted!');
		console.log('Note ' + id + ' deleted!');
      } 
    });
  });
  app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').update(details, note, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
		  console.log('An error occured : could not update record');
      } else {
          res.send(note);
		  console.log(note);
      } 
    });
  });
};