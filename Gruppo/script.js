function newIssues() {
    // Mostra il modal quando si clicca il bottone
    document.getElementById("myModal").style.display = "block";
}

// Gestione semplice del submit del form
var form = document.getElementById("issueForm");
if (form) {
    form.onsubmit = function(e) {
        e.preventDefault();
        alert(
            "Titolo: " + document.getElementById("issueTitle").value +
            "\nDescrizione: " + document.getElementById("issueDesc").value +
            "\nPriorità: " + document.getElementById("issuePriority").value +
            "\nAutore: " + document.getElementById("issueAuthor").value
        );
        document.getElementById("myModal").style.display = "none";
        form.reset();
    };
}

// Chiudi il modal quando si clicca sulla X
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    document.getElementById("myModal").style.display = "none";
}

// Chiudi il modal quando si clicca fuori dal contenuto del modal
window.onclick = function(event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

