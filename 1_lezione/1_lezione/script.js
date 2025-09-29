document.getElementById('registrationForm').addEventListener('submit', follow);

function follow(event) {
    event.preventDefault(); 

    const nameU = document.getElementById('nomeUtente').value.trim();
    const surname = document.getElementById('cognomeUtente').value.trim();
    const date = document.getElementById('data').value;
    const username = document.getElementById('usernameUtente').value.trim();
    const password = document.getElementById('passwordUtente').value;
    const repeatPassword = document.getElementById('passwordUtente2').value;
    const firstCheckbox = document.getElementById('checkboxPrimo').checked;
    const secondCheckbox = document.getElementById('checkboxSecondo').checked;

    if (!nameU || !surname || !date || !username || !password || !repeatPassword) {
        alert('Compilare tutti i campi!');
        return;
    }

    if (password !== repeatPassword) {
        alert('Le password non corrispondono');
        return;
    }

    if (!firstCheckbox) {
        alert('Devi accettare tutti i termini e condizioni');
        return;
    }

    alert('Registrazione completata con successo!');
}
