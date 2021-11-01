const express = require('express');
const { MongoClient } = require('mongodb');
var bodyParser = require('body-parser')
const ObjectId = require('mongodb').ObjectId;
var cors = require('cors')
const port = 3001;
const uri = "mongodb+srv://backendp:backendp1234@cluster0.s3qss.mongodb.net/backendp?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/",(req,res)=>{
  res.send("dor, net slow !!")
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});