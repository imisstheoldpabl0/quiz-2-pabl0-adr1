async function quiz() {

    let allData = await fetch("local.json")
    let data = await allData.json();

    let datos = data.results;

    let preguntas = [];
    let correctas = [];
    let respuestas = [];
    let labels = document.getElementsByTagName("label");

    let preguntasRespondidas = [];


    for (let i = 0; i < datos.length; i++) {
        preguntas.push(datos[i].question);
        respuestas.push(datos[i].incorrect_answers);
        respuestas[i].push(datos[i].correct_answer);
    }


    let respuestasReordenadas = respuestas.map(respuesta => respuesta.sort());
    console.log(respuestasReordenadas);



        document.getElementById("quiz").innerHTML = `
        <fieldset>

            <legend>${preguntas[0]}</legend>

            <label for="option1" id="labelOption1">${respuestasReordenadas[0][0]}</label>
            <input type="radio" name="option" id="option1" value="${respuestasReordenadas[0][0]}">

            <label for="option2" id="labelOption2">${respuestasReordenadas[0][1]}</label>
            <input type="radio" name="option" id="option2" value="${respuestasReordenadas[0][1]}">
           
            <label for="option3" id="labelOption3">${respuestasReordenadas[0][2]}</label>
            <input type="radio" name="option" id="option3" value="${respuestasReordenadas[0][2]}">

            <label for="option4" id="labelOption4">${respuestasReordenadas[0][3]}</label>
            <input type="radio" name="option" id="option4" value="${respuestasReordenadas[0][3]}">

        </fieldset>`

        for (let j = 0; j < labels.length; j++) {

            labels[j].addEventListener("click", function () {
                console.log(document.getElementById(`option${j + 1}`).value);
                preguntasRespondidas.push(document.getElementById(`option${j + 1}`).value);
                console.log(preguntasRespondidas);
                if (correctas[i] == preguntasRespondidas[j]) {
                    console.log("¡Correcto!");

                } else {
                    console.log("Incorrecto");
                    
                }
                console.log(respuestasAcertadas)
            });
        }

    }
quiz();