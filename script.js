// ADRI

/***** Primer paso *****/

    //Arrancando desde una estructura HTML, dar vida a los click para empezar el tinglao */

    let labels = document.getElementsByTagName("label"); // Para darles addEventListener al hacer click
    let respuestas = []; // Para almacenar inputs y hacer validaciones

    for (let i = 0; i < labels.length; i++) {

        labels[i].addEventListener("click", function () {

            respuestas.push(document.getElementById("jayz1").value) // Aquí de momento sólo funciona con la respuesta 1, sería conveniente darles a todos los inputs el name del fieldset para a cada click directamente recoger el value del input seleccionado

            console.log(respuestas);

            alert("funciono"); // Aquí llamaríamos a la funcion que desencadene la validación

        });
    };
}

quiz();

/***** Segundo paso *****/

// Aquí iría la lógica de validación:
// Respuesta buena o mala, comparamos y pintamos siguiente pregunta (tercer paso)
// Pero si no está contestada, aviso y mantenemos aquí

/***** Tercer paso *****/

// Si la respuesta se ha contestado, bien o mal, pintamos nueva pregunta en el DOM
=======
`<fieldset> // PINTAR ESTO CON UNA NUEVA PREGUNTA Y RESPUESTAS CADA VEZ QUE SE MARQUE UNA OPCIÓN DE LA PREGUNTA ANTERIOR
    <legend>
        <article>
            <label for=""></label> // OPCION 1 CAPTURAR RESPUESTA Y GUARDAR EN ARRAY PARA CONTRASTAR Y REPINTAR PREGUNTA + RESPUESTAS
            <input type="text">
        </article>
    </legend>
</fieldset>` 

// PABLO

async function pintarPreguntas () {
    let allData = await fetch("https://opentdb.com/api.php?amount=10&category=19&type=multiple") // cogemos toda la info de la API
    let data = await allData.json(); // pasamos esa info a json para poder usarla

        let preguntas = []; // aquí se guardarán todas las preguntas del quiz
        let respuestas_correctas = []; // aquí se guardarán todas las respuestas correctas
        let respuestas_incorrectas = []; // aquí se guardarán todas las respuestas incorrectas (solo para enseñarlas en el quiz) siempre serán 3

        for (let i = 0; i < data.results.length; i++) { // se itera sobre el .json para acceder a todos los datos de cada pregunta

            preguntas.push(data.results[i].question); // devuelve un string con la pregunta
            respuestas_correctas.push(data.results[i].correct_answer); // devuelve un string con la respuesta correcta
            respuestas_incorrectas.push(data.results[i].incorrect_answers); // devuelve un array de strings con las opciones incorrectas

        };
        console.log(preguntas);
        console.log(respuestas_correctas);
        console.log(respuestas_incorrectas);

    };


            // VALIDACION --> como guardamos todos los valores de las respuestas que selecciona el usuario (correctas o incorrectas) en un array

            const preguntasRespondidas = []; // se guardan las respuestas del usuario y se contrastan los valores de cada posicion con `respuestas_correctas`
