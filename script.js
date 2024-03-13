
/* EL BUEN SCRIPT */

function welcome() {
    document.querySelector("#quiz").innerHTML = "";
    document.querySelector("#welcome").innerHTML = `
        <section>
        <header>
        <h1>REGISTRO QUIZ 2</h1>
            
            <div id="forms-container">
                <div>
                    <h3>Formulario de Registro</h3>
                    <form id="form1" action="#" method="POST">
                        <div>
                            <label for="email">Email:</label><br>
                            <input type="email" id="email" name="email" placeholder="Introduce email..."><br>
                            <label for="pass">Password:</label><br>
                            <input type="password" id="pass" name="pass" placeholder="Introduce password..."><br>
                            <label for="pass2">Repite password:</label><br>
                            <input type="password" id="pass2" name="pass2" placeholder="Repite password..."><br>
                            <input type="submit" value="Enviar">
                        </div>
                    </form>
                </div>

                <div>
                    <h3>Formulario de Login</h3>
                    <form id="form2" action="#" method="POST">
                        <div>
                            <label for="email2">Email:</label><br>
                            <input type="email" id="email2" name="email2" placeholder="Introduce email..."><br>
                            <label for="pass3">Password:</label><br>
                            <input type="password" id="pass3" name="pass3" placeholder="Introduce password..."><br>
                            <input type="submit" value="Enviar">
                        </div>
                    </form>

                    <div id="logout">
                        <button id="salir">Logout</button>
                    </div>

                </div>
                <div>
                    <h3>Quiz</h3>
                    <div id="logout">
                        <button id="quizButton">Jugar</button>
                    </div>

                </div>
            </div>
        </section>`;
}

welcome();


/* FIREBASE */

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



//********FIRESTORE USERS COLLECTION******

const createUser = (user) => {
    db.collection("users")
        .add(user)
        .then((docRef) => console.log("Document written with ID: ", docRef.id))
        .catch((error) => console.error("Error adding document: ", error));
};

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
                partidas: datosPartidas,
            });

        })
        .catch((error) => {
            console.log("Error en el sistema" + error.message, "Error: " + error.code);
            alert("Por favor compruebe sus datos y rellene todos los campos.")
        });
};


document.getElementById("form1").addEventListener("submit", function (event) {
    event.preventDefault();
    let email = event.target.elements.email.value;
    let pass = event.target.elements.pass.value;
    let pass2 = event.target.elements.pass2.value;

    pass === pass2 ? signUpUser(email, pass) : alert("error password");
})


// BOTON JUGAR QUIZ
document.getElementById("quizButton").addEventListener("click", function () {
    let user = firebase.auth().currentUser;
    if (user) {
        quiz();
    } else {
        alert("Por favor inicie sesión")
    }

})

// SIGN-IN
const signInUser = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            let user = userCredential.user;
            console.log(`se ha logado ${user.email} ID:${user.uid}`)
            console.log("USER", user);
            //quiz();
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
            alert("No se ha encontrado usuario en el sistema. Compruebe su usuario y contraseña.")
        });
}

// SIGN-OUT
const signOut = () => {
    let user = firebase.auth().currentUser;

    firebase.auth().signOut().then(() => {
        console.log("Sale del sistema: " + user.email)
        document.querySelector("#userLog").innerHTML += "Te has deslogeado del sistema";

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

//añadir elemento nuevo llamado partida a cada usuario


document.getElementById("salir").addEventListener("click", signOut);

// Listener de usuario en el sistema
// Controlar usuario logado
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log(`Está en el sistema:${user.email} ${user.uid}`);
        document.getElementById("userLog").innerHTML = `${user.email} está en el sistema`;
    } else {
        console.log("No hay usuarios en el sistema");
        document.getElementById("userLog").innerHTML = `No hay usuarios en el sistema`;
    }
});


/* QUIZ  */
let partida = 0;
let datosPartidas = [];

localStorage.setItem(
    "partidas",
    JSON.stringify(datosPartidas));

