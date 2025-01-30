const categoryList = document.getElementById("category-list");
const sciencesTopicsListDiv = document.getElementById("science-link-list");
const entertainmentsTopicsListDiv = document.getElementById(
  "entertainment-link-section"
);
const selectType = document.getElementById("type");
const selectDifficulty = document.getElementById("difficulty");
const othersTopicsListDiv = document.getElementById("others-link-section");
const questionSpan = document.getElementById("question-span");
const questionNumberSpan = document.getElementById("question-number");
const paginationDiv = document.getElementsByClassName("pagination");
const loader = document.getElementById("loader");
// console.log(loader);

const indexDashboard = document.getElementById("index-dashboard");
const option1 = document.getElementById("op1");
const option2 = document.getElementById("op2");
const option3 = document.getElementById("op3");
const option4 = document.getElementById("op4");
const API_CATEGORY_URL = "https://opentdb.com/api_category.php";
let API_QUESTION_URL =
  "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=boolean";

const entertainmentArr = [];
let score = 0;
const entertainmentIdArr = [];
const othersArr = [];
const othersIdArr = [];
const scienceArr = [];
const scienceIdArr = [];
const questionArr = [];
let categoriesArr = [];
const correctAnswerArr = [];
const userAnswerArr = [];
let paginationChildren = [];
const optionsArr = [];
let currentPageNumber = 0;
initialize();
async function initialize() {
  categoriesArr = await getCategory();

  if (
    !document.location.pathname.includes("quiz.html") &&
    !document.location.pathname.includes("result.html")
  ) {
    // console.log("Hi from home page");
    categoriesFiller();
    addTitleToCategoryList();
  } else if (document.location.pathname.includes("quiz.html")) {
    JSON.parse(localStorage.getItem("questions"));
    getQuestions();
    setQuestion();
    paginationChildren = Array.from(paginationDiv[0].children);
    // console.log(paginationChildren);
    setPagination(0, 0);
  } else {
    console.log("Hi there");
    displayResults();
    getScore();

    // Set the score on page load
    document.addEventListener("DOMContentLoaded", function () {
      const score = displayResults();
      document.getElementById("scoreValue").textContent = score;
    });
    function getScore() {
      const userAnswers = JSON.parse(localStorage.getItem("userAnswers"));
      console.log(userAnswers);

      const correctAnswers = JSON.parse(localStorage.getItem("correctAnswers"));
      console.log(correctAnswers);
      // score = 0;
      for (let index = 0; index < 10; index++) {
        console.log(userAnswers[index] === correctAnswers[index]);

        if (userAnswers[index] === correctAnswers[index]) {
          score += 1;
        }
      }
      console.log(score);
      document.getElementById("scoreValue").innerHTML = score;
    }
    // Function to display the correct answers and user's answers
    function displayResults() {
      // getScore();
      const userAnswers = JSON.parse(localStorage.getItem("userAnswers"));
      console.log(userAnswers);

      const correctAnswers = JSON.parse(localStorage.getItem("correctAnswers"));
      const questionCurrentArr = JSON.parse(localStorage.getItem("questions"));
      console.log(correctAnswers);
      const resultsContainer = document.getElementById("results-container");
      resultsContainer.innerHTML = "";
      correctAnswers.forEach((answer, index) => {
        const resultItem = document.createElement("div");
        resultItem.className = "result-item";
        resultItem.innerHTML = `
      <p>Question ${index + 1}:${questionCurrentArr[index].question}</p>
      <p>Your Answer: ${userAnswers[index] ?? ""}</p>
      <p>Correct Answer: ${answer}</p>
    `;
        resultsContainer.appendChild(resultItem);
      });
    }

    // Call displayResults on page load
    document.addEventListener("DOMContentLoaded", function () {
      displayResults();
    });

    // Add event listener to the "Play Again" button
  }
}
// initialize();
// ---------------------------------------------------------------------

async function getCategory() {
  const response = await fetch(API_CATEGORY_URL);
  const data = await response.json();
  const arr = [];
  for (let i = 0; i < data.trivia_categories.length; i++) {
    arr.push(data.trivia_categories[i].name);
  }
  return arr;
}

function categoriesFiller() {
  let id = 9;
  for (let i = 0; i < categoriesArr.length; i++) {
    const element = categoriesArr[i];
    if (element.includes("Entertainment:")) {
      entertainmentArr.push(element.slice(15, element.length));
      entertainmentIdArr.push(id);
    } else if (element.includes("Science:")) {
      scienceArr.push(element.slice(8, element.length));
      scienceIdArr.push(id);
    } else {
      othersArr.push(element);
      othersIdArr.push(id);
    }
    id++;
  }
}

