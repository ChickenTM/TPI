function newIssues() {
  var checkbox = document.getElementById('issue-modal');
  if (checkbox) checkbox.checked = true;
}

var form = document.getElementById('issueForm');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var titolo = document.getElementById('titoloIssue').value;
    var descr = document.getElementById('descrizioneIssue').value;
    var priorita = document.getElementById('prioritaIssue').value;
    var creatore = document.getElementById('creatoreIssue').value;
    var checkbox = document.getElementById('issue-modal');
    if (checkbox) checkbox.checked = false;
    form.reset();
  });
}