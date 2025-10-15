function newIssues() {
  var checkbox = document.getElementById('issue-modal');
  if (checkbox) checkbox.checked = true;
}

let form = document.getElementById('issueForm');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let titolo = document.getElementById('titoloIssue').value;
    let descr = document.getElementById('descrizioneIssue').value;
    let priorita = document.getElementById('prioritaIssue').value;
    let creatore = document.getElementById('creatoreIssue').value;
    let checkbox = document.getElementById('issue-modal');
    if (checkbox) checkbox.checked = false;
    form.reset();
  });
}