lugar=document.getElementById("lugar");
tema=document.getElementById("tema");
capacidad=document.getElementById("capacidad");
function crear_junta(){
    meetBITS.crear_junta(lugar.value,tema.value,capacidad.value,(res=>{
        swal({
            title: 'Nueva Junta',
            text: 'Haz creado una nueva junta para la comunidad',
            type: 'success',
            showCancelButton: false,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Ok!',
            // cancelButtonText: false
          })
    }))
}