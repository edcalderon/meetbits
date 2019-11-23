function actualizar_juntas(){
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
    var juntas = $('#juntas').DataTable();
    console.log("asistentes: "+asistentes);
    juntas.row.add( [
        junta[0],
        junta[1],
        junta[2],
        junta[3],
        asistentes,
        ] ).draw( false );
}