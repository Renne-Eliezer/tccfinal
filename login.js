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
    // User is signed in.

    console.log('ok')


    var user = firebase.auth().currentUser;

    if(user != null){
      console.log('ok')
      window.location.href = 'index.html'


    }

  } else {
   

  }
});

function login(){

  var userEmail = document.getElementById("exampleInputEmail1").value;
  var userPass = document.getElementById("exampleInputPassword1").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}

