var email=document.getElementById("email");
var password = document.getElementById("pass");
$("#buttonL").click(function() {
    meetBITS.login(email.value,password.value, (err, res) =>{

    if(res){
        meetBITS.address2mod.call(web3.eth.defaultAccount, (err, res) =>{
            if (res){
            location.href="homeMod.html";
            }
            else {
            location.href="homeUser.html";
            }
        });
    }
    else {
        console.log(res);
        alert("Acceso Denegado");   
    }
})
});