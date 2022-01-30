
'use strict';

let valuePesquisa = new URL(document.location).searchParams.get("cripto")

var cloneMedia = $('.coins-list').clone();

$('.media-list').empty(); // .html('');

if(valuePesquisa != null && valuePesquisa.length){
	$('#cripto').val(valuePesquisa);
	
    $('.titulo').text("Resultados da pesquisa - " + valuePesquisa + "  ( TOP 100 ) ")

    $.ajax({
        method: "GET",
        url: "https://api.coingecko.com/api/v3/search?query=" + valuePesquisa,
    }).done(function(res){
        var coins = ""

        $.each(res['coins'], function(index, result){
            coins += result.id + ","
        })
        if(coins.length)
        {
            $.ajax({
                method: "GET",
                url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=" + coins + "&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        
            }).done(function(res){
                criarTabela(res)
            })  
        }
    })
}
else
{
    $.ajax({
        method: "GET",
        url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"

    }).done(function(res){
        criarTabela(res)
    })
    

}

function criarTabela(res)
{
    $.each(res, function(index, result){
        // Criar novo clone
        var liMedia = cloneMedia.clone();
        // Alterar no clone 
        $('.coin-position', liMedia).text("#"+ result.market_cap_rank)
        $('.coin-logo', liMedia).attr('src', result.image);
        $('.coin-logo', liMedia).attr('alt', result.id);
        $('.coin-nome', liMedia).text(result.name)
        $('.coin-valor', liMedia).text(result.current_price + " $")
        // $('a', liMedia).attr('href', 
        // 	"https://www.imdb.com/title/" + result.imdbID)
        // Adicionar o clone à tabela original
        $('.media-list').append(liMedia);
        $('.fav', liMedia).attr('id', "id_" + result.id);

    })
}


$( "body" ).on( "click", "[id^=id_]", function() {

    var testObject = { 'one': 1, 'two': 2, 'three': 3 };

    // Put the object into storage
    localStorage.setItem('testObject', JSON.stringify(testObject));

    // Retrieve the object from storage
    var retrievedObject = localStorage.getItem('testObject');

    console.log('retrievedObject: ', JSON.parse(retrievedObject));

    var criptosFav = localStorage.getItem('criptos-favoritas')

    // if(criptosFav == null)
    // {
    //     var criptos = []
    //     criptos = { `$(this).attr('id').split('_')[1]`: $(this).attr('id').split('_')[1]}
    //     criptos.push($(this).attr('id').split('_')[1])

    //     localStorage.setItem('criptos-favoritas', JSON.stringify(criptos))
    // }
    // else
    // {
    //     criptosFav.push($(this).attr('id').split('_')[1])
    //     console.log(criptosFav)
    // }
    // console.log(criptosFav)
    // Put the object into storage
    // localStorage.setItem('testObject', JSON.stringify(testObject));
    // console.log(this)
});
