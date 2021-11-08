    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDpZktb-Ior10nlq02d2uneMt7RnMzltp0",
  authDomain: "tcc-app-e4a0c.firebaseapp.com",
  projectId: "tcc-app-e4a0c",
  storageBucket: "tcc-app-e4a0c.appspot.com",
  messagingSenderId: "113247297233",
  appId: "1:113247297233:web:0eea29de5dfd48f81a6ff0"
    };
    firebase.initializeApp(config);









function cadastro() {
        var useremail = document.getElementById('exampleInputEmail1').value;
        var userpass = document.getElementById('exampleInputPassword1').value;
        var userpass2 = document.getElementById('exampleInputPassword2').value;
        console.log('ok')
        
        console.log('ok')
        if (userpass2 == '' || userpass == '' || useremail == '') {
            document.getElementById('alert4').style = "Display: block;"
            if (userpass2 == '' && userpass != '' && useremail != '') {
                document.getElementById('exampleInputPassword2').focus()
            }else if (userpass2 != '' && userpass == '' && useremail != '') {
                document.getElementById('exampleInputPassword1').focus()
            }else{
                document.getElementById('exampleInputEmail1').focus()
            }
        }
        else if (userpass.length < 7 || userpass2.length < 7) {
            document.getElementById('alert2').style = "Display: block;"
        }
        else if (userpass != userpass2 ) {
            document.getElementById('alert').style = "Display: block;"
        }else{
            document.getElementById('alert3').style = "Display: block;"
            firebase.auth().createUserWithEmailAndPassword(useremail, userpass2)
            .then((userCredential) => {
                console.log('ok')
                var user = userCredential.user;
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
            })
        }

}


$('#butclose').click(function () {
    $(".alert").alert('close')
})
$('#butclose2').click(function () {
    $(".alert").alert('close')
})
$('#butclose3').click(function () {
    $(".alert").alert('close')
})
$('#butclose4').click(function () {
    $(".alert").alert('close')
})










