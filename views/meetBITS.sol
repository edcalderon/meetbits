pragma solidity ^0.5.0;
/** @title Talk and Code * */
import "./userBITS.sol";
//Creación del contrato
contract meetBITS is userBITS {    //Definimos el nombre del contrato
    uint public IDj ;
    uint public IDv;
    uint public IDm;
    uint public IDvu;
// Creamos una estrcutura donde definimos los datos que debemos almacenar de un asistente
    struct junta {           //Definimos el nombre de la estructura
        uint IDjr;
        string lugar;
        string tema;
        uint capacidad;
    }
    struct mensaje {
        string texto;
        address remitente;
    }
    
    junta[] public juntas;
    
    mapping (address => uint) public saldo;
    mapping (address => bool) public address2mod;
    mapping (address => junta[]) public address_mod2juntas_creadas;
    mapping (address => junta[]) public address2juntas;
    mapping (uint => address) public IDj2moderador;
    mapping (uint => address[]) public IDj2asistentes;
    mapping (uint => uint) public IDj2total_asistentes;
    mapping (uint => bool) public IDj2estado;
    mapping (uint => mapping (address => bool)) public IDj_user2estado;
    mapping (uint => mapping (address => mapping(uint => bool))) public IDj_user_IDv2estado_voto;
    mapping (uint => mapping(address => bool)) public IDj_user2estado_mensaje;
    mapping (uint => mensaje[]) public IDj2mensajes;
    mapping (uint => uint[]) public IDj2IDvs;
    mapping (uint => uint) public IDj2totalIDVss;
    mapping (uint => string) public IDv2tema; 
    mapping (uint => mapping (uint=>uint)) public IDj_IDv2trues;
    mapping (uint => mapping (uint=>uint)) public IDj_IDv2falses;
    
        
    function nombrar_moderador (address _mod_address) public onlyOwner{
        require(address2estado[_mod_address],"Dirección no esta inscrita en el contrato");
        address2mod[_mod_address]=true;
    }
    function crear_junta (string memory _lugar, string memory _tema, uint _capacidad) public {
        require(address2mod[msg.sender], "Debes ser un moderador para poder crear una junta");
        juntas.push(junta(IDj,_lugar, _tema, _capacidad));
        IDj2estado[IDj]=true;
        IDj2moderador[IDj]=msg.sender;
        IDj++;
    }
    function terminar_junta (uint _IDj) public {
        require(IDj2moderador[_IDj]==msg.sender, "Solo el moderador de la junta puede registrar asistentes");
        IDj2estado[_IDj]=false;
    }
    function registrar_asistencia (address _asistente, uint _IDj) public {
        require(IDj2moderador[_IDj]==msg.sender, "Solo el moderador de la junta puede registrar asistentes");
        require(IDj2estado[_IDj], "La junta ya finalizo");
        IDj2asistentes[_IDj].push(_asistente);
        IDj2total_asistentes[_IDj]++;
        IDj_user2estado[_IDj][_asistente]=true;
        saldo[_asistente]++;
    }
    function enviar_mensaje (string memory _mensaje, uint _IDj) public{
        require(address2estado[msg.sender],"Debes estar registrado para enviar mensajes");
        require(IDj_user2estado[_IDj][msg.sender], "Debes asistir primero para votar");
        require(IDj2estado[_IDj], "La junta ya finalizo");
        require(IDj_user2estado_mensaje[_IDj][msg.sender]==false, "Ya enviaste un mensaje en esta junta");
        IDj2mensajes[_IDj].push(mensaje(_mensaje,msg.sender));
        IDj_user2estado_mensaje[_IDj][msg.sender]==true;
        saldo[msg.sender]++;
        IDm++;
    }
    function crear_votacion (uint _IDj, string memory _tema) public {
        require(address2mod[msg.sender], "Debes ser un moderador para poder crear una votacion");
        IDj2IDvs[_IDj].push(IDv);
        IDv2tema[IDv]=_tema;
        IDj2totalIDVss[_IDj]++;
        IDv++;
    }
    function enviar_voto (uint _IDj, uint _IDv, bool _voto) public{
        require(address2estado[msg.sender],"Debes estar registrado para enviar mensajes");
        require(IDj_user2estado[_IDj][msg.sender], "Debes asistir primero para votar");
        require(IDj2estado[_IDj], "La junta ya finalizo");
        require(IDj_user_IDv2estado_voto[_IDj][msg.sender][_IDv]==false,"No puedes votar mas de una vez en la misma votación");
        saldo[msg.sender]++;
        if (_voto) {
            IDj_IDv2trues[_IDj][_IDv]++;
        }
        else {
            IDj_IDv2trues[_IDj][_IDv]++;
        }
        IDvu++;
    }
}