// ON LOAD
window.addEventListener('load', function() {


  localStorage.setItem("utentes", '["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]');
  localStorage.setItem("1", '["Guilherme Marques","23","2021-04-06","2021-04-20","912343211","Cascais",""]');
  localStorage.setItem("2", '["Alzira dos Santos","73","2021-03-21","2021-04-10","912222211","Lisboa",""]');
  localStorage.setItem("3", '["Nuno Santos","36","2021-04-13","2021-04-26","912555211","Lisboa",""]');
  localStorage.setItem("4", '["Alfredo Dias","54","2021-05-15","2021-05-30","912888211","Sintra",""]');
  localStorage.setItem("5", '["Duarte Mendes","84","2021-06-19","2021-06-30","912888211","Sintra",""]');
  localStorage.setItem("6", '["Rita Gonçalves","29","2021-04-21","2021-04-30","912888211","Lisboa",""]');
  localStorage.setItem("7", '["Francisca Pinto","31","2021-04-13","2021-04-23","912888211","Oeiras",""]');
  localStorage.setItem("8", '["Ana Ribeiro","45","2021-04-11","2021-04-19","912888211","Cascais",""]');
  localStorage.setItem("9", '["Helena Pires","56","2021-04-10","2021-04-20","912888211","Cascais",""]');
  localStorage.setItem("10", '["João Lourenço","62","2021-04-19","2021-04-23","912888211","Sintra",""]');


  let buttons = document.querySelectorAll('span[data-panel]');
  const loginBut = document.getElementById('log');

  showPanel('login');

  buttons.forEach(el => {
    el.addEventListener('click', () => {
      showPanel(el.dataset.panel)
    })
  })

  loginBut.addEventListener('click', () => {
    showPanel('lMun')
  })




  localStorage.setItem("active", "lMun");

  var days = document.getElementById("agenda").getElementsByClassName("days")[0].getElementsByTagName("li");
  for(i = 0; i < days.length; i++){
    days[i].onclick = clickDay;
  }
  const navBar = document.getElementsByTagName("nav")[0];
  const appFull = document.getElementById("app");
  navBar.style.display = 'none';
  appFull.style.gridTemplateAreas = '"head head" "main main"';



});

function showPanel(id) {
  const navBar = document.getElementsByTagName("nav")[0];
  const appFull = document.getElementById("app");
  let buttons = document.querySelectorAll('span[data-panel]');

  buttons.forEach(el => {
    if(el.dataset.panel === id){
      el.parentNode.classList.add("active");
    }else{
      el.parentNode.classList.remove("active");
    }
  })

  localStorage.setItem("active", id);
  document.querySelectorAll('.panel').forEach(el => {
    if (el.id === id) {
      if(id === "profile"){
        changeTitle("Registo Individual");
        el.style.display = 'grid';

        if(navBar.style.display === 'block'){
          navBar.style.display = 'none';
          appFull.style.gridTemplateAreas = '"head head" "main main"';
        }

      }else{
        if(id === "lMun"){
          changeTitle("Listas Municipais");

          if(navBar.style.display === 'block'){
            navBar.style.display = 'none';
            appFull.style.gridTemplateAreas = '"head head" "main main"';
          }
        }else if(id === "agenda"){
          changeTitle("Agenda");

          if(navBar.style.display === 'block'){
            navBar.style.display = 'none';
            appFull.style.gridTemplateAreas = '"head head" "main main"';
          }
        }else if(id === "registo"){
          changeTitle("Registar Utente");

          if(navBar.style.display === 'block'){
            navBar.style.display = 'none';
            appFull.style.gridTemplateAreas = '"head head" "main main"';
          }
        }else if(id === "login"){
          changeTitle("Login");

          if(navBar.style.display === 'block'){
            navBar.style.display = 'none';
            appFull.style.gridTemplateAreas = '"head head" "main main"';
          }
        }
        el.style.display = 'block';
      }
    } else {
      el.style.display = 'none';
    }
  });

  if(id === "lMun"){
    buildListaMunicipal();
  }

  let rows = document.querySelectorAll('table.listaView > tbody > tr');

  rows.forEach(el => {
    el.addEventListener('click', registoIndividual)
  })

}

