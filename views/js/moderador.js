address=document.getElementById("address")
function nombrar_moderador(){
    meetBITS.nombrar_moderador(address.value,(res=>{
        swal({
            title: 'Nuevo Moderador',
            text: 'Haz nombrado un nuevo moderador de la comunidad',
            type: 'success',
            showCancelButton: false,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Ok!',
            // cancelButtonText: false
          })
    }))
}