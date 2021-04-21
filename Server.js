var express = require('express');
var app = express();
app.use(express.static('public'));
app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})
app.get('/process_request', function (req, res) {
   // Prepare output in JSON format
   response = {
      name:req.query.name,
      mobile:req.query.mobile,
      email:req.query.email,
      address:req.query.address,
      dob:req.query.dob,
      gender:req.query.gender,
      username:req.query.username,
      Epassword:req.query.Epassword
   };
   console.log(response);
   res.end(JSON.stringify(response));

      
   var mongodb = require('mongodb');
   var mongoClient = mongodb.MongoClient;
   var url = "mongodb://localhost:27017/";
   mongoClient.connect(url, function(err, databases) {
   if (err) {
       throw err;
   }

   var nodetestDB = databases.db("SignUpUserDetail"); //here  
   var customersCollection = nodetestDB.collection("FormDetail");
   var id=1;
   var customer = {name:req.query.name, Mobile:req.query.mobile, Email:req.query.email , Address:req.query.address, DOB:req.query.dob, Gender:req.query.gender, Unamer:req.query.username, Password:req.query.Epassword, ConfirmPassword:req.query.Cpassword };
   
   customersCollection.insertOne(customer, function(error, response) {
       if (error) {
           throw error;
       }
       id=id+1;
       console.log("1 document inserted");
       databases.close();
   });
});


})
var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  
  console.log("Example app listening at http://%s:%s", host, port)
})
