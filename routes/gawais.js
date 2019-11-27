var MongoClient = require('mongodb').MongoClient

exports.list = function(req, res){

  MongoClient.connect('mongodb://localhost:27017',
  {useUnifiedTopology: true, useNewUrlParser: true},
  function (err, client) {
    if (err) throw err
  
    var db = client.db('meteor');
    db.collection('gawai').find().limit(25).toArray(function (err, result) {
      if (err) throw err
  
      console.log(result);

      res.render('gawais/index', { title: 'Gawai List', gawais: result });
    })
  });
  

};
