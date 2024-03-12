const firebaseConfig = {
    apiKey: "AIzaSyC7ksjjVQ2TBJeBqbYKJcJZC_CmhlXf_n0",
    authDomain: "quiz-2-d2b38.firebaseapp.com",
    projectId: "quiz-2-d2b38",
    storageBucket: "quiz-2-d2b38.appspot.com",
    messagingSenderId: "946222108523",
    appId: "1:946222108523:web:3b3f84b35c4a4767ee462e"
  };

firebase.initializeApp(firebaseConfig);// Inicializaar app Firebase

const db = firebase.firestore();// db representa mi BBDD //inicia Firestore

//Read all
const readAll = () => {
    // Limpia el album para mostrar el resultado
    cleanAlbum();

    //Petición a Firestore para leer todos los documentos de la colección album
    db.collection("album")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                printPhoto(doc.data().title, doc.data().url, doc.id)
            });

        })
        .catch(() => console.log('Error reading documents'));;
};

//Delete
const deletePicture = () => {
    const id = prompt('Introduce el ID a borrar');
    db.collection('album').doc(id).delete().then(() => {
        alert(`Documento ${id} ha sido borrado`);
        //Clean
        document.getElementById('album').innerHTML = "";
        //Read all again
        readAll();
    })
        .catch(() => console.log('Error borrando documento'));
};

//Clean 
const cleanAlbum = () => {
    document.getElementById('album').innerHTML = "";
};

//Show on page load
/* readAll(); */


//********FIRESTORE USERS COLLECTION******

const createUser = (user) => {
    db.collection("users")
        .add(user)
        .then((docRef) => console.log("Document written with ID: ", docRef.id))
        .catch((error) => console.error("Error adding document: ", error));
};

/* const readAllUsers = (born) => {
  db.collection("users")
    .where("first", "==", born)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
      });
    });
}; */

// Read ONE
function readOne(id) {
    // Limpia el album para mostrar el resultado
    cleanAlbum();

    //Petición a Firestore para leer un documento de la colección album 
    var docRef = db.collection("album").doc(id);

    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            printPhoto(doc.data().title, doc.data().url, doc.id);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

}

/**************Firebase Auth*****************/

const signUpUser = (email, password) => {
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            let user = userCredential.user;
            console.log(`se ha registrado ${user.email} ID:${user.uid}`)
            alert(`se ha registrado ${user.email} ID:${user.uid}`)
            // ...
            // Saves user in firestore
            createUser({
                id: user.uid,
                email: user.email,
            });

        })
        .catch((error) => {
            console.log("Error en el sistema" + error.message, "Error: " + error.code);
        });
};


document.getElementById("form1").addEventListener("submit", function (event) {
    event.preventDefault();
    let email = event.target.elements.email.value;
    let pass = event.target.elements.pass.value;
    let pass2 = event.target.elements.pass2.value;

    pass === pass2 ? signUpUser(email, pass) : alert("error password");
})


const signInUser = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            let user = userCredential.user;
            console.log(`se ha logado ${user.email} ID:${user.uid}`)
            alert(`se ha logado ${user.email} ID:${user.uid}`)
            console.log("USER", user);
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
        });
}

const signOut = () => {
    let user = firebase.auth().currentUser;

    firebase.auth().signOut().then(() => {
        console.log("Sale del sistema: " + user.email)
    }).catch((error) => {
        console.log("hubo un error: " + error);
    });
}


document.getElementById("form2").addEventListener("submit", function (event) {
    event.preventDefault();
    let email = event.target.elements.email2.value;
    let pass = event.target.elements.pass3.value;
    signInUser(email, pass)
})
document.getElementById("salir").addEventListener("click", signOut);

// Listener de usuario en el sistema
// Controlar usuario logado
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log(`Está en el sistema:${user.email} ${user.uid}`);
    } else {
        console.log("no hay usuarios en el sistema");
    }
});

