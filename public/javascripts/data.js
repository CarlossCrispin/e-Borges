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
function showText3(valor) {
    var valor = valor;
    $('#val3').val(valor);
    $("#text3").text(valor);
}
function showText4(valor) {
    var valor = valor;
    $('#val4').val(valor);
    $("#text4").text(valor);
}
function showText5(valor) {
    var valor = valor;
    $('#val5').val(valor);
    $("#text5").text(valor);
}
function showText6(valor) {
    var valor = valor;
    $('#val6').val(valor);
    $("#text6").text(valor);
}
function showText7(valor) {
    var valor = valor;
    $('#val7').val(valor);
    $("#text7").text(valor);
}
function showText8(valor) {
    var valor = valor;
    $('#val8').val(valor);
    $("#text8").text(valor);
}
function showText9(valor) {
    var valor = valor;
    $('#val9').val(valor);
    $("#text9").text(valor);
}
function showText10(valor) {
    var valor = valor;
    $('#val10').val(valor);
    $("#text10").text(valor);
}
function showSelect1(valor){
    var valor = valor;

    $("#selecText1").text(valor);
    
    $("#select1")
    
        .find("option:contains("+valor+")")
        .prop("selected", true);
} 
function showSelect2(valor){
    var valor = valor;
    $("#selecText2").text(valor);
    
    $("#select2")
    
        .find("option:contains("+valor+")")
        .prop("selected", true);
} 
function showSelect3(valor){
    var valor = valor;

    $("#selecText3").text(valor);
    
    $("#select3")
    
        .find("option:contains("+valor+")")
        .prop("selected", true);
} 

function showSelectVal1(valor){
    var valor = valor;
    // alert("Ejemplo de alerta con JavaScript--->" + valor);
    $("#textVal1").text(valor); 

    $("#selectVal1")
        .find(`option[value=${valor}]`)
        .prop("selected", true);
} 
function showSelectVal2(valor){
    var valor = valor;
    $("#textVal2").text(valor); 

    $("#selectVal2")
        .find(`option[value=${valor}]`)
        .prop("selected", true);
} 
function showSelectVal3(valor){
    var valor = valor;
    // alert("Ejemplo de alerta con JavaScript--->" + valor);
    $("#textVal3").text(valor); 

    $("#selectVal3")
        .find(`option[value=${valor}]`)
        .prop("selected", true);
} 