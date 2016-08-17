var YTVideo = function(){
    var data = { part: 'contentDetails', forUsername: '1taldemarvin', key: 'AIzaSyBM3XlO94bHBN6P8AbfG4w4Z-JSWOhDYrM' };
    
    function sucesso(objeto){
        listarPlaylists(objeto.items);
    }
    
    function erro(objeto){
        console.log(objeto.responseJSON.error.message);
    }
    
    function listarPlaylists(lista){
        var _tabela = $('.table');
        var _itens = "";
        var _tamanho = lista.length;
        
        for(var i = 0; i < _tamanho; i ++){
            _itens += "<div class='row'><a href='#' onclick='listarVideos(this);' item-id='" + lista[i].propriedadedeid + "'>" + lista[i].propriedadedenome + "</a></div>";
        }
        
        _tabela.html("");
        _tabela.html(_itens);
    }
    
    function listarVideos(item){
        //requisição para listar os vídeos com o id da playlist que seria o curso
    }
    
    this.requisitar = function(){
        $.ajax({
            type:'GET',
            url: 'https://www.googleapis.com/youtube/v3/channels',
            data: data,
            success: sucesso,
            error: erro
        });
    }
}

var yt = new YTVideo();

$(document).ready(yt.requisitar);
