// Database
const quesJSON = [
  {
    correctAnswer: "Three ",
    options: ["Two", "Three ", "Four", "Five"],
    question: "How many pieces of bun are in a Mcdonald's Big Mac?",
  },
  {
    correctAnswer: "L. Frank Baum",
    options: [
      "Suzanne Collins",
      "James Fenimore Cooper",
      "L. Frank Baum",
      "Donna Leon",
    ],
    question: "Which author wrote 'The Wonderful Wizard of Oz'?",
  },
  {
    correctAnswer: "Atlanta United",
    options: [
      "Atlanta United",
      "Atlanta Impact",
      "Atlanta Bulls",
      "Atlanta Stars",
    ],
    question: "Which of these is a soccer team based in Atlanta?",
  },
  {
    correctAnswer: "A Nanny",
    options: ["A Sow", "A Lioness", "A Hen", "A Nanny"],
    question: "A female goat is known as what?",
  },
  {
    correctAnswer: "P. L. Travers",
    options: [
      "J. R. R. Tolkien",
      "P. L. Travers",
      "Lewis Carroll",
      "Enid Blyton",
    ],
    question: "Which author wrote 'Mary Poppins'?",
  },
];

let currentQuestion = 0;
let score = 0;

// getting the elements for each div
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const NextEl = document.getElementById("next");
const btnEl = document.getElementById("btn");

NextEl.addEventListener("click", () => {
  currentQuestion++;
  scoreEl.textContent = `Score: ${score}`;
  optionsEl.textContent = "";
  if (currentQuestion >= quesJSON.length) {
    NextEl.textContent = "";
    btnEl.textContent = "";
    questionEl.textContent = "Quiz Completed!";
  }
  showQuestion();
});

//shuffle the options
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
showQuestion();
function showQuestion() {
  // Destructuring the object
  const { correctAnswer, options, question } = quesJSON[currentQuestion];
  // displaying the question
  questionEl.textContent = question;
  shuffle(options);
  options.forEach((option) => {
    const button = document.createElement("button");

    // Add text to the button
    button.textContent = option;

    // Append the button to the container
    optionsEl.appendChild(button);

    // Add a click event listener to the button
    button.addEventListener("click", () => {
      if (option === correctAnswer) {
        score++;
      } else {
        score = score - 0.25;
      }
      if (currentQuestion < quesJSON.length - 1) {
        scoreEl.textContent = `Score: ${score}`;
        optionsEl.textContent = "";
        currentQuestion++;
        showQuestion();
      } else {
        questionEl.textContent = "Quiz Completed!";
        optionsEl.textContent = "";
        scoreEl.textContent = `Score: ${score}`;
      }
    });
  });
}
