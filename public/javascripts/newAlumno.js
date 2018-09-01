//recuperar valores iterados
function showEliminar(valor){
  var valor = valor;
  $('#eliminar').val(valor);
}
function showID(valor){
  var valor = valor;
  $('#ID').val(valor);  

}

// Alumno
function showNombre(valor){
  var valor = valor;
  $('#nombre').val(valor);  

}
function showAp1(valor){
  var valor = valor;
  $('#ap1').val(valor);  

}
function showAp2(valor){
  var valor = valor;
  $('#ap2').val(valor);  

}
function showMatricula(valor){
  var valor = valor;
  $('#matricula').val(valor);  

}
function showGrado(valor) {
  var valor = valor;
  $("#gradoS").text(valor);
  $("#grado")
    .find(`option[value=${valor}]`)
    .prop("selected", true);
}
function showDepto(valor) {
  var valor = valor;
  $("#departamentoS").text(valor);
  $("#departamento")
    .find(`option[value=${valor}]`)
    .prop("selected", true);
}
function showGenero(valor) {
  var valor = valor;
  $("#generoS").text(valor);
  $("#genero")
    .find(`option[value=${valor}]`)
    .prop("selected", true);
}