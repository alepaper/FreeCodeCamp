
    frase = new Array();
    autor = new Array();
    totalfrases = 0;
    alea = 0;

    function leer(json) {
        totalfrases = json.feed.entry.length;
        for(i=0; i<totalfrases; i++) {
            frase[i] = json.feed.entry[i].gsx$citas.$t;
            autor[i] = json.feed.entry[i].gsx$autores.$t;
        }
        escribir();
    }

    function escribir() {
        alea = Math.round(Math.random()*(totalfrases-1));
        $('#frasesaleatorias').html('<h3><b>&quot;' + frase[alea] +
            '&quot;</b></h3><footer><cite title="Autor">' + autor[alea] + '</cite></footer>');
        var r =Math.round(Math.random()*(255));
        var g =Math.round(Math.random()*(255));
        var b =Math.round(Math.random()*(255));
        var gamma = 2.2;
        var L = 0.2126 * Math.pow( r/255, gamma ) + 0.7152 * Math.pow( g/255, gamma ) + 0.0722 * Math.pow( b/255, gamma );
        var color;
        if (L>0.5) {
            color="Black";
        } else {
            color="White";
        }
        $('body').css('color',color);
        $('#fondo').css('background-color', "rgb("+ r + "," + g +"," + b +")");
    }

    function enviar () {
        window.open('https://twitter.com/intent/tweet?text=' + frase[alea].replace(';', ''));
    }

    $(document).ready(function() {
        $("#next").on("click", escribir);
        $("#tweet").on("click", enviar);
    });
