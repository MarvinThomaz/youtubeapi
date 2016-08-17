//fonte: http://pt.stackoverflow.com/questions/64257/galeria-de-v%C3%ADdeos-do-youtube-em-php-e-ou-javascript

var YTVideo = function () {

    var key = 'AIzaSyBM3XlO94bHBN6P8AbfG4w4Z-JSWOhDYrM';

    function sucesso(objeto) {
        listarPlaylists(objeto.items);
    }

    function erro(objeto) {
        console.log(objeto.responseJSON.error.message);
    }

    function listarPlaylists(lista) {
        var _tabela = $('.table');
        var _itens = "";
        var _tamanho = lista.length;

        for (var i = 0; i < _tamanho; i++) {
            _itens += "<div class='row'><a href='#' item-id='" + lista[i].contentDetails.relatedPlaylists.uploads + "'> Vídeo " + i + "</a></div>";
        }

        _tabela.html("");
        _tabela.html(_itens);
        _tabela.find('a').click(requisitarVideos);
    }

    function listarVideos(lista) {
        var count = lista.items.length;
        var elemento = $("[item-id]");

        elemento.html("");

        for (var i = 0; i < count; i++) {
            elemento.append('<li><strong>' + lista.items[i].snippet.title + '</strong><iframe width=250 height=250 src=https://www.youtube.com/embed/' + lista.items[i].id + '></iframe></li>')
        }
    }

    function requisitarVideos() {
        var _data = { part: 'snippet', maxResults: 10, playlistId: $(this).attr('item-id'), key: key };

        $.ajax({
            type: 'GET',
            url: 'https://www.googleapis.com/youtube/v3/playlistItems',
            data: _data,
            success: listarVideos,
            error: erro
        });
    }

    this.requisitar = function () {
        var _data = { part: 'contentDetails', forUsername: '1taldemarvin', key: key };

        $.ajax({
            type: 'GET',
            url: 'https://www.googleapis.com/youtube/v3/channels',
            data: _data,
            success: sucesso,
            error: erro
        });
    }
}

var yt = new YTVideo();

$(document).ready(yt.requisitar);