function hidePanel(id){
  document.getElementById(id).style.display = 'none';
};

function registoIndividual(ev) {

  const nUtente = ev.target.parentNode.getElementsByTagName("td")[0].textContent;
  showRegisto(nUtente);

}

function toggleNav(){
  const navBar = document.getElementsByTagName("nav")[0];
  const appFull = document.getElementById("app");

  if(navBar.style.display === 'none'){
    navBar.style.display = 'block';
    appFull.style.gridTemplateAreas = '"head head" "nav main"';
  }else{
    navBar.style.display = 'none';
    appFull.style.gridTemplateAreas = '"head head" "main main"';
  }

}

function changeTitle(titleText){
  var title = document.getElementsByTagName("header")[0];
  deleteChildren(title);
  var menu = document.createElement("img");
  if(titleText == "Registo Individual"){
    menu.src = "back.png";
    menu.alt = "Back Button";
    menu.id = "backImg";
    menu.addEventListener('click', () => {
      showPanel("lMun")
    })
  }else{
    menu.src = "menu.png";
    menu.alt = "Menu Button";
    menu.onclick = toggleNav;
    menu.id = "menuImg";
  }

  var head = document.createElement("h1");
  var text = document.createTextNode(titleText);
  head.appendChild(text);
  title.appendChild(menu);
  title.appendChild(head);

  var bot = document.createElement("botao");
  //create an Edit button
  if(titleText == "Registo Individual"){
    var button = document.createElement("input");
    button.type = "submit";
    button.value = "Editar";
    button.id = "edit";
    button.onclick = editRegisto;
    bot.appendChild(button);
    title.appendChild(bot);
  }
}

function editRegisto(){
    /*var inputAreas = document.getElementsByTagName("input");
    for(i = 0; i < inputAreas.length; i++){
      inputAreas[i].readOnly = false;
    }*/
    if(this.value == "Editar"){
      this.value = "Guardar";
      document.getElementById("date1").readOnly = false;
      document.getElementById("date2").readOnly = false;
      document.getElementById("contact").readOnly = false;
      document.getElementById("textArea").readOnly = false;
    }
    else{
      this.value = "Editar";
      var info = JSON.parse(localStorage.getItem(document.getElementById("numU").value));

      document.getElementById("date1").readOnly = true;
      info[2] = document.getElementById("date1").value;

      document.getElementById("date2").readOnly = true;
      info[3] = document.getElementById("date2").value;

      document.getElementById("contact").readOnly = true;
      info[4] = document.getElementById("contact").value;

      document.getElementById("textArea").readOnly = true;
      info[6] = document.getElementById("textArea").value;

      localStorage.setItem(document.getElementById("numU").value, JSON.stringify(info));
    }
}

