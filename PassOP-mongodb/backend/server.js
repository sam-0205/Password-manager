const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser');
const { redirect } = require('react-router');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'passop';
const app = express()
const port = 3000
app.use(bodyparser.json())
app.use(cors())

client.connect();
//show all the passwords
app.get('/', async (req, res) => {
 
  // console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const fr=await collection.find({}).toArray();
  // res.send("hello")
  res.json(fr);

})

//save a passwords 
app.post('/', async (req, res) => {
  const password = req.body
  console.log('Added');
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const fr=await collection.insertOne(password);
  res.send({success: true, result: fr});
})

//delete a password
app.delete('/', async (req, res) => {
  const password = req.body
  console.log(req.body);
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const fr=await collection.deleteOne(password);
  res.send({success: true, result: fr});
})


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})


