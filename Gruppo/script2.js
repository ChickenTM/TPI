const credenziali = JSON.parse(localStorage.getItem("credenziali")) || [];
const formConferma = document.getElementById("createForm");

if (formConferma){
    formConferma.addEventListener("submit",function(e){
        e.preventDefault();
        let usr=document.getElementById("username").value;
        let pwd=document.getElementById("password").value;
        let confermaPwd=document.getElementById("confermaPassword").value;
        if( !usr || !pwd || !confermaPwd){
            alert("compila tutti i campi");
            return;
        }
        if(controllaCredenziali(usr,pwd,confermaPwd)){
            let utente = {usr,pwd};
            credenziali.push(utente);
            salvaInLocalStorage();
            localStorage.setItem("utenteAttivo", usr);
            window.location.href = "board.html";
        }
        else{
            alert("Nome utente già esistente oppure password non corrispondenti");
        }
    })
}
function controllaCredenziali(usr, pwd,confermaPwd){
    if(pwd !== confermaPwd){
        return false;
    }
    return !credenziali.some((utente) => utente.usr === usr);
}
function salvaInLocalStorage(){
    localStorage.setItem("credenziali", JSON.stringify(credenziali));
}