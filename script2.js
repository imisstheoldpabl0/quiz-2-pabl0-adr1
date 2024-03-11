/***** Primer paso: Llamada a la api y capturar en arrays preguntas y respuestas *****/
async function quiz() { // Se debería llamar quiz porque al final estamos llamando a la funcion quiz no?

    let allData = await fetch("local.json") // cogemos toda la info de la API
    let data = await allData.json(); // pasamos esa info a json para poder usarla

    // Todo lo que queremos está en results, que es un array de 10 posiciones.
    let datos = data.results;
    let preguntas = []; // aquí se guardarán todas las preguntas del quiz
    let respuestas_correctas = []; // aquí se guardarán todas las respuestas correctas
    let respuestas_incorrectas = []; // aquí se guardarán todas las respuestas incorrectas (solo para enseñarlas en el quiz) siempre serán 3

    for (let i = 0; i < datos.length; i++) { // se itera sobre el .json para acceder a todos los datos de cada pregunta. ESTO HAY QUE REFACTORIZARLO A MAP aunque hacer esto es innecesario porque los datos ya los tenemos, ya están aquí.
        preguntas.push(datos[i].question); // devuelve un string con la pregunta
        respuestas_correctas.push(datos[i].correct_answer); // devuelve un string con la respuesta correcta
        respuestas_incorrectas.push(datos[i].incorrect_answers); // devuelve un array de strings con las opciones incorrectas

        
        document.getElementById("quiz").innerHTML = `
        <fieldset>

            <legend>${preguntas[0]}</legend>

            <label for="option1" id="labelOption1">${respuestas_correctas[0]}</label>
            <input type="radio" name="option" id="option1" value="${respuestas_correctas[0]}">

            <label for="option2" id="labelOption2">${respuestas_incorrectas[0][0]}</label>
            <input type="radio" name="option" id="option2" value="${respuestas_incorrectas[0][0]}">
           
            <label for="option3" id="labelOption3">${respuestas_incorrectas[0][1]}</label>
            <input type="radio" name="option" id="option3" value="${respuestas_incorrectas[0][1]}">

            <label for="option4" id="labelOption4">${respuestas_incorrectas[0][2]}</label>
            <input type="radio" name="option" id="option4" value="${respuestas_incorrectas[0][2]}">

        </fieldset>`

        let labels = document.getElementsByTagName("label"); // Para darles addEventListener al hacer click
        let preguntasRespondidas = []; // Para almacenar inputs y hacer validaciones. Se guardan las respuestas del usuario y se contrastan los valores de cada posicion con `respuestas_correctas`
        let respuestasAcertadas = "Incorrecto";

        // Esto hay que refactorizarlo (for + push = .map)
        for (let j = 0; j < labels.length; j++) {

            labels[j].addEventListener("click", function () {
                console.log(document.getElementById(`option${j + 1}`).value);
                // si la posicion [0][1] ó [0][2] de respuestas incorrectas son strings formados por mas de 1 palabra sólo captura la primera
                preguntasRespondidas.push(document.getElementById(`option${j + 1}`).value);
                console.log(preguntasRespondidas);
                if (respuestas_correctas[j] == preguntasRespondidas[j]) {
                    respuestasAcertadas = "¡Correcto!";
                }
                console.log(respuestasAcertadas)
            });
        };


    };

    console.log(preguntas.length);
    console.log("Preguntas:", preguntas);
    console.log("Respuestas correctas:", respuestas_correctas);
    console.log("Respuestas incorrectas:", respuestas_incorrectas);
    console.log("Primera respuesta correcta:", datos[0].correct_answer);
    /***** Segundo paso: Pintar el DOM con las preguntas y respuestas *****/
    // PINTAR ESTO CON UNA NUEVA PREGUNTA Y RESPUESTAS CADA VEZ QUE SE MARQUE UNA OPCIÓN DE LA PREGUNTA ANTERIOR
    // OPCION 1 CAPTURAR RESPUESTA Y GUARDAR EN ARRAY PARA CONTRASTAR Y REPINTAR PREGUNTA + RESPUESTAS
    // Tips: El for del label == id del input para asociarlo.

    /***** Tercer paso: A cada click, capturar la respuesta en un array "preguntasRespondidas" y pasar a la siguiente pregunta y push en un  para comparar en la validación final *****/
    // Si la respuesta se ha contestado, da igual si bien o mal, se guarda la respuesta y pintamos nueva pregunta en el DOM

    /** Cuarto paso: Validación, tras responder a las 10 preguntas se cotejan los arrays y se da un resultado */
    // VALIDACION --> como guardamos todos los valores de las respuestas que selecciona el usuario (correctas o incorrectas) en un array
}
quiz();