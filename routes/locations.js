const dotenv = require('dotenv');
dotenv.config();

var MongoClient = require('mongodb').MongoClient
var MongoClient2 = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;

exports.view = function(req, res) {
  MongoClient.connect('mongodb://'+process.env.MONGODB_HOST+':'+process.env.MONGODB_PORT,
  {useUnifiedTopology: true, useNewUrlParser: true},
  function (err, client) {
    if (err) throw err
  
    var db = client.db(process.env.MONGODB_DB);
    db.collection('gawai').find({
      locations:
        { $near:
           {
             $geometry: { type: "Point",  coordinates: [ 106.8247673, -6.175866 ] },
             $minDistance: 1000,
             $maxDistance: 5000
           }
        }
    }).toArray(function (err, result) {
        if (err) throw err
        console.log(result);
  
        res.render('gawais/view', { title: 'Gawai Detil', gawai: result });
    });
  });
}
