var mongoose = require('mongoose');

module.exports = mongoose.model('Kitten', {
  name : {type : String, default: ''}
});
