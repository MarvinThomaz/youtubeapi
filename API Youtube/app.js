//https://www.googleapis.com/youtube/v3/activities?part=UCTNREvD1mfR9xPuOhoD0Ktw&channelId=UCTNREvD1mfR9xPuOhoD0Ktw&key=AIzaSyBM3XlO94bHBN6P8AbfG4w4Z-JSWOhDYrM

var _objeto = null,
    _data = { part: 'contentDetails', forUsername: '1taldemarvin', key: 'AIzaSyBM3XlO94bHBN6P8AbfG4w4Z-JSWOhDYrM' };

function sucesso(objeto){
    _objeto = objeto;
}

function erro(objeto){
    _objeto = objeto;
}

$(document).ready(function(){ 
    $.ajax({
        type:'GET',
        url: 'https://www.googleapis.com/youtube/v3/channels',
        data: _data,
        success: sucesso,
        error: erro
    });
});