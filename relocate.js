const dotenv = require('dotenv');
dotenv.config();

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

MongoClient.connect('mongodb://'+process.env.MONGODB_HOST+':'+process.env.MONGODB_PORT,
{useUnifiedTopology: true, useNewUrlParser: true},
function (err, client) {
  if (err) throw err

  let db = client.db(process.env.MONGODB_DB);
  let col = db.collection('gawai');
  let bulk = col.initializeOrderedBulkOp();
  let  counter = 0;

  col.find({}).each(function (err, gawai) {
    if (err) throw err

    counter++;

    if(gawai) {

        bulk.find({ "_id": gawai._id }).updateOne({
            "$set": { "locations": {type: "Point", coordinates: [gawai.LON, gawai.LAT]} }
        });

        if (counter % 1000 == 0 ) {
            bulk.execute(function(err, result) {  
                // re-initialise batch operation           
                bulk = col.initializeOrderedBulkOp();
            });
        }
    }

    if (counter % 1000 != 0 ){
        bulk.execute(function(err, result) {
            // do something with result
            // db.close();
        }); 
        console.log(counter);
      }

    // client.close();
  });

});

function updateDocument(gawai) {

    console.log("1 document updated: ", (gawai._id));
  
    MongoClient2.connect('mongodb://'+process.env.MONGODB_HOST+':'+process.env.MONGODB_PORT,
    {useUnifiedTopology: true, useNewUrlParser: true},
    function (err, client) {
      if (err) throw err
    
      let db = client.db(process.env.MONGODB_DB);
      let myquery = { _id: ObjectID(gawai._id) };
      let newvalues = { $set: {locations: { type: "Point", coordinates: [gawai.LAT, gawai.LON] } } };
      db.collection("gawai").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
      });
  
      client.close();
    });
  
  }