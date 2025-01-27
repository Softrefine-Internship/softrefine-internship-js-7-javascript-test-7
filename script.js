// script.js
const API_CATEGORY_URL = "https://opentdb.com/api_category.php";
getCategory();

async function getCategory() {
  const response = await fetch(API_CATEGORY_URL); // Use a different variable name, e.g., 'response'
  const data = await response.json(); // Use 'response' here
  
  console.log(data.trivia_categories);
  return data.trivia_categories;
}
