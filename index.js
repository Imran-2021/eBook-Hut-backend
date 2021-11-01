const express = require('express');
const { MongoClient } = require('mongodb');
var bodyParser = require('body-parser')
const ObjectId = require('mongodb').ObjectId;
var cors = require('cors')
const port = 3001;
const uri = "mongodb+srv://backendp:backendp1234@cluster0.s3qss.mongodb.net/ebookhut?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();
app.use(cors())
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false })
client.connect(err => {
  const collection = client.db("ebookhut").collection("ebookhutcol1");
  const collection2 = client.db("ebookhut").collection("ebookhutcol2");
  // collection.insertMany([{ product, product1 }])


  app.post("/addToCard", urlencodedParser, (req, res) => {
    console.log(req.body.dataa);
    collection2.insertOne(req.body.dataa)
      .then(result => {
        // res.send("success")
        // to make smoothy --- 
        // res.redirect("http://localhost:3000/admin")
      });
    // perform actions on the collection object
    console.log("data base Connected !!!");
  })
  app.get('/cardBooks', function (req, res) {
    // collection.find({}).limit(3)
    collection2.find({})
    .toArray((err,documents)=>{
      res.send(documents)
    })
  })
  app.get('/singlecardBooks', function (req, res) {
    // collection.find({}).limit(3)
    collection2.find({emaill:req.query.email})
    .toArray((err,documents)=>{
      res.send(documents)
    })
  })
  app.post("/addBook", urlencodedParser, (req, res) => {
    console.log(req.body);
    collection.insertOne(req.body)
      .then(result => {
        // res.send("success")
        // to make smoothy --- 
        res.redirect("http://localhost:3000/admin")
      });
    // perform actions on the collection object
    console.log("data base Connected !!!");
  })

  app.get('/books', function (req, res) {
    // collection.find({}).limit(3)
    collection.find({})
    .toArray((err,documents)=>{
      res.send(documents)
    })
  })
  app.delete(`/delete/:id`, function (req, res) {
    console.log(req.params.id);
    collection.deleteOne({_id:ObjectId(req.params.id)})
    .then((result)=>{
      res.send(result.deletedCount>0)
    })
  })
});
app.get("/",(req,res)=>{
  res.send("waiting !!")
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});