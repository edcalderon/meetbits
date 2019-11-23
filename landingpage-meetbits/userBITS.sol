pragma solidity ^0.5.0;
/** @title Talk and Code * */
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/ownership/Ownable.sol";
//Creación del contrato
contract userBITS is Ownable {    //Definimos el nombre del contrato
    uint public IDu;
    
    struct usuario {
        string nombre;
        string id;
        string email;
        address owner;
    }
    
    usuario[] public usuarios; 
    mapping (address => bool) public address2estado;
    mapping (uint => address) public IDu2address;
    mapping (address => uint) address2IDu;
    mapping (address => bytes32) address2hash_pass;
    mapping (address => string) address2email;
    
    function nuevo_usuario(string memory _nombre, string memory _id, string memory _email,string memory _pass) public {
        usuarios.push(usuario(_nombre,_id,_email,msg.sender));
        address2hash_pass[msg.sender]=keccak256(abi.encodePacked(_pass));
        address2IDu[msg.sender]=IDu;
        address2email[msg.sender]=_email;
        address2estado[msg.sender]=true;
        IDu+=1;
    }
    function address_data () public view returns (string memory _nombre, string memory _id, string memory _email) {
        return(usuarios[address2IDu[msg.sender]].nombre,usuarios[address2IDu[msg.sender]].id, usuarios[address2IDu[msg.sender]].email);
    }
    function address_data_admin (address _address) public view onlyOwner returns (string memory _nombre, string memory _id, string memory _email) {
        return(usuarios[address2IDu[_address]].nombre,usuarios[address2IDu[_address]].id, usuarios[address2IDu[_address]].email);
    }
    function login (string memory _email, string memory _pass) public view returns(bool){
        require(address2estado[msg.sender],"Esta clave publica no se encuentra registrada");
        require(address2hash_pass[msg.sender]==keccak256(abi.encodePacked(_pass)), "Contraseña incorrecta");
        require(keccak256(abi.encodePacked(address2email[msg.sender]))==keccak256(abi.encodePacked(_email)));
        return (true);
    }
    function cambiar_pass (string memory _old_pass, string memory _nuevo_pass) public {
        require(address2estado[msg.sender],"Esta clave publica no se encuentra registrada");
        require(address2hash_pass[msg.sender]==keccak256(abi.encodePacked(_old_pass)), "Contraseña incorrecta");
        address2hash_pass[msg.sender]=keccak256(abi.encodePacked(_nuevo_pass));
    }
}