//fonte: http://pt.stackoverflow.com/questions/64257/galeria-de-v%C3%ADdeos-do-youtube-em-php-e-ou-javascript

var YTVideo = function () {

    var key = 'AIzaSyBM3XlO94bHBN6P8AbfG4w4Z-JSWOhDYrM';
    var private = "Private video";

    function esvaziarContainers(){
        $("[playlist-items] [items]").html("");
        $("[playlist-items] [private]").html("");
    }

    function sucesso(objeto) {
        requisitarPlaylists(objeto.items[0].id);
    }

    function erro(objeto) {
        console.log(objeto.responseJSON.error.message);
    }

    function listarPlaylists(lista) {
        var _tabela = $('.table');
        var _itens = "";
        var _tamanho = lista.items.length;

        for (var i = 0; i < _tamanho; i++) {
            _itens += "<div class='row'><a href='#' item-id='" + lista.items[i].id + "'> " + lista.items[i].snippet.title + "</a></div><div playlist-items='" + lista.items[i].id + "'><div items></div><div><a href='#' more='" + lista.items[i].id + "'>Mais vídeos</a></div><div private></div></div>";
        }

        _tabela.html("");
        _tabela.html(_itens);
        _tabela.find('[playlist-items]').hide();
        _tabela.find('[item-id]').click(requisitarVideos);
        _tabela.find('[more]').click(requisitarPrivados);
    }

    function requisitarPlaylists(channel){
        var _data = { channelId: channel, part: 'snippet', key: key };

        $.ajax({
            type: 'GET',
            url: 'https://www.googleapis.com/youtube/v3/playlists',
            data: _data,
            success: listarPlaylists,
            error: erro
        });
    }

    function listarVideos(lista) {
        esvaziarContainers();

        var count = lista.items.length;

        if(count > 0) {
            var elemento = $("[playlist-items=" + lista.items[0].snippet.playlistId + "] [items]");

            elemento.html("");

            for (var i = 0; i < count; i++) {
                if(lista.items[i].snippet.title != private)
                    elemento.append('<p><strong>' + lista.items[i].snippet.title + '</strong></p><p><iframe width="420" height="315" src="https://www.youtube.com/embed/' + lista.items[i].snippet.resourceId.videoId + '" frameborder="0" allowfullscreen></iframe></p>')
            }

            elemento.parent().show();
            elemento.parent().find('[more]').show();
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

    function listarPrivados(lista) {
        
        var count = lista.items.length;

        if(count > 0) {
            var elemento = $("[playlist-items=" + lista.items[0].snippet.playlistId + "] [private]");

            elemento.html("");

            for (var i = 0; i < count; i++) {
                if(lista.items[i].snippet.title == private)
                    elemento.append('<p><strong>' + lista.items[i].snippet.title + '</strong></p><p><iframe width="420" height="315" src="https://www.youtube.com/embed/' + lista.items[i].snippet.resourceId.videoId + '" frameborder="0" allowfullscreen></iframe></p>')
            }

            elemento.parent().show();
            elemento.parent().find('[more]').hide();
        }
    }

    function requisitarPrivados() {
        var _data = { part: 'snippet', maxResults: 10, playlistId: $(this).attr('more'), key: key };

        $.ajax({
            type: 'GET',
            url: 'https://www.googleapis.com/youtube/v3/playlistItems',
            data: _data,
            success: listarPrivados,
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