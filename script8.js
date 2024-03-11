async function quiz() {

    let allData = await fetch("./local/json")
    let data = await allData.json();

    let datos = data.results;

    let preguntas = []; // se guardan todas las preguntas
    let correctas = []; // se guardan las opciones correctas
    let respuestas = []; // se guardan las respuestas del usuario



    let contenedorQuiz = document.getElementById("quiz");
    let numPregunta = 0; // se inicia el index en 0

    function setupLabels() {
        let labels = document.getElementsByTagName("label"); // se hace target al quiz

        for (let i = 0; i < labels.length; i++) { // se itera sobre los labels
            labels[i].addEventListener("click", function () {
                let opcion = document.getElementById(`option${i}`).value; // mapea la opción con el valor: de la opcion0 a la opcion3
                preguntasRespondidas.push(opcion); // .push de la opcion marcada al array de preguntasRespondidas

                if (opcion = correctas) { // verificacion por consola
                    console.log("Correcto!");
                } else {
                    console.log("Incorrecto!");
                }

                numPregunta++;

                if (numPregunta < datos.length) {
                    contenedorQuiz.innerHTML = '';
                    contenedorQuiz.innerHTML = `
                    <fieldset>
                        <legend>${preguntaActual.question}</legend>
                        
                        <label for="option1">${preguntaActual.correct_answer}</label>
                        <input type="radio" name="question${i}" id="option0" value="${preguntaActual.correct_answer}">
                        
                        <label for="option1">${preguntaActual.correct_answer}</label>
                        <input type="radio" name="question${i}" id="option1" value="${preguntaActual.correct_answer}">
            
                        <label for="option1">${preguntaActual.correct_answer}</label>
                        <input type="radio" name="question${i}" id="option2" value="${preguntaActual.correct_answer}">
            
                        <label for="option1">${preguntaActual.correct_answer}</label>
                        <input type="radio" name="question${i}" id="option3" value="${preguntaActual.correct_answer}">
                        
                    </fieldset>`;

                }

            })
        }
    }

    for (let j = 0; j < datos.length; j++) {
        preguntas.push(datos[i].question); // .push de todas las preguntas
        respuestas[i].push(datos[i].correct_answer); // .push de todas las respuestas correctas
        respuestas.push(datos[i].incorrect_answers); // .push de todas las respuestas incorrectas

        let preguntaActual = datos[i];

        let preguntaHTML = `
        <fieldset>
            <legend>${preguntaActual.question}</legend>
            
            <label for="option1">${preguntaActual.correct_answer}</label>
            <input type="radio" name="question${i}" id="option0" value="${preguntaActual.correct_answer}">
            
            <label for="option1">${preguntaActual.incorrect_answers[0]}</label>
            <input type="radio" name="question${i}" id="option1" value="${preguntaActual.incorrect_answers[0]}">

            <label for="option1">${preguntaActual.incorrect_answers[1]}</label>
            <input type="radio" name="question${i}" id="option2" value="${preguntaActual.incorrect_answers[1]}">

            <label for="option1">${preguntaActual.incorrect_answers[2]}</label>
            <input type="radio" name="question${i}" id="option3" value="${preguntaActual.incorrect_answers[2]}">
            
        </fieldset>`;

        contenedorQuiz.innerHTML += preguntaHTML;
        
    }


}