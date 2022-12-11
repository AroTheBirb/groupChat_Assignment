const express = require( 'express' );
const app = express();

app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');
app.use( express.static(__dirname + '/static') );

//render index form
app.get("/", function( request, response ){
    response.render( 'index' );
});

const server = app.listen(process.env.PORT || 3000);

const io =require( 'socket.io' ) ( server );

let showAll = [];
io.on( 'connection', function( socket ){
    console.log( "You are in the server" );
    socket.emit('showPreviewMessages', showAll);

    socket.on( 'sendInfo', function( data ){
        console.log( data );
        showAll.push( data );
        io.sockets.emit( 'sendAll', data )
    })
});
