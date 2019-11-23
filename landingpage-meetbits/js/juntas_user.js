
var juntas;
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
        '<input class="form-control" id="mensaje'+junta[0]+'" type="text" aria-describedby="nameHelp"><br/><button type="button" class="btn waves-effect waves-light btn-info" style="color:#00ff00" onclick="enviar_mensaje('+junta[0]+')"><span class="fas fa-envelope"></span> Enviar </button>',
        '<button type="button" class="btn waves-effect waves-light btn-info" style="color:#00ff00" onclick="actualizar_votaciones('+junta[0]+ ')"><span class="fas fa-envelope"></span> Ver Votaciones </button>',
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

function showQR(juntaID){
    alert(juntaID);
}