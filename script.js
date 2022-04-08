function send(){
    var cimkek = document.querySelector("#cimkek");
    var szoveg = document.querySelector("#tennivalo");

    fetch('https://localhost/tennivalok/api.php?insert='+szoveg.value)
    .then(response => response.json())
    .then(data => {
        renderData(data,cimkek);
    });

    szoveg.value = "";
}

function remove(id){
    fetch('https://localhost/tennivalok/api.php?remove='+id)
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

    fetch('https://localhost/tennivalok/api.php?action=getall')
    .then(response => response.json())
    .then(data => {
        renderData(data,cimkek);
    });
}

function renderData(data,cimkek){
    var tartalom = "";
    for(var i=0; i<data.lista.length;i++){
        tartalom += "<div class=\"cimke\">";
        tartalom += "<div class=\"kuka\" onclick=\"remove("+data.lista[i].id+")\"></div>";
        tartalom += data.lista[i].szoveg;
        tartalom += "</div>";  
    }
    cimkek.innerHTML = tartalom;
}

getAll();
