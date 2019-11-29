const dotenv = require('dotenv');
dotenv.config();

var MongoClient = require('mongodb').MongoClient

exports.list = function(req, res){

  MongoClient.connect('mongodb://'+process.env.MONGODB_HOST+':'+process.env.MONGODB_PORT,
  {useUnifiedTopology: true, useNewUrlParser: true},
  function (err, client) {
    if (err) throw err
  
    var db = client.db(process.env.MONGODB_DB);
    db.collection('gawai').find().limit(25).toArray(function (err, result) {
      if (err) throw err
  
      res.render('gawais/index', { title: 'Gawai List', gawais: result });
    })
  });
  

};
