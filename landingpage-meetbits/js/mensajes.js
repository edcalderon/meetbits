function enviar_mensaje(IDjunta){
    mensaje=document.getElementById('mensaje'+IDjunta);
    swal({
        title: 'Estas enviando tu mensaje a la junta',
        html: 'Estas seguro que quieres enviar el siguiente mensaje:<br/>'+mensaje.value+'<br/>Recuerde que solo puede escribir un mensaje por junta',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Enviar',
        cancelButtonText: 'Cancelar',
        // cancelButtonText: false
      }).then((isConfirm) => {
        if (isConfirm) {
            meetBITS.enviar_mensaje(mensaje,IDjunta,(err,res=>{
                swal({
                    title: 'No puedes enviar este mensaje',
                    text: 'Solo puedes enviar un mensaje por junta y tu mensaje ya fue registrado',
                    type: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Ok',
                    // cancelButtonText: false
                    })
            }))
          // handle Confirm button click
        } else {
          // result.dismiss can be 'cancel', 'overlay', 'esc' or 'timer'
        }
      });
}