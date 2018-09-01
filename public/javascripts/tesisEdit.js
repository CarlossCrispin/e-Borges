function showEliminar(valor){
    var valor = valor;
    $('#eliminar').val(valor);
}
function showID(valor){
    var valor = valor;
    $('#ID').val(valor);  

}

// Tesis
function showPersona(valor){
    var valor = valor; 
    $("#AlumnoS").text(valor);
    
}
function showAlumno2(valor){

    var valor = valor;
    
    // $("#investigador1S").text(valor); 
    $("#alu")
        // .find("option:contains("+valor+")")
        .find(`option[value=${valor}]`)
        .prop("selected", true);
} 
function showTitulo(valor){
    var valor = valor;
    $('#Titulo').val(valor);  
    $("#TituloS").text(valor);
   
    
}  
function showResumen(valor){
    var valor = valor;
    $('#description').val(valor);  
    $('#descriptionS').text(valor);  
}  
function showGrado(valor){
    var valor = valor;
        

    $("#gradoS").text(valor);
    
    $("#grado")
    
        .find("option:contains("+valor+")")
        .prop("selected", true);
} 

function showUnidad(valor){
    var valor = valor;
    $("#unidadS").text(valor);    
    //- $('#grado1').val(valor); 
    $("#unidad")
    
        .find("option:contains("+valor+")")
        .prop("selected", true);
} 
function showDepartamento(valor){
    var valor = valor;
    $("#departamentoS").text(valor);   
    //- $('#grado1').val(valor); 
    
    $("#departamento")
    
    
        .find("option:contains("+valor+")")
        .prop("selected", true);
} 

function showDir1(valor){
    var valor = valor;
    // alert("Ejemplo de alerta con JavaScript" + valor);
    $("#investigador1S").text(valor); 

    $("#investigador1")
        .find(`option[value=${valor}]`)
        .prop("selected", true);
} 
function showNom1(valor){
    var valor = valor;
    // alert("Ejemplo de alerta con JavaScript" + valor);
    $("#investigador1S").text(valor); 
} 
function showDir2(valor){
    var valor = valor;
    
    $("#investigador2")
        .find(`option[value=${valor}]`)
        .prop("selected", true);
} 
function showNom2(valor){
    var valor = valor;
    if(valor ==='null')
    {
        valor ='';

    }
    $("#investigador2S").text(valor); 
   
  
} 
function showDir3(valor){
    var valor = valor;
 
    $("#investigador3")
        .find(`option[value=${valor}]`)
        .prop("selected", true);
} 
function showNom3(valor){
    var valor = valor;
    if(valor ==='null')
    {
        valor ='';

    }
    $("#investigador3S").text(valor); 
 
  
} 
function showDir4(valor){
    var valor = valor;
   
    $("#investigador4")
        .find(`option[value=${valor}]`)
        .prop("selected", true);
} 
function showNom4(valor){
    var valor = valor;
    if(valor ==='null')
    {
        valor ='';

    }
    $("#investigador4S").text(valor); 
    
} 
function showDir5(valor){
    var valor = valor;
    
    $("#investigador5")
        .find(`option[value=${valor}]`)
        .prop("selected", true);
}
function showNom5(valor){
    var valor = valor;
    if(valor ==='null')
    {
        valor ='';

    }
    $("#investigador5S").text(valor); 

  
} 