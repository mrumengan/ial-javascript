import { MongoClient } from 'mongodb';

export function list(req, res){

  MongoClient.connect('mongodb://localhost:27017',
  {useUnifiedTopology: true, useNewUrlParser: true},
  function (err, client) {
    if (err) throw err
  
    var db = client.db('meteor');
    db.collection('gawai').find().limit(25).toArray(function (err, result) {
      if (err) throw err
  
      console.log(result);

      res.render('devices/index', { title: 'Device List', gawais: result });
    })
  });
  

}
