const form = document.getElementById("registrationForm");
form.addEventListener("submit",function(event){
    event.preventDefault(); 
    let nome = document.getElementById("nomeUtente").value.trim();
    let email = document.getElementById("email").value.trim();
    let data = document.getElementById("data").value;
    let ora = document.getElementById("ora").value;
    let messaggio = document.getElementById("messaggio").value.trim();
    let opzione = document.getElementById("opzione").checked ? "Si" : "No";

    let riepilogo = `<h1>Riepilo del Feedback</h1>
            <h2>${nome}</h2>
            <h2>${email}</h2>
            <h2>${data}</h2>
            <h2>${ora}</h2>
            <h2>${messaggio}</h2>
            <h2>${opzione}</h2>
            `;
    document.getElementById("riepilogo").innerHTML=riepilogo;
});

