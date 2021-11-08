var firebaseConfig = {
  apiKey: "AIzaSyDpZktb-Ior10nlq02d2uneMt7RnMzltp0",
authDomain: "tcc-app-e4a0c.firebaseapp.com",
projectId: "tcc-app-e4a0c",
storageBucket: "tcc-app-e4a0c.appspot.com",
messagingSenderId: "113247297233",
appId: "1:113247297233:web:0eea29de5dfd48f81a6ff0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);









$(document).ready(function(){
  var db = firebase.firestore();

  //Constantes do Questionário em si:
 
  const selectquests = document.getElementById("questions-selector")
 
  //--------------------------------------------------------------------

  const perg = []
 











      
  selectquests.addEventListener("submit", (e) =>{
    e.preventDefault()
    nq = document.getElementById('q-selector').value;
    const category = document.getElementById('m-selector').value;

    if (nq == 'null' ) {
      alert("Escolha a quantidade de questões")
      
    }else if (category == 0) {
      alert("Escolha o tema das questões")
      
    }else if(category == 3){
      document.getElementById('mostraquiz').disabled = true
      document.getElementById('mostraquiz').style = 'opacity: 50%'
      document.getElementById('q-selector').disabled = true
      document.getElementById('q-selector').style = 'opacity: 50%'
      document.getElementById('m-selector').disabled = true
      document.getElementById('m-selector').style = 'opacity: 50%'
      db.collection("QuestoesENEM").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          perg.push([doc.data()])
          for (let i = perg.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [perg[i], perg[j]] = [perg[j], perg[i]];
        }
          $('#placar').text('Questão:'+'1'+'/'+nq)
          $('#title-enunciado').text(perg[0][0].enunciado);
          $('#quest-categoria').text(perg[0][0].categoria);
          $('#R-A').text(perg[0][0].A);
          $('#R-B').text(perg[0][0].B);
          $('#R-C').text(perg[0][0].C);
          $('#R-D').text(perg[0][0].D);
        });
    });
  

    }else{
      document.getElementById('mostraquiz').disabled = true
      document.getElementById('mostraquiz').style = 'opacity: 50%'
      document.getElementById('q-selector').disabled = true
      document.getElementById('q-selector').style = 'opacity: 50%'
      document.getElementById('m-selector').disabled = true
      document.getElementById('m-selector').style = 'opacity: 50%'
      db.collection("QuestoesENEM").where("categoria", "==", category).get().then((querySnapshot) =>{
        querySnapshot.forEach((doc) => {
          perg.push([doc.data()])
          for (let i = perg.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [perg[i], perg[j]] = [perg[j], perg[i]];
        }
          $('#placar').text('Questão:'+'1'+'/'+nq)
          $('#title-enunciado').text(perg[0][0].enunciado);
          $('#quest-categoria').text(perg[0][0].categoria);
          $('#R-A').text(perg[0][0].A);
          $('#R-B').text(perg[0][0].B);
          $('#R-C').text(perg[0][0].C);
          $('#R-D').text(perg[0][0].D);
          
          
          
        })
    })

    }
    
    
  

  })
  var confi = document.getElementById('confere')
  var conta = 0
  var click = 0
  $('#nextq').click(function () {
    click = click - 1
    const ra = $('input:checked').val();
    if (conta <= nq - 2 && ra != null) { conta++
      $('#title-enunciado').text(perg[conta][0].enunciado);
      $('#quest-categoria').text(perg[conta][0].categoria);
      $('#R-A').text(perg[conta][0].A);
      $('#R-B').text(perg[conta][0].B);
      $('#R-C').text(perg[conta][0].C);
      $('#R-D').text(perg[conta][0].D);
      console.log(conta)

        
      }else if(ra == null){
          alert('Responda a questão antes de prosseguir!!!')
          
      
    }else{
      alert('Seu quiz acabou, essa foi sua ultima questão.')
    }

    if (conta == nq-1) {
      document.getElementById('nextq').style = 'opacity: 50%'
      document.getElementById('nextq').disabled = true
    }

    if (click == 0) {
      document.getElementById('btnsubmit').style = 'opacity: 100%'
      document.getElementById('btnsubmit').disabled = false
    }
    $('#placar').text('Questão:'+(conta+1)+'/'+nq)
    confi.style = 'display: none;'
    $('#quiz').trigger('reset');
    
  })
  var qc = []
  var qe = []
  
  $("#btnsubmit").on("click", function(){
    click++
    console.log(click)
    const ra = $('input:checked').val();
    if(ra == perg[conta][0].gabarito  ){
      qc.push([perg[conta][0].enunciado, perg[conta][0].gabarito, conta+1])
      $("#placarcrts").text("Questões certas: " + qc.length + "/" + nq )
      confi.style = 'display: block;'
  
    }else if(ra == null){
      alert("Escolha uma das alternativas!!")
      
    }else{
      qe.push([perg[conta][0].enunciado, perg[conta][0].gabarito, conta+1])
      $("#placarerds").text("Questões erradas: " + qe.length + "/" + nq )
      confi.style = 'display: block;' 
    }

    if (click == 1) {
      document.getElementById('btnsubmit').style = 'opacity: 50%'
      document.getElementById('btnsubmit').disabled = true
    }
    
    console.log(qc)
    console.log(qe)  
  })

 
  var contresults = 0

  $("#btncertas").click(function(){
    contresults = 0
    console.log(contresults)
      document.getElementById('divresultscor').style.border = 'thick solid #65c368';
      document.getElementById('divresultscor').style.backgroundColor = '#bbffb9'
      $("#enunciadocor").text(qc[0][0])
      $("#categoriacor").text("Gabarito: " + qc[0][1])
      $("#questcorrect").text("Questão - " + qc[0][2])
      $("#nextresult").click(function(){
        if (contresults == qc.length - 1) {
          contresults = 0
        }else if (contresults <= qc.length) {
          contresults++
          console.log(contresults)
          $("#enunciadocor").text(qc[contresults][0])
          $("#categoriacor").text("Gabarito: " + qc[contresults][1])
          $("#questcorrect").text("Questão - " + qc[contresults][2])
        }
       

      })
  })
  var contresults2 = 0

  $("#btnerradas").click(function(){
    contresults2 = 0
    document.getElementById('divresultscor').style.border = 'thick solid #ff0000';
    document.getElementById('divresultscor').style.backgroundColor = '#ffbfaa'
    $("#enunciadocor").text(qe[0][0])
      $("#categoriacor").text("Gabarito: " + qe[0][1])
      $("#questcorrect").text("Questão - " + qe[0][2])
      $("#nextresult").click(function(){
        if (contresults2 == qe.length - 1) {
          contresults2 = 0
        }else if (contresults2 <= qe.length) {
          console.log(contresults2)
          contresults2++
          $("#categoriacor").text("Gabarito: " + qe[contresults2][1])
          $("#questcorrect").text("Questão - " + qe[contresults2][2])
          $("#enunciadocor").text(qe[contresults2][0])
        }
        
      })
  })

  $('#sresult').click(function() {
      $('#localresult').text('Questões Certas - ' + qc.length)
      $('#localresult2').text('Questões Erradas - ' + qe.length)
      document.getElementById('localresult').style.color = 'green'
      document.getElementById('localresult2').style.color = '#ff0000'
      var p1 = 100*qc.length
      var p2 = p1/nq
      
      if (qc.length == 0 && qe.length == 0) {
        $("#msgfinal").text('Responda as questões para ver seu resultado :)')
  
       }else{
       $("#msgfinal").text("Você acertou "+ p2 +"% "+"do questionário!")
     }

  })

  

    
  
  $("#saive").click(function () {
    var d = new Date();
    var p1 = 100*qc.length
    var p2 = p1/nq
    var hora = ('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2);
    var dia = String(d.getDate()).padStart(2, '0');
    var mes = String(d.getMonth() + 1).padStart(2, '0');
    var ano = d.getFullYear();
    var acertos = qc.length;
    var erros = qe.length;
    var cat = document.getElementById('m-selector').value;
    var slvbd = document.getElementById('salvonobd')

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        var user = firebase.auth().currentUser;
        if (user != null) {
          var email_id = user.email;
          console.log(email_id)
          db.collection("users").doc(email_id).collection("Meus_Resultados").doc().set({
            Acertos: acertos,
            Erros: erros,
            Hora: hora,
            D: dia + '/' + mes + '/' + ano,
            Porcentagem_de_acerto: p2+'%'+' de '+nq+' questões',
            Categoria: cat,
            Nome: email_id
          });
        }
      }
      
    })
    slvbd.style = 'display: block;'
      
 
    
    
    
  })
  $('#terminar').click(function () {
    location. reload();
  })



})


// Fazer a autebticação para poder usar o banco de dados!!


       


    

