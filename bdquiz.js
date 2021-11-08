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
//Constantes para upar perguntas
const insertquiz = document.getElementById("div-form")
const sectionform = document.getElementById("section-form")
let editStatus = false;
let id = '';
//-------------------------------------------------------------------



const saveQ = (enunciado, A, B, C, D, gabarito, categoria) =>
  db.collection("QuestoesENEM").doc().set({
    enunciado,
    A,
    B,
    C,
    D,
    gabarito,
    categoria
  });

const updateQ = (id, updatedQ) => db.collection('QuestoesENEM').doc(id).update(updatedQ);
const onGetQ = (callback) => db.collection("QuestoesENEM").onSnapshot(callback);
const deleteQ = (id) => db.collection("QuestoesENEM").doc(id).delete();


insertquiz.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const enunciado = insertquiz["enunciado"];
    const A = insertquiz["A"];
    const B = insertquiz["B"];
    const C = insertquiz["C"];
    const D = insertquiz["D"];
    const gabarito = insertquiz["gabarito"];
    const categoria = insertquiz["categoria"]
  
    try {
      if (!editStatus) {
        await saveQ(enunciado.value, A.value, B.value, C.value, D.value, gabarito.value, categoria.value);
      } else {
        await updateQ(id, {
          enunciado: enunciado.value,
          A: A.value,
          B: B.value,
          C: C.value,
          D: D.value,
          gabarito: gabarito.value,
          categoria: categoria.value
        })
  
        editStatus = false;
        id = '';
        insertquiz['btn-task-form'].innerText = 'Save';
      }
  
      insertquiz.reset();
      enunciado.focus();
    } catch (error) {
      console.log(error);
    }
  });


