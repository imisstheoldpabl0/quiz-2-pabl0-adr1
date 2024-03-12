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
        document.getElementById("quiz").innerHTML = `
            <button id="again"><a href="#">Otra partida</a></button>
            <button id="verGrafica"><a href="#">Mostrar gráfica</a></button>`
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
    }


    function pintar(i) {

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




                    console.log(datosPartidas);

                    // alert(`Has acertado ${aciertos} de 10`)

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

quiz();