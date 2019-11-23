var nombre=document.getElementById("nombre");
var email=document.getElementById("email");
var password = document.getElementById("pass");
var confirm_password = document.getElementById("cpass");
var id = document.getElementById("id");


/**
 * Evento guardar 
 */
$("#btnSave").click(function() {

    meetBITS.crear_junta(
        nombre.value,
        id.value,
        email.value,
        password.value,
        (err, res) => {

            if (res){
                console.log("login Exitoso");
            }

            if(err){
                console.log('oh no');
            }
        } 
    );
});