function showEliminar(valor) {
    var valor = valor;
    $('#eliminar').val(valor);
    // alert(valor);
}
function showID(valor) {
    var valor = valor;
    $('#ID').val(valor);
    
}

function showText1(valor) {
    var valor = valor;
    $('#val').val(valor);
    $("#text1").text(valor);
}
function showText2(valor) {
    var valor = valor;
    $('#val2').val(valor);
    $("#text2").text(valor);
}

function showSelect1(valor){
    var valor = valor;
    // alert("Ejemplo de alerta con JavaScript" + valor);

    $("#gradoS").text(valor);
    
    $("#select1")
    
        .find("option:contains("+valor+")")
        .prop("selected", true);
} 
function showSelectVal1(valor){
    var valor = valor;
    // alert("Ejemplo de alerta con JavaScript" + valor);
    $("#investigador1S").text(valor); 

    $("#selectVal11")
        .find(`option[value=${valor}]`)
        .prop("selected", true);
} 