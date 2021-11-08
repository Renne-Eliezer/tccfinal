var config = {
  apiKey: "AIzaSyDpZktb-Ior10nlq02d2uneMt7RnMzltp0",
authDomain: "tcc-app-e4a0c.firebaseapp.com",
projectId: "tcc-app-e4a0c",
storageBucket: "tcc-app-e4a0c.appspot.com",
messagingSenderId: "113247297233",
appId: "1:113247297233:web:0eea29de5dfd48f81a6ff0"
};
firebase.initializeApp(config);








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