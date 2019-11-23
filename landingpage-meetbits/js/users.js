function actualizar_usuarios(){
    console.log("Actualizando Usuarios*******************");
    meetBITS.IDu((err,n)=>{
        console.log("n:"+n);
        onload.res=iterar(n);
    })
}

function iterar(n){
    console.log("Iterando--------------------------")
    for (i=0;i<=n;i++){
        console.log("i:"+i);
        meetBITS.usuarios(i,(err,user)=>{
            onload.user=leer_rol(user);
        })
    }
}

function leer_rol(user){
    meetBITS.address2mod(user[3],(err,rol)=>{
        console.log("rol: "+rol+"**********");
        onload.rol=leer_saldo(user,rol)
    })
}

function leer_saldo(user, rol){
    meetBITS.saldo(user[3],(err,saldo)=>{
        onload.saldo=imprimir_fila(user,rol, saldo)
    })
}

function imprimir_fila(user,rol, saldo){
    var usuarios = $('#usuarios').DataTable();
    console.log("rol: "+rol);
    if(rol){
        rolT="Moderador";
    }
    else {
        rolT="Participante";
    }
    usuarios.row.add( [
        user[0],
        user[1],
        user[2],
        user[3],
        saldo,
        rolT,
        ] ).draw( false );
}