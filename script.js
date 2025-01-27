// script.js
const categoryList = document.getElementById("category-list");
const sciencesTopicsListDiv = document.getElementById("science-link-list");
const entertainmentsTopicsListDiv = document.getElementById(
  "entertainment-link-section"
);
const selectType = document.getElementById("type");
const selectDifficulty = document.getElementById("difficulty");
const othersTopicsListDiv = document.getElementById("others-link-section");

const API_CATEGORY_URL = "https://opentdb.com/api_category.php";
let API_QUESTION_URL =
  "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=boolean";

const categoriesArr = await getCategory();

const entertainmentArr = [];
const entertainmentIdArr = [];
const othersArr = [];
const othersIdArr = [];
const scienceArr = [];
const scienceIdArr = [];

categoriesFiller();
addTitleToCategoryList();

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
  for (let i = 0; i < scienceArr.length; i++) {
    const element = scienceArr[i];
    const aTag = document.createElement("a");
    aTag.className = "category-item";
    aTag.id = scienceIdArr[i];
    aTag.href = "quiz.html";
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
    aTag.href = "quiz.html";
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
    aTag.href = "quiz.html";
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

const makeAPIcall = function (id) {
  API_QUESTION_URL = `https://opentdb.com/api.php?amount=10&category=${id}&difficulty=${selectDifficulty.value}&type=${selectType.value}`;
  console.log(API_QUESTION_URL);
  fetch(API_QUESTION_URL).then((res) =>
    res.json().then((data) => console.log(data))
  );
};
