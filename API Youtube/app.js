//fonte: http://pt.stackoverflow.com/questions/64257/galeria-de-v%C3%ADdeos-do-youtube-em-php-e-ou-javascript

var YTVideo = function(){
    
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
            _itens += "<div class='row'><a href='#' item-id='" + lista[i].contentDetails.relatedPlaylists.uploads + "'> Vídeos " + i + "</a></div>";
        }
        
        _tabela.html("");
        _tabela.html(_itens);
        _tabela.find('a').click(requisitarVideos);
    }
    
    function listarVideos(lista){
        console.log(JSON.stringify(lista));
    }

    function requisitarVideos(){
        var _data = { part: 'snippet', maxResults: 10, playlistId: $(this).attr('item-id'), key: 'AIzaSyBM3XlO94bHBN6P8AbfG4w4Z' };

        $.ajax({
            type:'GET',
            url: 'https://www.googleapis.com/youtube/v3/playlistItems',
            data: _data,
            success: listarVideos,
            error: erro
        });
    }
    
    this.requisitar = function(){
        var _data = { part: 'contentDetails', forUsername: '1taldemarvin', key: 'AIzaSyBM3XlO94bHBN6P8AbfG4w4Z-JSWOhDYrM' };

        $.ajax({
            type:'GET',
            url: 'https://www.googleapis.com/youtube/v3/channels',
            data: _data,
            success: sucesso,
            error: erro
        });
    }
}

var yt = new YTVideo();

$(document).ready(yt.requisitar);