async function quiz() {
    let allData = await fetch("./local.json")
    let data = await allData.json();

    let datos = data.results;

    let preguntas = [];
    let respuestas_correctas = [];
    let respuestas = [];


    for (let i = 0; i < datos.length; i++) {
        preguntas.push(datos[i].question);
        respuestas_correctas.push(datos[i].correct_answer);
        respuestas.push(datos[i].incorrect_answers);
        respuestas[i].push(datos[i].correct_answer);
    };

    console.log(respuestas_correctas);
    console.log(preguntas);

    let respuestasReordenadas = respuestas.map(respuesta => respuesta.sort());
    let aciertos = 0;
    let index = 0;
    let preguntasRespondidas = [];

    function final() {
        console.log(datosPartidas);

        document.getElementById("quiz").innerHTML = `
            <button id="again"><a href="#">Otra partida</a></button>
            <button id="verGrafica"><a href="#">Mostrar gráfica</a></button>
            <button id="signOut"><a href="#">Sign Out</a></button>`
        document.getElementById("again").addEventListener("click", function () {
            document.querySelector(".ct-chart").innerHTML = "";
            quiz();
        });
        document.getElementById("verGrafica").addEventListener("click", function () {

            document.querySelector(".ct-chart").innerHTML = `        `

            // en labels habrá que meter partida1, partida2, etc.
            // en series las puntuaciones

            let datosPartidas = JSON.parse(localStorage.getItem("partidas"));
            //console.log(datosPartidas);
            let partidas = datosPartidas.map(partidas => `Partida ${partidas.partida}`);


            let puntuaciones = datosPartidas.map(partidas => partidas.aciertos);
            console.log(puntuaciones);



            new Chartist.Line('.ct-chart', {
                labels: partidas,
                series: [
                    puntuaciones
                ]
            }, {
                fullWidth: true,
                chartPadding: {
                    right: 40
                }
            });
        });

        document.getElementById("signOut").addEventListener("click", function () {
            document.querySelector(".ct-chart").innerHTML = "";
            signOut();
            welcome();

        });
    }


    function pintar(i) {
        document.getElementById("welcome").innerHTML = "";
        document.getElementById("quiz").innerHTML = `
            <fieldset>
                <legend>${preguntas[i]}</legend>

                <label for="option1" id="labelOption1">${respuestasReordenadas[i][0]}</label>
                <input type="radio" name="option" id="option1" value="${respuestasReordenadas[i][0]}">

                <label for="option2" id="labelOption2">${respuestasReordenadas[i][1]}</label>
                <input type="radio" name="option" id="option2" value="${respuestasReordenadas[i][1]}">
            
                <label for="option3" id="labelOption3">${respuestasReordenadas[i][2]}</label>
                <input type="radio" name="option" id="option3" value="${respuestasReordenadas[i][2]}">

                <label for="option4" id="labelOption4">${respuestasReordenadas[i][3]}</label>
                <input type="radio" name="option" id="option4" value="${respuestasReordenadas[i][3]}">
            </fieldset>`

        let labels = document.getElementsByTagName("label");

        for (let j = 0; j < labels.length; j++) {

            labels[j].addEventListener("click", function () {

                preguntasRespondidas.push(document.getElementById(`option${j + 1}`).value);

                console.log(preguntasRespondidas);

                if (respuestas_correctas[i] == preguntasRespondidas[i]) {
                    console.log("¡Correcto!");
                    aciertos += 1;
                }
                else {
                    console.log("Incorrecto")
                }

                index++;

                if (preguntasRespondidas.length == preguntas.length) {

                    partida++;

                    let nuevaPartida = JSON.parse(localStorage.getItem("partidas"));

                    nuevaPartida.push({
                        "partida": partida,
                        "aciertos": aciertos,
                        "fecha": Date()
                    });

                    localStorage.setItem("partidas", JSON.stringify(nuevaPartida));

                    console.log(nuevaPartida);

                    datosPartidas = nuevaPartida;

                    alert(`Has acertado ${aciertos} de 10`)

                    final();
                }
                else {
                    pintar(index);
                }
            });
        };
    }
    pintar(index);
}