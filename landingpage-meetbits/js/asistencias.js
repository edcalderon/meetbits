function actualizar_asistencias(IDjunta){
    console.log("Actualizando votaciones*******************");
    meetBITS.IDj2totalIDVss(IDjunta,(err,n)=>{
        console.log("n:"+n);
        onload.res=iterarIDv(IDjunta, n);
    })
}

function iterarIDv(IDjunta, n){
    console.log("Iterando--------------------------")
    for (i=0;i<n;i++){
        console.log("i:"+i);
        meetBITS.IDj2IDvs(IDjunta,i,(err,IDv)=>{
            onload.IDv=leer_trues(IDjunta,IDv);
        })
    }
}

function leer_trues(IDjunta, IDv){
    meetBITS.IDj_IDv2trues(IDjunta,IDv,(err,trues)=>{
        console.log("trues: "+trues+"**********");
        onload.trues=leer_falses(IDjunta,IDv,trues)
    })
}

function leer_falses(IDjunta,IDv,trues){
    meetBITS.IDj_IDv2falses(IDjunta,IDv,(err,falses)=>{
        console.log("falses: "+falses+"**********");
        onload.falses=leer_temaV(IDjunta,IDv,trues, falses)
    })
}

function leer_temaV(IDjunta,IDv,trues, falses){
    meetBITS.IDv2tema(IDv,(err,temaV)=>{
        console.log("IDv: "+temaV+"**********");
        onload.temaV=imprimir_votacion(IDjunta,IDv,trues, falses, temaV)
    })
}

function imprimir_votacion(IDjunta,IDv,trues, falses, temaV){
    var votaciones = $('#votaciones').DataTable();
    console.log("tema IDv: "+temaV+"**********");
    console.log("Imprimiendo tabla votacion*************");
    total=trues+falses;
    votaciones.row.add( [
        IDjunta,
        temaV,
        trues,
        falses,
        total,
        ] ).draw( false );
}