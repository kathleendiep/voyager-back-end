
//express 
const { urlencoded } = require ( 'express')
const express = require('express');
const app = express();
const _env = require('dotenv').config()
// this is middleware 
const cors = require("cors");
app.use(cors())
const morgan = require("morgan");

if(!!_env.error) {
  console.log('Error: No .env file')
  process.abort()
}

// install controllers
const voyagerController = require("./controllers/voyagerController") 

// install mongoose 
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const db = mongoose.connection;
const mongoURI = process.env.MONGO_URI
// Connect to Mongo 
mongoose.connect( mongoURI );
mongoose.connect(mongoURI, () => {
	console.log('the connection with mongod is established')
})
// Connection Error/Success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));

db.on( 'open' , ()=>{
  console.log('Connection made!');
});

// use 
// this is middle wear 
app.use(morgan('short'))

app.use(express.static("public"))
app.use(methodOverride('_method'))

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/voyagers', voyagerController)
// REQUIRE MODEL
const Voyager =require("./models/voyager")
const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log('app running')
})

