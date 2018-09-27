$('body').on('focus',".datepicker", function(){
    $(this).text();
});

$(document).ready(function() {
    var max_fields2      = 3; //maximum input boxes allowed
    var wrapper2         = $(".input_fields_wrap2"); //Fields wrapper2
    var add_button2     = $(".add_field_button2"); //Add button ID
    
    var x = 1; //initlal text box count
    $(add_button2).click(function(e){ //on add input button click
        e.preventDefault();
        if(x < max_fields2){ //max input box allowed
            x++; //text box increment
            $(wrapper2).append(`
                <div class="input-line-control removeMe">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="col-md-3 control-label">Apellido ${x}</label>
                            <div class="col-md-7 inputGroupContainer">
                                <div class="input-group"><span class="input-group-addon"><span class="i fa fa-user"></span></span>
                                    <input class="form-control datepicker" id="apellido" name="apellido${x}" placeholder="Apellido ${x}" type="text" required="required"/>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <button class="btn btn-danger btn-sm remove-date", data-tooltip='Remover'><i class="fa fa-remove"></i> </button>
                            </div>
                        </div>
                    </div>
                </div>`); //add input box
            // $(wrapper2).append(`<div class="input-line-control removeMe">
            // <div class="col-md-8"><div class="form-group">
            // <input type="text" class="form-control datepicker" name=apellido${x} placeholder="Pick the date ${x} ">
            // </div></div><div class="col-md-4"><button class="btn btn-danger remove-date"><i class="fa fa-remove"></i>Remove</button></div></div>`); //add input box
        }
    });
    
    $(wrapper2).on("click",".remove-date", function(e){ //user click on remove text
        e.preventDefault(); $(this).closest('div.removeMe').remove(); x--;
    })
});