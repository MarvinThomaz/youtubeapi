var _objeto = null,
    _data = { part: 'contentDetails', forUsername: '1taldemarvin', key: 'AIzaSyBM3XlO94bHBN6P8AbfG4w4Z-JSWOhDYrM' };

function sucesso(objeto){
    _objeto = objeto;
}

function erro(objeto){
    _objeto = objeto;
}

function listarPlaylists(lista){
    var tabela = document.getElementById("tabela");
    var itens = "";
    var tamanho = lista.length;
    
    for(var i = 0; i < tamanho; i ++){
        itens += "<div class='row'><a href='#' onclick='listarVideos(this);' item-id='" + lista[i].propriedadedeid + "'>" + lista[i].propriedadedenome + "</a></div>";
    }
}

function listarVideos(item){
    //requisição para listar os vídeos com o id da playlist que seria o curso
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
