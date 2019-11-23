IDjunta=document.getElementById("IDjunta");
temaV=document.getElementById("temaV");
function crear_votacion(){
    meetBITS.crear_votacion(IDjunta.value,temaV.value,(res=>{
        swal({
            title: 'Nueva Votación',
            text: 'Haz creado una nueva votación para la comunidad',
            type: 'success',
            showCancelButton: false,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Ok!',
            // cancelButtonText: false
          })
    }))
}