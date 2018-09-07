$('body').on('focus',".datepicker", function(){
    $(this).text();
});

$(document).ready(function() {
    var max_fields      = 3; //maximum input boxes allowed
    var wrapper         = $(".input_fields_wrap"); //Fields wrapper
    var add_button      = $(".add_field_button"); //Add button ID
    
    var x = 1; //initlal text box count
    $(add_button).click(function(e){ //on add input button click
        e.preventDefault();
        if(x < max_fields){ //max input box allowed
            x++; //text box increment
            $(wrapper).append(`
                <div class="input-line-control removeMe">
                    <div class="col-md-12">
                        <div class="form-group">
                            <div class="form-group">
                                <label class="col-md-2 control-label">Nombre ${x}</label>
                                <div class="col-md-8 inputGroupContainer">
                                    <div class="input-group"><span class="input-group-addon"><span class="i fa fa-user"></span></span>
                                        <input class="form-control datepicker" id="nombre" name="nombre${x}" placeholder="Nombre ${x}" type="text" required="required"/>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <button class="btn btn-danger btn-sm remove-date" ><i class="fa fa-remove"></i> Remover</button>
                            </div>
                        </div>
                    </div>
                </div>`); //add input box
            // $(wrapper).append(`<div class="input-line-control removeMe">
            // <div class="col-md-8"><div class="form-group">
            // <input type="text" class="form-control datepicker" name=nombre${x} placeholder="Pick the date ${x} ">
            // </div></div><div class="col-md-4"><button class="btn btn-danger remove-date"><i class="fa fa-remove"></i>Remove</button></div></div>`); //add input box
        }
    });
    
    $(wrapper).on("click",".remove-date", function(e){ //user click on remove text
        e.preventDefault(); $(this).closest('div.removeMe').remove(); x--;
    })
});