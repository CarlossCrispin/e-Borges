
function showEliminar(valor){
    var valor = valor;
    
    // $('#modal-create-thanks-you').modal('show');
    //- alert("Ejemplo de alerta con JavaScript" + valor);
    //texto agregado
    $('#eliminar').val(valor);
    
    //- var id=$('#val1').val(valor);
    //- var Id=document.getElementById(valor).val();
}
function showID(valor){
    var valor = valor;
    $('#ID').val(valor);  

}

function showTitulo(valor){
    var valor = valor;
    $('#Titulo').val(valor);  
}  
function showResumen(valor){
    var valor = valor;
    $('#description').val(valor);  
}  
function showGrado(valor){
    var valor = valor;
        
    //- $('#grado1').val(valor); 
    $("#grado")
    
        .find("option:contains("+valor+")")
        .prop("selected", true);
} 
function showGrado(valor){
    var valor = valor;
        
    //- $('#grado1').val(valor); 
    $("#grado")
    
        .find("option:contains("+valor+")")
        .prop("selected", true);
} 
function showUnidad(valor){
    var valor = valor;
        
    //- $('#grado1').val(valor); 
    $("#unidad")
    
        .find("option:contains("+valor+")")
        .prop("selected", true);
} 
function showDepartamento(valor){
    var valor = valor;
        
    //- $('#grado1').val(valor); 
    $("#departamento")
    
    
        .find("option:contains("+valor+")")
        .prop("selected", true);
} 
function showDir1(valor){
    var valor = valor;
    $("#investigador1")
        .find(`option[value=${valor}]`)
        .prop("selected", true);
} 
function showDir2(valor){
    var valor = valor;
    $("#investigador2")
        .find(`option[value=${valor}]`)
        .prop("selected", true);
} 
function showDir3(valor){
    var valor = valor;
    $("#investigador3")
        .find(`option[value=${valor}]`)
        .prop("selected", true);
} 
function showDir4(valor){
    var valor = valor;
    $("#investigador4")
        .find(`option[value=${valor}]`)
        .prop("selected", true);
} 
function showDir5(valor){
    var valor = valor;
    $("#investigador5")
        .find(`option[value=${valor}]`)
        .prop("selected", true);
}