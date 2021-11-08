    // Your web app's Firebase configuration
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








var db = firebase.firestore();




firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var user = firebase.auth().currentUser;
      if (user != null) {
        var email_id = user.email;
        console.log(email_id)
        document.getElementById('userview').innerHTML = "Bem-vindo: "+ email_id;
        const cad = document.getElementById('cadastquest')

        if (email_id != "renneeliezer.lima001@gmail.com") {
          cad.style = 'display: none;'
        }

        const deleteTask = (id) => db.collection("users").doc(email_id).collection('Meus_Resultados').doc(id).delete();
        const usuarioarea = document.getElementById("usuarioarea")

        

        const dados = document.getElementById('linhadotempo')

          db.collection("users").doc(email_id).collection('Meus_Resultados').get().then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  dados.innerHTML = ""
                  querySnapshot.forEach((doc) => {
                    
                      const task = doc.data();
                
                      dados.innerHTML += ` <div class="card col-md-5 m-3" style="width: 18rem;">
                      <div class="card-body">
                        <h5 class="card-title">${task.Categoria}</h5>
                        <p class="card-text">Questões certas: ${task.Acertos}</p>
                        <p class="card-text">Questões Erradas: ${task.Erros} </p>
                        <p class="card-text">Porcentagem de acerto: ${task.Porcentagem_de_acerto} </p>
                        <a href="#" class="card-link">${task.Hora}</a>
                        <a href="#" class="card-link">${task.D}</a>
                        <div class="row">
                          <button type="submit" class="btn btn-primary btn-delete rounded-pill mt-3" data-id="${doc.id}">Delete</button>
                        </div>
                      </div>
                    </div>`;
                    });

            const btnsDelete = usuarioarea.querySelectorAll(".btn-delete");
            btnsDelete.forEach((btn) =>
              btn.addEventListener("click", async (e) => {
                console.log(e.target.dataset.id);
                try {
                  await deleteTask(e.target.dataset.id);
                } catch (error) {
                  console.log(error);
                }

                location. reload();
              })
            );

            
          });
        });

          
         
         
      }
    }
    
  })

  

  function logout(){
    firebase.auth().signOut();
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        
      }else{
        window.location.href = 'login.html'
  
      }
  })
  }




