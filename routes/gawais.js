const dotenv = require('dotenv');
dotenv.config();

var MongoClient = require('mongodb').MongoClient

exports.list = function(req, res){

  MongoClient.connect('mongodb://'+process.env.MONGODB_HOST+':'+process.env.MONGODB_PORT,
  {useUnifiedTopology: true, useNewUrlParser: true},
  function (err, client) {
    if (err) throw err
  
    var db = client.db(process.env.MONGODB_DB);
    db.collection('gawai').aggregate([
      { $group: { "_id": "$IMEI", "shown": { $sum: 1 } } },
      {$sort: {shown: -1}},
      {$limit: 20}
    ],
    {allowDiskUse: true}
    )
      .toArray(function (err, result) {
        if (err) throw err
  
        res.render('gawais/index', { title: 'Gawai List', gawais: result });
    });
  });
  
};

exports.view = function(req, res) {
  MongoClient.connect('mongodb://'+process.env.MONGODB_HOST+':'+process.env.MONGODB_PORT,
  {useUnifiedTopology: true, useNewUrlParser: true},
  function (err, client) {
    if (err) throw err
  
    var db = client.db(process.env.MONGODB_DB);
    db.collection('gawai').findOne({IMEI: req.params['imei']}, {}, function (err, result) {
        if (err) throw err
        console.log(req.params['imei']);
        console.log(result);
  
        res.render('gawais/view', { title: 'Gawai Detil', gawai: result });
    });
  });
}
