const credenziali = JSON.parse(localStorage.getItem("credeneziali")) || [];
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
        if(pwd===confermaPwd){
            let utente = {usr,pwd};
            credenziali.push(utente);
            salvaInLocalStorage()
            window.location.href = "board.html";
        }
    })
}
function salvaInLocalStorage(){
    localStorage.setItem("credenziali", JSON.stringify(credenziali));
}