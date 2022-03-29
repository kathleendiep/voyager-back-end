
//express 
const { urlencoded } = require ( 'express')
const express = require('express');
require('dotenv').config()
const app = express();

// install controllers
const voyagerController = require("./controllers/voyagerController") 
// this is middlewear 
const morgan = require("morgan");
const cors = require("cors");
// install mongoose 
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const db = mongoose.connection;
const mongoURI = "mongodb+srv://kathleendiep:coco@cluster0.jrknk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
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
// REQUIRE MODEL
const Voyager =require("./models/voyager")
// use 
// this is middle wear 
app.use(cors())
app.use(morgan('short'))

app.use(express.static("public"))
app.use(methodOverride('_method'))

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/voyagers', voyagerController)


const port = process.env.PORT || 3001
app.listen(port, ()=>{
    console.log('app running')
})