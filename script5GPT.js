async function quiz() {

    let allData = await fetch("local.json");
    let data = await allData.json();

    let datos = data.results;
    let currentQuestionIndex = 0;
    let correctas = datos.map(item => item.correct_answer);

    let quizContainer = document.getElementById("quiz");

    function displayQuestion(index) {
        let questionData = datos[index];
        let questionHTML = `
            <fieldset>
                <legend>${questionData.question}</legend>
                <label for="option1">${questionData.correct_answer}</label>
                <input type="radio" name="question${index}" id="option1" value="${questionData.correct_answer}">
        `;

        questionData.incorrect_answers.forEach((incorrectOption, i) => {
            questionHTML += `
                <label for="option${i + 2}">${incorrectOption}</label>
                <input type="radio" name="question${index}" id="option${i + 2}" value="${incorrectOption}">
            `;
        });

        questionHTML += `</fieldset>`;
        quizContainer.innerHTML = questionHTML;
    }

    function checkAnswer(event) {
        let selectedOption = event.target.value;

        if (correctas[currentQuestionIndex] === selectedOption) {
            console.log("¡Correcto!");
        } else {
            console.log("Incorrecto");
        }

        // Move to the next question
        currentQuestionIndex++;
        if (currentQuestionIndex < datos.length) {
            displayQuestion(currentQuestionIndex);
        } else {
            console.log("Quiz completed!"); // Quiz completed message
        }
    }

    displayQuestion(currentQuestionIndex);
    quizContainer.addEventListener("click", checkAnswer);
}

quiz();
