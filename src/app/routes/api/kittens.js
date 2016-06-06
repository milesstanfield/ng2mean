var Kitten = require('./../../models/kitten');

module.exports = function(app) {
  app.get('/api/kittens', function(req, res) {
    Kitten.find(function(err, kittens) {
      if (err) { res.send(err); }
      res.json(kittens);
    });
  });
};
