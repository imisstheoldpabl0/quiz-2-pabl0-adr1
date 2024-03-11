async function quiz() {
    let allData = await fetch("local.json");
    let data = await allData.json();

    let datos = data.results;
    let preguntas = [];
    let correctas = [];
    let incorrectas = [];

    let quizContainer = document.getElementById("quiz");
    let questionIndex = 0;

    function setupEventListeners() {
        let labels = document.getElementsByTagName("label");

        
        for (let j = 0; j < labels.length; j++) {
            labels[j].addEventListener("click", function () {
                let selectedOption = document.getElementById(`option${j + 1}`).value;
                preguntasRespondidas.push(selectedOption);
                let correctAnswer = correctas[questionIndex];

                if (selectedOption === correctAnswer) {
                    console.log("¡Correcto!");
                } else {
                    console.log("Incorrecto");
                }

                questionIndex++;

                if (questionIndex < datos.length) {
                    quizContainer.innerHTML = ''; // Clear previous question
                    quizContainer.innerHTML = `
                        <fieldset>
                            <legend>${preguntas[questionIndex]}</legend>
                            <label for="option1">${correctas[questionIndex]}</label>
                            <input type="radio" name="question${questionIndex}" id="option1" value="${correctas[questionIndex]}">
                            <label for="option2">${incorrectas[questionIndex][0]}</label>
                            <input type="radio" name="question${questionIndex}" id="option2" value="${incorrectas[questionIndex][0]}">
                            <label for="option3">${incorrectas[questionIndex][1]}</label>
                            <input type="radio" name="question${questionIndex}" id="option3" value="${incorrectas[questionIndex][1]}">
                            <label for="option4">${incorrectas[questionIndex][2]}</label>
                            <input type="radio" name="question${questionIndex}" id="option4" value="${incorrectas[questionIndex][2]}">
                        </fieldset>`;
                    setupEventListeners(); // Setup event listeners again for the new question
                } else {
                    console.log("Quiz completed!");
                }
            });
        }
    }

    for (let i = 0; i < datos.length; i++) {
        preguntas.push(datos[i].question);
        correctas.push(datos[i].correct_answer);
        incorrectas.push(datos[i].incorrect_answers);

        let currentQuestion = datos[i];

        let questionHTML = `
            <fieldset>
                <legend>${currentQuestion.question}</legend>
                <label for="option1">${currentQuestion.correct_answer}</label>
                <input type="radio" name="question${i}" id="option1" value="${currentQuestion.correct_answer}">
                <label for="option2">${currentQuestion.incorrect_answers[0]}</label>
                <input type="radio" name="question${i}" id="option2" value="${currentQuestion.incorrect_answers[0]}">
                <label for="option3">${currentQuestion.incorrect_answers[1]}</label>
                <input type="radio" name="question${i}" id="option3" value="${currentQuestion.incorrect_answers[1]}">
                <label for="option4">${currentQuestion.incorrect_answers[2]}</label>
                <input type="radio" name="question${i}" id="option4" value="${currentQuestion.incorrect_answers[2]}">
            </fieldset>`;

        quizContainer.innerHTML += questionHTML;
    }

    let preguntasRespondidas = [];
    setupEventListeners(); // Setup event listeners for the initial questions
}

quiz();
