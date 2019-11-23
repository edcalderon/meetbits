/**
 * Funcion encargada de dibujar una modal con los datos de una votacion
 * @param {*} urnaId Id de la urna de votacion
 */
function showModalVoteDetal(urnaId){

    // Reemplazar los datos del modal segun los datos de la junta

    // Abrimos la modal
    $("#modal1").modal();
    //Success Message
    $('.votebutton').click(function(){

        // Determinar si se Vota si O no
        let type = eval($(this).attr("vote"));

        // Realizar la petición
        if(type)
            vote(type) // votar
                .then((result) => {
                    swal("", "La votacion se ha concretado correctamente.", "success")
                });
        else
            swal("", "No se ha configurado un voto valido", "error")
    });
}

/**
 * Funcion encargada de realizar un voto de una urna para una junta
 * @param {*} vote si o no (true o false)
 */
function vote(vote,IDv,IDjunta){
    return new Promise(function(resolve, reject){

        // Realizar peticion
        meetBITS.enviar_voto(IDjunta, IDv, vote, (err, res) =>{
            if (res){
                resolve(true);
            }
            if(err){
                reject(false)
            }
        });
    })
}

/*
function getMeetingsByUser(){

    return new Promise(function(resolve, reject))
    if(!web3.eth.defaultAccount){
        swal("", "Por favor ingresa al MetaMask para continuar...", "error");
        return false;
    }

    meetBITS.juntas(web3.eth.defaultAccount, (err, res) => {
        if (res){
            resolve(true);
        }
        if(err){
            reject(false)
        }
    })

}
*/



