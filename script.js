var cimkek_png = [
    'sarga',
    'zold',
    'lila',
    'kek'];

function send(event){
    if(event.keyCode == 13){
        var cimkek = document.querySelector("#cimkek");
        var szoveg = document.querySelector("#tennivalo");
        var szin = 0;

        for(var i=0; i<szoveg.value.length; i++){
            szin += szoveg.value.charCodeAt(i);
        }

        szin = szin % cimkek_png.length;

        fetch('api.php?action=insert&szoveg='+szoveg.value+'&szin='+szin)
        .then(response => response.json())
        .then(data => {
            renderData(data,cimkek);
        });

        szoveg.value = "";
    }
}

function remove(id){
    fetch('api.php?action=remove&id='+id)
    .then(response => response.json())
    .then(data => {
        renderData(data,cimkek);
    });
}

function getAll(){
    var cimkek = document.querySelector("#cimkek");
    /*
     * https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
     * https://developer.mozilla.org/en-US/docs/Web/API/Response/json
     */

    fetch('api.php?action=getall')
    .then(response => response.json())
    .then(data => {
        renderData(data,cimkek);
    });
}

function renderData(data,cimkek){
    var tartalom = "";
    for(var i=0; i<data.lista.length; i++){
        szin = cimkek_png[data.lista[i].szin];
        tartalom += "<div class=\"cimke " + szin + "\">";
        tartalom += "<div class=\"kuka\" onclick=\"remove("+data.lista[i].id+")\"></div>";
        tartalom += data.lista[i].szoveg;
        tartalom += "</div>";  
    }
    cimkek.innerHTML = tartalom;
}

getAll();
