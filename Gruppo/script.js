const form = document.getElementById('issueForm');
const issues = JSON.parse(localStorage.getItem("issues")) || [];
const kanbanBacklog = document.querySelector("#issue-backlog");
const kanbanProgress = document.querySelector('#issue-progress');
const kanbanReview = document.querySelector("#issue-review");
const kanbanDone = document.querySelector("#issue-done");
let utenteAttivo = localStorage.getItem("utenteAttivo") || "Anonimo";
aggiornaKanbanBoard();
aggiornaCounter();
function newIssues() {
  let checkbox = document.getElementById('issue-modal');
  if (checkbox) checkbox.checked = true;
}

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let titolo = document.getElementById('titoloIssue').value;
    let descr = document.getElementById('descrizioneIssue').value;
    let priorita = document.getElementById('prioritaIssue').value;
    let tipologia = document.getElementById('tipoIssue').value;
    let incaricato = document.getElementById('incaricatoIssue').value;
    let checkbox = document.getElementById('issue-modal');
  

    if (checkbox) checkbox.checked = false;
    if (!titolo || !descr || !priorita || !tipologia || !incaricato) {
      alert("compila tutti i campi");
      return;
    }
    let issue = { titolo, descr, priorita, tipologia, incaricato, utenteAttivo };
    issues.push(issue);
    salvaInLocalStorage();
    aggiornaKanbanBoard();
    form.reset();
  });
}


function salvaInLocalStorage() {
  localStorage.setItem("issues", JSON.stringify(issues))
}

function aggiornaKanbanBoard() {
  kanbanBacklog.innerHTML = "Backlog <br>";
  kanbanProgress.innerHTML = "In Progress <br>";
  kanbanReview.innerHTML = "Review <br>";
  kanbanDone.innerHTML = "Done <br>";
  const issuesUtente = issues.filter(issue => issue.utenteAttivo === utenteAttivo);
  const counts = { backlog: 0, inProgress: 0, review: 0, done: 0 };

  issuesUtente.forEach((issue, index) => {
    const card = document.createElement("div");
    card.className = "card bg-base-100 shadow-md p-3 border border-gray-200 hover:shadow-lg transition w-full max-w-sm mx-auto mb-4";

    let prioritaColor = "";
    if (issue.priorita === "alta") prioritaColor = "bg-red-200 text-red-700";
    else if (issue.priorita === "media") prioritaColor = "bg-yellow-200 text-yellow-700";
    else prioritaColor = "bg-green-200 text-green-700";

    card.innerHTML = `
      <div class="card-body p-3 gap-2">
        <div class="flex justify-between items-center">
          <h3 class="font-bold text-md">${issue.titolo}</h3>
          <span class="badge ${prioritaColor} font-semibold capitalize">${issue.priorita}</span>
        </div>
        <p class="text-sm text-gray-600">${issue.descr}</p>
        <div class="flex gap-2 mt-3 w-full">
          <span class="badge bg-gray-200 text-gray-700">${issue.incaricato}</span>     
          <button onclick="spostaIssue(${index})"
            class="btn btn-xs btn-outline btn-primary flex-1">Sposta</button>
          <button onclick="rimuoviIssue(${index})"
            class="btn btn-xs btn-outline btn-error flex-1">Elimina</button>
        </div>
      </div>
    `;
    if (issue.tipologia === "backlog") {
      kanbanBacklog.appendChild(card);
      counts.backlog++;
    } else if (issue.tipologia === "inProgress") {
      kanbanProgress.appendChild(card);
      counts.inProgress++;
    } else if (issue.tipologia === "review") {
      kanbanReview.appendChild(card);
      counts.review++;
    } else {
      kanbanDone.appendChild(card);
      counts.done++;
    }
  });

  aggiornaCounter(counts);
}

function spostaIssue(indexVisibile) {
  const issuesUtente = issues.filter(issue => issue.utenteAttivo === utenteAttivo);
  const issueVisibile = issuesUtente[indexVisibile];

  const indexReale = issues.findIndex(i => 
    i.titolo === issueVisibile.titolo &&
    i.descr === issueVisibile.descr && 
    i.priorita === issueVisibile.priorita &&
    i.tipologia === issueVisibile.tipologia &&
    i.incaricato === issueVisibile.incaricato &&
    i.utenteAttivo === utenteAttivo
  );

  const issue = issues[indexReale];
  if (issue.tipologia === "backlog") issue.tipologia = "inProgress";
  else if (issue.tipologia === "inProgress") issue.tipologia = "review";
  else if (issue.tipologia === "review") issue.tipologia = "done";
  else issue.tipologia = "backlog";

  salvaInLocalStorage();
  aggiornaKanbanBoard();
}

function rimuoviIssue(indexVisibile) {
  const utenteAttivo = localStorage.getItem("utenteAttivo") || "Anonimo";
  const issuesUtente = issues.filter(issue => issue.utenteAttivo === utenteAttivo);
  const issueVisibile = issuesUtente[indexVisibile];

  const indexReale = issues.findIndex(i => 
    i.titolo === issueVisibile.titolo && 
    i.descr === issueVisibile.descr &&
    i.priorita === issueVisibile.priorita &&
    i.tipologia === issueVisibile.tipologia &&
    i.incaricato === issueVisibile.incaricato &&
    i.utenteAttivo === utenteAttivo
  );

  if (indexReale !== -1) {
    issues.splice(indexReale, 1);
    salvaInLocalStorage();
    aggiornaKanbanBoard();
  }
}

function aggiornaCounter(counts = null) {
  if (!counts) {
    counts = { backlog: 0, inProgress: 0, review: 0, done: 0 };
    const issuesUtente = issues.filter(issue => issue.utenteAttivo === utenteAttivo);

    issuesUtente.forEach(issue => {
      if (issue.tipologia === "backlog") counts.backlog++;
      else if (issue.tipologia === "inProgress") counts.inProgress++;
      else if (issue.tipologia === "review") counts.review++;
      else counts.done++;
    });
  }

  const cBack = document.querySelector('#issue-counter-backlog');
  const cProg = document.querySelector('#issue-counter-progress');
  const cRev = document.querySelector('#issue-counter-review');
  const cDone = document.querySelector('#issue-counter-done');

  if (cBack) cBack.innerText = `backlog: ${counts.backlog}`;
  if (cProg) cProg.innerText = `in Progress: ${counts.inProgress}`;
  if (cRev) cRev.innerText = `review: ${counts.review}`;
  if (cDone) cDone.innerText = `done: ${counts.done}`;
}