function buildListaMunicipal(){

  //Build Lista Municipal
  if(localStorage.getItem("utentes") !== null){
    const tabelaMun = document.getElementById("lMun").getElementsByTagName("tbody")[0];
    deleteChildren(tabelaMun);

    const listaU = JSON.parse(localStorage.getItem("utentes"));

    listaU.forEach(el => {
      lastState = JSON.parse(localStorage.getItem(el));

      var nameStorage = lastState[0];
      var idadeStorage = lastState[1];
      var data1Storage = lastState[2];
      var data2Storage = lastState[3];
      var munStorage = lastState[5];

      var idadeFilter = document.getElementById("idade");
      var munFilter = document.getElementById("municipio");

      var idadeFValue = idadeFilter.value;
      var munValue = munFilter.value;

      if(idadeFValue === "66+"){
        var idadeBool = (parseInt(idadeStorage) > 65);
      }else if(idadeFValue === "noFilter"){
        idadeBool = true;
      }else{
        var valSplit = idadeFValue.split("-");
        var limMin = parseInt(valSplit[0]);
        var limMax = parseInt(valSplit[1]);

        var idadeBool = (parseInt(idadeStorage) >= limMin && parseInt(idadeStorage) <= limMax);
      }

      if(idadeBool && (munValue.toLowerCase() === munStorage.toLowerCase() || munValue === "noFilter")){

        if(data1Storage === ""){
          var estadoL = "Nâo vacinado/Sem Marcação";
        }else{
          if((new Date()).getTime() < (new Date(data1Storage)).getTime()){
            var estadoL = "1ª Dose Marcada";
          }else{
            if((new Date()).getTime() < (new Date(data2Storage)).getTime()){
              var estadoL = "1ª Dose";
            }else{
              var estadoL = "Vacinado";
            }
          }
        }

        var tabrow = document.createElement("tr");
        var tabdtU = document.createElement("td");
        tabdtU.appendChild(document.createTextNode(el));
        var tabdtNome = document.createElement("td");
        tabdtNome.appendChild(document.createTextNode(nameStorage));
        var tabdtId = document.createElement("td");
        tabdtId.appendChild(document.createTextNode(idadeStorage));
        var tabdtEst = document.createElement("td");
        tabdtEst.appendChild(document.createTextNode(estadoL));
        var tabdtMun = document.createElement("td");
        tabdtMun.appendChild(document.createTextNode(munStorage));

        tabrow.appendChild(tabdtU);
        tabrow.appendChild(tabdtNome);
        tabrow.appendChild(tabdtId);
        tabrow.appendChild(tabdtEst);
        tabrow.appendChild(tabdtMun);

        tabelaMun.appendChild(tabrow);

      }


    })

  }else{
    var listaUtentes = new Array();
    localStorage.setItem("utentes", JSON.stringify(listaUtentes));
  }
  //Fim Build
}

function deleteChildren(parent) {
  //const myNode = document.getElementsByTagName("main")[0];
  while (parent.firstChild) {
    parent.removeChild(parent.lastChild);
  }
}

function showRegisto(utente) {

  const lastState = JSON.parse(localStorage.getItem(utente));

  if (lastState != null) {
    const nameStorage = lastState[0];
    const idadeStorage = lastState[1];
    const data1Storage = lastState[2];
    const data2Storage = lastState[3];
    const contactoStorage = lastState[4];
    const obsStorage = lastState[6];


    var main = document.getElementsByTagName("main")[0];
    hidePanel(localStorage.getItem("active"));

    document.getElementById("profile").remove();

    var container = document.createElement("div");
    container.id = "profile";
    container.classList.add("panel");
    var pic = document.createElement("pic");
    var img = document.createElement("img");
    img.src = "profile-picture-default-female.jpg";
    pic.appendChild(img);

    var name = document.createElement("name");
    var label1 = document.createElement("label");
    label1.appendChild(document.createTextNode("Nome Completo:"));
    var input1 = document.createElement("input");
    input1.type = "text";
    input1.id = "name";
    input1.value = nameStorage;
    input1.readOnly = true;
    name.appendChild(label1);
    name.appendChild(input1);

    var age = document.createElement("age");
    var label2 = document.createElement("label");
    label2.appendChild(document.createTextNode("Idade:"));
    var input2 = document.createElement("input");
    input2.type = "text";
    input2.id = "age";
    input2.value = idadeStorage;
    input2.readOnly = true;
    age.appendChild(label2);
    age.appendChild(input2);

    var numU = document.createElement("numU");
    var label3 = document.createElement("label");
    label3.appendChild(document.createTextNode("Numero de Utente:"));
    var input3 = document.createElement("input");
    input3.type = "text";
    input3.id = "numU";
    input3.value = utente;
    input3.readOnly = true;
    numU.appendChild(label3);
    numU.appendChild(input3);

    var contact = document.createElement("contact");
    var label4 = document.createElement("label");
    label4.appendChild(document.createTextNode("Contacto:"));
    var input4 = document.createElement("input");
    input4.type = "text";
    input4.id = "contact";
    input4.value = contactoStorage;
    input4.readOnly = true;
    contact.appendChild(label4);
    contact.appendChild(input4);

    var date1 = document.createElement("date1");
    var label5 = document.createElement("label");
    label5.appendChild(document.createTextNode("Primeira Toma: "));
    var datefield1 = document.createElement("input");
    datefield1.type = "date";
    datefield1.id = "date1";
    datefield1.valueAsDate = new Date(data1Storage);
    datefield1.readOnly = true;
    date1.appendChild(label5);
    date1.appendChild(datefield1);

    var date2 = document.createElement("date2");
    var label6 = document.createElement("label");
    label6.appendChild(document.createTextNode("Segunda Toma: "));
    var datefield2 = document.createElement("input");
    datefield2.type = "date";
    datefield2.id = "date2";
    datefield2.valueAsDate = new Date(data2Storage);
    datefield2.readOnly = true;
    date2.appendChild(label6);
    date2.appendChild(datefield2);

    var info = document.createElement("info");
    var textArea = document.createElement("textarea");
    var textInside = document.createTextNode(obsStorage);
    textArea.appendChild(textInside);
    textArea.id = "textArea";
    textArea.placeholder = "Informações Adicionais";
    textArea.readOnly = true;

    info.appendChild(textArea);

    container.appendChild(pic);
    container.appendChild(name);
    container.appendChild(age);
    container.appendChild(numU);
    container.appendChild(contact);
    container.appendChild(date1);
    container.appendChild(date2);
    container.appendChild(info);
    main.appendChild(container);

    let buttons = document.querySelectorAll('span[data-panel]');
    showPanel("profile");
    localStorage.setItem("active", "profile");

  }else{
    return;
  }
}

