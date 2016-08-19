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
        _tabela.find('[item-id]').click(requisitarPublicos);
        _tabela.find('[more]').click(requisitarPrivados);
    }

    function listarVideos(lista, show) {
        esvaziarContainers();

        var count = lista.length;

        if(count > 0) {
            var elemento = $("[playlist-items=" + lista[0].snippet.playlistId + "] [items]");

            elemento.html("");

            for (var i = 0; i < count; i++)
                elemento.append('<p><strong>' + lista[i].snippet.title + '</strong></p><p><iframe width="420" height="315" src="https://www.youtube.com/embed/' + lista[i].snippet.resourceId.videoId + '" frameborder="0" allowfullscreen></iframe></p>');

            elemento.parent().show();

            if(show)
                elemento.parent().find('[more]').show();
            else
                elemento.parent().find('[more]').hide();
        }
    }

    function listarPublicos(lista) {
        var colecao = lista.items, count = colecao.length, array = [];

        for (var i = 0; i < count; i++)
            if(colecao[i].snippet.title != private)
                array.push(colecao[i]);

        listarVideos(array, true);
    }

    function listarPrivados(lista) {
        var colecao = lista.items, count = colecao.length, array = [];

        for (var i = 0; i < count; i++)
            if(colecao[i].snippet.title == private)
                array.push(colecao[i]);

        listarVideos(array, false);
    }

    function requisitarPublicos() {
        requisitarVideos(listarPublicos, $(this).attr("item-id"));
    }

    function requisitarPrivados() {
        requisitarVideos(listarPrivados, $(this).attr("more"));
    }

    function requisitarVideos(sucesso, id) {
        var _data = { part: 'snippet', maxResults: 10, playlistId: id, key: key };

        $.ajax({
            type: 'GET',
            url: 'https://www.googleapis.com/youtube/v3/playlistItems',
            data: _data,
            success: sucesso,
            error: erro
        });
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