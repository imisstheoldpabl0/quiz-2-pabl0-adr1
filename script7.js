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
    

    for (let i = 0; i < preguntas.length; i++) {

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
        let preguntasRespondidas = [];

        for (let j = 0; j < labels.length; j++) {

            labels[j].addEventListener("click", function () {

                preguntasRespondidas.push(document.getElementById(`option${j + 1}`).value);

                console.log(preguntasRespondidas);

                if (respuestas_correctas[i] == preguntasRespondidas[i]) {
                    console.log("¡Correcto!");
                    aciertos += 1;
                }
                else{
                console.log("Incorrecto")
                }
            });
        };
    }
}

quiz();