function criarUtente(){
  var x = document.querySelectorAll("#formCria > ul > li > input");
  var lista = [];
  const utente = x[0].value;
  for (i = 1; i < x.length ;i++) {
    lista.push(x[i].value);

  }
  var listaU = JSON.parse(localStorage.getItem("utentes"));

  if(listaU !== null){
    listaU.push(utente);
    localStorage.setItem("utentes", JSON.stringify(listaU));
  }else{
    listaU = new Array();
    listaU.push(utente);
    localStorage.setItem("utentes", JSON.stringify(listaU));
  }


  localStorage.setItem(utente, JSON.stringify(lista));

}

function clickDay(ev){

  var days = document.getElementById("agenda").getElementsByClassName("days")[0].getElementsByTagName("li");
  var prev = null;
  for(i = 0; i < days.length; i++){
    if(days[i].classList.contains("active")){
      days[i].removeChild(days[i].lastChild);
      days[i].classList.remove("active");
      days[i].classList.remove("popup");
      prev = days[i];
    }
  }

  if(prev == null || prev.textContent !== ev.target.textContent){
    ev.target.classList.add("active");
    ev.target.classList.add("popup");

    const month = document.getElementById("meses");
    const year = document.getElementById("year");
    const strDate = year.value+"-"+month.value+"-"+ev.target.textContent;
    const dataForm = new Date(strDate);

    const listaU = JSON.parse(localStorage.getItem("utentes"));

    var nMarcacoes = 0;

    listaU.forEach(el => {
      lastState = JSON.parse(localStorage.getItem(el));

      var data1Storage = lastState[2];
      var data2Storage = lastState[3];

      if((new Date(data1Storage)).getTime() >= dataForm.getTime() && (new Date(data1Storage)).getTime() < dataForm.getTime() + 86400000){
        nMarcacoes = nMarcacoes + 1;
      }else if((new Date(data2Storage)).getTime() >= dataForm.getTime() && (new Date(data2Storage)).getTime() < dataForm.getTime() + 86400000){
        nMarcacoes = nMarcacoes + 1;
      }

    })

    const spanEl = document.createElement("span");
    spanEl.classList.add("popuptext");
    spanEl.id = "myPopup";
    const txtSpn = document.createTextNode(strDate + ": " + nMarcacoes + " Marcações");

    spanEl.appendChild(txtSpn);
    spanEl.classList.toggle("show");
    ev.target.appendChild(spanEl);
  }

}
