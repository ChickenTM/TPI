const credenziali = JSON.parse(localStorage.getItem("credenziali")) || [];
const form = document.getElementById("loginForm");

if(form){
    form.addEventListener("submit",function(e){
        e.preventDefault();
        let usr = document.getElementById("username").value;
        let pwd = document.getElementById("password").value;
        if( !usr || !pwd ){
            alert("compila tutti i campi");
            return;
        }
        if(controllaCredenzialiInserite(usr,pwd)){
            window.location.href = "board.html";
        }
        else{
            alert("utente non esistente");
        }
    })
}
function controllaCredenzialiInserite(usr, pwd) {
    return credenziali.some(utente => usr === utente.usr && pwd === utente.pwd);
}
