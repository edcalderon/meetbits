
var juntas;
var scanner;
/*
function getMeeting(){
    return new Priomise(function(resolve, reject){
        console.log("Actualizando Juntas(getMeeting)*******************");
        // Realizar peticion
        meetBITS.IDj((err, meetings) => {
            console.log("Recorriendo junta (Meeting): " + meeting);

            if(meeting.length > 0){
                meeting.forEach(element => {
                    
                });
            }
            else{
                console.log("No se obtuvieron Juntas");
            }
            onload.res = iterar(meeting);
        })
    });
}*/


function actualizar_juntas(){
    debugger;
    console.log("Actualizando Juntas*******************");
    meetBITS.IDj((err,n)=>{
        console.log("n:"+n);
        onload.res=iterar(n);
    })
}

function iterar(n){
    console.log("Iterando--------------------------")
    for (i=0;i<n;i++){
        console.log("i:"+i);
        meetBITS.juntas(i,(err,junta)=>{
            onload.junta=leer_asistentes(junta);
        })
    }
}

function leer_asistentes(junta){
    meetBITS.IDj2total_asistentes(junta[0],(err,asistentes)=>{
        console.log("Idj: "+junta[0]+"**********");
        onload.asistentes=imprimir_fila(junta,asistentes)
    })
}


function imprimir_fila(junta,asistentes){
    
    if(!juntas)
        juntas = $('#juntas').DataTable();

    console.log("asistentes: " + asistentes);
    juntas.row.add( [
        junta[0],
        junta[1],
        junta[2],
        junta[3],
        asistentes,
        '<button type="button" class="btn waves-effect waves-light btn-info" onclick="showQR(' + junta[0] + ')"><span class="fas fa-qrcode"></span> QR</button>',
    ]).draw(false);

    /*
        juntas')
        .append(
            $("<tr></tr>")
                .append(
                    $("<td></td>")
                        .text(junta[0])
                )
                .append(
                    $("<td></td>")
                        .text(junta[1])
                )
                .append(
                    $("<td></td>")
                        .text(junta[2])
                )
                .append(
                    $("<td></td>")
                        .text(junta[3])
                )
                .append(
                    $("<td></td>")
                        .text(asistentes)
                )
                .append(
                    $("<td></td>")
                        .html('<button type="button" class="btn waves-effect waves-light btn-danger" onclick="showQR(' + junta[0] + ')">Ver QR</button>')
                )
        )
    */

}

$("#modal1").on('hidden.bs.modal', function () {
    try {
        scanner.stop();    
    } catch (err) {
    }
});

function showQR(juntaID){
    $("#modal1").modal();
    scan(juntaID);
}



function scan(IDjunta){
    scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
        
        scanner.addListener('scan', function (content) {
            //alert(content);
            swal({
                title: 'QR Escaneado',
                text: 'Haz escaneado una nueva asistencia de la dirección:' + content + '. Desea regitrarla?',
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
                        debugger;
                        // result.dismiss can be 'cancel', 'overlay', 'esc' or 'timer'
                    }
                });
        });
        
        // Mostrar camara
        Instascan.Camera.getCameras().then(function (cameras) {
            if (cameras.length > 0) {
                scanner.start(cameras[0]);
            } else {
                console.error('No cameras found.');
            }
        })
        .catch(function (e) {
            console.error(e);
        });
  }

  function registrar_asistencia(IDjunta,content){ 
    console.log("content: "+content);
    console.log("IDjunta: "+IDjunta);
    meetBITS.registrar_asistencia(content, IDjunta,(res) =>{
        debugger;
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
    })
}