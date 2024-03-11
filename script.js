/***** Primer paso: Llamada a la api y capturar en arrays preguntas y respuestas *****/

async function quiz() { // Se debería llamar quiz porque al final estamos llamando a la funcion quiz no?
    let allData = await fetch("https://opentdb.com/api.php?amount=10&category=19&type=multiple") // cogemos toda la info de la API
    let data = await allData.json(); // pasamos esa info a json para poder usarla

    // Todo lo que queremos está en results, que es un array de 10 posiciones.
    let datos = data.results;
    let preguntas = []; // aquí se guardarán todas las preguntas del quiz
    let respuestas_correctas = []; // aquí se guardarán todas las respuestas correctas
    let respuestas_incorrectas = []; // aquí se guardarán todas las respuestas incorrectas (solo para enseñarlas en el quiz) siempre serán 3
    for (let i = 0; i < data.results.length; i++) { // se itera sobre el .json para acceder a todos los datos de cada pregunta. ESTO HAY QUE REFACTORIZARLO A MAP aunque hacer esto es innecesario porque los datos ya los tenemos, ya están aquí.
        preguntas.push(data.results[i].question); // devuelve un string con la pregunta
        respuestas_correctas.push(data.results[i].correct_answer); // devuelve un string con la respuesta correcta
        respuestas_incorrectas.push(data.results[i].incorrect_answers); // devuelve un array de strings con las opciones incorrectas
    };
    console.log(preguntas);
    console.log(respuestas_correctas);
    console.log(respuestas_incorrectas);
    console.log(respuestas_incorrectas[0][0]);
    /***** Segundo paso: Pintar el DOM con las preguntas y respuestas *****/
    // PINTAR ESTO CON UNA NUEVA PREGUNTA Y RESPUESTAS CADA VEZ QUE SE MARQUE UNA OPCIÓN DE LA PREGUNTA ANTERIOR
    // OPCION 1 CAPTURAR RESPUESTA Y GUARDAR EN ARRAY PARA CONTRASTAR Y REPINTAR PREGUNTA + RESPUESTAS
    
    // en fieldset: for = "question[i]"
    
    // en label: for = "question[i]" --> hace referencia al input

    // en input: id = "question[i]" --> hace referencia al label
    // en input: id = "question[i]" --> hace referencia al label
    
    document.getElementById("quiz").innerHTML = 
        `<fieldset for="question1">

            <legend>${preguntas[0]}</legend>

            <label for="answer1" id="answer1">${respuestas_correctas[0]}</label>
            <input type="radio" name="question1" id="answer1" value="${respuestas_correctas[0]}"> 

            <label for="id=" answer2" id="answer2">${respuestas_incorrectas[0][0]}</label>
            <input type="radio" name="question1" id="answer2" value="${respuestas_incorrectas[0][0]}">

            <label for="id=" answer3" id="answer3">${respuestas_incorrectas[0][1]}</label>
            <input type="radio" name="question1" id="answer3" value=${respuestas_incorrectas[0][1]}>

            <label for="id=" answer4" id="answer4">${respuestas_incorrectas[0][2]}</label>
            <input type="radio" name="question1" id="answer4" value=${respuestas_incorrectas[0][2]}>

        </fieldset>` 



    /***** Tercer paso: A cada click, capturar la respuesta en un array "preguntasRespondidas" y pasar a la siguiente pregunta y push en un  para comparar en la validación final *****/
    // Si la respuesta se ha contestado, da igual si bien o mal, se guarda la respuesta y pintamos nueva pregunta en el DOM


    const preguntasRespondidas = []; // se guardan las respuestas del usuario y se contrastan los valores de cada posicion con `respuestas_correctas`

    let labels = document.getElementsByTagName("label"); // Para darles addEventListener al hacer click
    let respuestas = []; // Para almacenar inputs y hacer validaciones


    // Esto hay que refactorizarlo (for + push = .map)
    for (let i = 0; i < labels.length; i++) {
        labels[i].addEventListener("click", function () {
            preguntasRespondidas.push(document.getElementById(`answer1.value`)) // Aquí de momento sólo funciona con la respuesta 1, sería conveniente darles a todos los inputs el name del fieldset para a cada click directamente recoger el value del input seleccionado
            console.log(respuestas);
            alert("funciono"); // Aquí llamaríamos a la funcion que desencadene la validación
        });
    };

    console.log(preguntasRespondidas);
    /** Cuarto paso: Validación, tras responder a las 10 preguntas se cotejan los arrays y se da un resultado */
    // VALIDACION --> como guardamos todos los valores de las respuestas que selecciona el usuario (correctas o incorrectas) en un array
}
quiz();