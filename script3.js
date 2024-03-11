
async function quiz() {

    let allData = await fetch("local.json") 
    let data = await allData.json(); 

    let datos = data.results;
    let preguntas = []; 
    let correctas = []; 
    let incorrectas = [];

    let labels = document.getElementsByTagName("label"); 
    let preguntasRespondidas = []; 
    let respuestasAcertadas = "Incorrecto";

    for (let i = 0; i < datos.length; i++) {
        preguntas.push(datos[i].question);
        correctas.push(datos[i].correct_answer);
        incorrectas.push(datos[i].incorrect_answers);


        document.getElementById("quiz").innerHTML = `
        <fieldset>

            <legend>${preguntas[i]}</legend>

            <label for="option1" id="labelOption1">${correctas[i]}</label>
            <input type="radio" name="option" id="option1" value="${correctas[i]}">

            <label for="option2" id="labelOption2">${incorrectas[i][0]}</label>
            <input type="radio" name="option" id="option2" value="${incorrectas[i][0]}">
           
            <label for="option3" id="labelOption3">${incorrectas[i][1]}</label>
            <input type="radio" name="option" id="option3" value="${incorrectas[i][1]}">

            <label for="option4" id="labelOption4">${incorrectas[i][2]}</label>
            <input type="radio" name="option" id="option4" value="${incorrectas[i][2]}">

        </fieldset>`


        for (let j = 0; j < labels.length; j++) {

            labels[j].addEventListener("click", function () {
                console.log(document.getElementById(`option${j + 1}`).value);
                preguntasRespondidas.push(document.getElementById(`option${j + 1}`).value);
                console.log(preguntasRespondidas);
                if (correctas[j] == preguntasRespondidas[j]) {
                    respuestasAcertadas = "¡Correcto!";
                }
                console.log(respuestasAcertadas)
            });
        };

        console.log(preguntas.length);
        console.log("Preguntas:", preguntas[i]);
        console.log("Respuesta correctas:", correctas[i]);
        console.log("Respuestas incorrectas:", incorrectas[i]);

    };

}
quiz();