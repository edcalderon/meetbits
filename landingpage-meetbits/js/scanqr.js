var juntas = $('#juntas').DataTable();
$('#juntas').on('click', 'tbody tr', function() {
    datos_fila=juntas.row(this).data();
    console.log("APISDSD");
    console.log(datos_fila[0].c[0]+"¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨jklnhuihuihuihuih");
    // IDjunta=parseInt(datos_fila[0]._hex);
    IDjunta=datos_fila[0].c[0];
    scan(IDjunta);
    console.log("IDjunta:"+IDjunta);
    console.log('API row values : ', juntas.row(this).data());
});

function scan(IDjunta){
  let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
      
      scanner.addListener('scan', function (content) {
        swal({
            title: 'QR Escaneado',
            text: 'Haz escaneado una nueva asistencia de la dirección:'+content+'. Desea regitrarla?',
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'SI',
            cancelButtonText: 'NO',
            // cancelButtonText: false
        }).then((isConfirm) => {

            if (isConfirm) {
                registrar_asistencia(IDjunta, content);
            } else {
            // result.dismiss can be 'cancel', 'overlay', 'esc' or 'timer'
            }
        });
      });

      Instascan.Camera.getCameras().then(function (cameras) {

      if (cameras.length > 0) {

          scanner.start(cameras[0]);

      } else {

          console.error('No cameras found.');

      }

      }).catch(function (e) {

      console.error(e);

      });
}

function registrar_asistencia(IDjunta,content){ 
    console.log("content: "+content);
    console.log("IDjunta: "+IDjunta);
    meetBITS.registrar_asistencia(content,IDjunta,(res =>{
        swal({
            title: 'Asistencia Registrada',
            text: 'Haz registrado la asistencia de la dirección:'+content+'con exito, ya puede enviar mensaje o participar de las votaciones',
            type: 'success',
            showCancelButton: false,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'OK',
            // cancelButtonText: false
          }).then((isConfirm) => {

            if (isConfirm) {
                actualizar_asistencias(IDjunta, content);
            } else {
              // result.dismiss can be 'cancel', 'overlay', 'esc' or 'timer'
            }
          });
    }))
}