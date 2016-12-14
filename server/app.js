var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser= require( 'body-parser' );
var pg= require('pg');
var urlencodedParser = bodyParser.urlencoded( {extended: false } );
var port = process.env.PORT || 8080;
// static folder
app.use( express.static( 'public' ) );

var connectionString= 'postgres://localhost:5432/Holla-Back-Girl';

// spin up server
app.listen( port, function(){
  console.log( 'server up on', port );
});

// base url
app.get( '/', function( req, res ){
  console.log( 'base url hit' );
  res.sendFile( 'index.html' );
});

// get koalas
app.get( '/getKoalas', function( req, res ){
  console.log( 'getKoalas route hit' );
  //assemble object to send
  var objectToSend={
    response: 'from getKoalas route'
  }; //end objectToSend
  //send info back to client
  res.send( objectToSend );
});

// add koala
app.post( '/addKoala', urlencodedParser, function( req, res ){
  console.log( 'addKoala route hit' );

  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
    } else {
      console.log('back from db');
      console.log(typeof req.body.age);
      client.query('INSERT INTO koala_bears(name, age, sex, ready_for_transfer, notes) values($1, $2, $3, $4, $5)', [req.body.name, req.body.age, req.body.sex, req.body.readyForTransfer, req.body.notes] );
      done();
      res.send('hola back girl!!');
    }
  });

  //assemble object to send
  var objectToSend={
    response: 'from addKoala route'
  }; //end objectToSend
  //send info back to client
  //res.send( objectToSend );
});

// add koala
app.post( '/editKoala', urlencodedParser, function( req, res ){
  console.log( 'editKoala route hit' );
  //assemble object to send
  var objectToSend={
    response: 'from editKoala route'
  }; //end objectToSend
  //send info back to client
  res.send( objectToSend );
});