function addTitleToCategoryList() {
  sciencesTopicsListDiv.innerText = "";
  othersTopicsListDiv.innerText = "";
  loader.classList.add("hidden");
  indexDashboard.classList.remove("hidden");
  entertainmentsTopicsListDiv.innerText = "";
  for (let i = 0; i < scienceArr.length; i++) {
    const element = scienceArr[i];
    const aTag = document.createElement("a");
    aTag.className = "category-item";
    aTag.id = scienceIdArr[i];
    aTag.addEventListener("click", () => {
      makeAPIcall(aTag.id);
    });
    aTag.innerHTML = `
              <span class="category-title">${element}</span>
              <span class="category-title-icon"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                  class="category-title-icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </span>
            `;
    sciencesTopicsListDiv.append(aTag);
  }
  for (let i = 0; i < entertainmentArr.length; i++) {
    const element = entertainmentArr[i];
    const aTag = document.createElement("a");
    aTag.className = "category-item";
    aTag.addEventListener("click", () => {
      makeAPIcall(aTag.id);
    });
    aTag.id = entertainmentIdArr[i];
    aTag.innerHTML = `
              <span class="category-title">${element}</span>
              <span class="category-title-icon"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                  class="category-title-icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </span>
            `;
    entertainmentsTopicsListDiv.append(aTag);
  }
  for (let i = 0; i < othersArr.length; i++) {
    const element = othersArr[i];
    const aTag = document.createElement("div");
    aTag.className = "category-item";
    aTag.addEventListener("click", () => {
      makeAPIcall(aTag.id);
    });
    aTag.id = othersIdArr[i];
    aTag.innerHTML = `
              <span class="category-title">${element}</span>
              <span class="category-title-icon"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                  class="category-title-icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </span>
            `;
    othersTopicsListDiv.append(aTag);
  }
}

function makeAPIcall(id) {
  // console.log(id);
  if (id == 19 || id == 13 || (id == 24 && selectType.value == "multiple")) {
    API_QUESTION_URL = `https://opentdb.com/api.php?amount=10&category=${id}&difficulty=medium&type=${selectType.value}`;
  } else {
    API_QUESTION_URL = `https://opentdb.com/api.php?amount=10&category=${id}&difficulty=${selectDifficulty.value}&type=${selectType.value}`;
  }
  // console.log(API_QUESTION_URL);
  fetch(API_QUESTION_URL).then(async (res) => {
    const data = await res.json();
    // console.log(data);
    localStorage.setItem("questions", JSON.stringify(data.results));
    window.location.href = "quiz.html";
  });
}

function getQuestions() {
  const data = JSON.parse(localStorage.getItem("questions"));
  for (let i = 0; i < data.length; i++) {
    const element = data[i];

    correctAnswerArr.push(element.correct_answer);
    optionsArr.push(
      [...element.incorrect_answers, element.correct_answer].sort(
        () => Math.random() - 0.5
      )
    );
    questionArr.push(element.question);
  }
}
function setQuestion() {
  questionNumberSpan.innerHTML = `${currentPageNumber + 1}.`;
  const currentQuestion = questionArr[currentPageNumber];
  questionSpan.innerHTML = `${currentQuestion}`;

  const options = [option1, option2, option3, option4];

  options.forEach((option, index) => {
    const optionContent = optionsArr[currentPageNumber][index];
    if (optionContent !== undefined) {
      option.style.display = "block";
      option.innerHTML = `
        <input type="radio" id="option${index + 1}" name="quiz-option"
          onchange="optionSelected()" value="${optionContent}"
          ${userAnswerArr[currentPageNumber] === optionContent ? "checked" : ""}
        />
        <span class="checkmark"></span> ${optionContent}`;
    } else {
      option.style.display = "none"; // Hide the option if not available
    }
  });
}

function optionSelected() {
  const options = document.getElementsByName("quiz-option");
  let selectedOption;
  for (let i = 0; i < options.length; i++) {
    const element = options[i];
    if (element.checked) {
      selectedOption = element.value;
    }
  }
  userAnswerArr[currentPageNumber] = selectedOption;
  console.log(userAnswerArr);
}
function nextQuestion() {
  if (currentPageNumber < 9) {
    setPagination(currentPageNumber, currentPageNumber + 1);
    currentPageNumber++;
    setQuestion();
    document.getElementById("prev-btn").classList.remove("disabled");
  }
  if (currentPageNumber === 9) {
    document.getElementById("submit-btn").classList.remove("hidden");
    document.getElementById("next-btn").classList.add("hidden");
  }
}

function prevQuestion() {
  if (currentPageNumber > 0) {
    if (currentPageNumber <= 9) {
      document.getElementById("next-btn").classList.remove("hidden");
      document.getElementById("submit-btn").classList.add("hidden");
    } else {
    }
    setPagination(currentPageNumber, currentPageNumber - 1);

    currentPageNumber--;
    setQuestion();
    document.getElementById("next-btn").classList.remove("disabled");
  }
  if (currentPageNumber === 0) {
    document.getElementById("prev-btn").classList.add("disabled");
  }
}

function setPagination(prev, next) {
  paginationChildren[prev].classList.remove("active");
  paginationChildren[next].classList.add("active");
}

function setPaginationJumping(e) {
  paginationChildren[currentPageNumber].classList.remove("active");
  paginationChildren[parseInt(e)].classList.add("active");
  currentPageNumber = parseInt(e);
  setQuestion();

  if (currentPageNumber === 0) {
    document.getElementById("prev-btn").classList.add("disabled");
  } else {
    document.getElementById("prev-btn").classList.remove("disabled");
  }

  if (currentPageNumber === 9) {
    document.getElementById("submit-btn").classList.remove("hidden");
    document.getElementById("next-btn").classList.add("hidden");
  } else {
    document.getElementById("submit-btn").classList.add("hidden");
    document.getElementById("next-btn").classList.remove("hidden");
  }
}
function goToResult() {
  localStorage.setItem("userAnswers", JSON.stringify(userAnswerArr));
  localStorage.setItem("correctAnswers", JSON.stringify(correctAnswerArr));
  window.location.href = "result.html";
}

function playNewQuiz() {
  window.location.href = "index.html";
}
