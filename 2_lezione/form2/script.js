const form = document.getElementById("form");
const btnAggiungi = document.getElementById("btn-aggiungi");
const btnRimuovi = document.getElementById("btn-rimuovi");
const tableBody = document.querySelector("#tabellaPersone tbody");

let people = JSON.parse(localStorage.getItem("people")) || [];
aggiornaTabella();
//aggiungi persona
btnAggiungi.addEventListener("click", () => {
    const name = document.getElementById("nome").value.trim()
    const surname = document.getElementById("cognome").value.trim()
    const email = document.getElementById("email").value.trim()
    const dob = document.getElementById("data").value.trim()

    if (!name || !surname || !email || !dob) {
        alert("compila tutti i campi");
        return;
    }
    const person = { name, surname, email, dob };
    people.push(person);
    salvaInLocalStorage();
    aggiornaTabella()
    form.reset();
});

function aggiornaTabella() {
    tableBody.innerHTML = "";
    people.forEach((person, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${person.name}</td>
            <td>${person.surname}</td>
            <td>${person.email}</td>
            <td>${person.dob}</td>
            <td><button onclick="rimuoviSingolaPersona(${index})">Rimuovi</button></td>
    `;
        tableBody.appendChild(row);
    });
}

//rimuovi singola persona
function rimuoviSingolaPersona(index){
    people.splice(index,1);
    salvaInLocalStorage();
    aggiornaTabella();
}

function salvaInLocalStorage(){
    localStorage.setItem("people",JSON.stringify(people));
}

btnRimuovi.addEventListener("click", () =>{
    people=[];
    //salvaInLocalStorage();
    localStorage.removeItem("people");
    aggiornaTabella();
})