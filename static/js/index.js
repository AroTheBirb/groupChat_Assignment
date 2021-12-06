console.log("working");

let socket = io( 'http://localhost:7077' );

let userName = prompt( "Please enter your name", "" );

$( '.messageForm' ).on( 'submit', function(event){
    event.preventDefault();

    let message = $('#message').val();

    let sendMessage ={
        name: userName,
        message: message
    }
    socket.emit('sendInfo', sendMessage);
});

socket.on('sendAll', function( data ){
    let message = `<p>${data.name} :  ${data.message}</p>`;
    console.log( message );
    $('.messageBox' ).append( message );
});

socket.on('showPreviewMessages', function(showAll){
    for(let i=0; i<showAll.length; i++){
        let message = `<p>${showAll[i].name} :  ${showAll[i].message}</p>`;
        $('.messageBox').append(message);
    }
});

