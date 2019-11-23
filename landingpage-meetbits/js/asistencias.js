function actualizar_asistencias(IDjunta){
    console.log("Actualizando asistencias*******************");
    meetBITS.IDj2total_asistentes(IDjunta,(err,n)=>{
        console.log("n:"+n);
        onload.res=iterar_asistentes(IDjunta, n);
    })
}

function iterar_asistentes(IDjunta, n){
    console.log("Iterando asistencias--------------------------")
    for (i=0;i<n;i++){
        console.log("i:"+i);
        meetBITS.IDj2asistentes(IDjunta,i,(err,asistente_address)=>{
            onload.asistente_address=imprimir_asistencia(asistente_address);
        })
    }
}

function imprimir_asistencia(asistente_address){
    var asistentes = $('#asistentes').DataTable();
    console.log("address: "+asistente_address+"**********");
    console.log("Imprimiendo tabla asistente*************");
    asistentes.row.add( [
        asistente_address,
        ] ).draw( false );
}