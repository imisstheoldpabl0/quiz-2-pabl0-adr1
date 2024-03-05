/* Hay que hacer la llamada a la funcion desde el principio */
async function quiz() {
    let call = fetch("https://opentdb.com/api.php?amount=10&category=9");
    let data = data.json();

    let preguntas = [];
    let respuestas_correctas = [];
    let respuestas_incorrectas = [];

    preguntas.map(function (data) {
        data.results.question;
    })


    for (let i = 0; data.results.length; i++) {
        preguntas.push(data.results[i]).question;
        respuestas_correctas.push(data.results[i].correct_answer)
        respuestas_incorrectas.push(data.results[i].correct_answer)
    }

    document.getElementById("quiz").innerHTML =
        `<fieldset> 
            <legend class="title" for="pregunta">${data.results[0].question}</legend>
            <article class="answer_container">
                <label for=""></label>
                <input type="text">
            </article>
        </legend>
        </fieldset>`

        /** <legend class="title" for="pregunta1">1. ¿A cuál de estos raperos pertenece el album "My Beautiful Dark
                Twisted Fantasy"?</legend>


            <label id="labeljayz1" for="jayz1">Jay-z</label>
            <input id="jayz1" type="radio" name="pregunta1" value="jayz">


            <label for="eminem1">Eminem</label>
            <input id="eminem1" type="radio" name="pregunta1" value="eminem1">


            <label for="kanye1">Kanye West</label>
            <input id="kanye1" type="radio" name="pregunta1" value="kanye1">


            <label for="kodak1">Kodak Black</label>
            <input id="kodak1" type="radio" name="pregunta1" value="kodak1"> */
    )

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