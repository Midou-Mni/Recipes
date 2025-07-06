// ELEMENTS
const inptSearchEl = document.querySelector('#inptSearch');
const btnSearchEl = document.querySelector('#btnSearch');
const resultAreaEl = document.querySelector('.resultArea');
const recipeDetailsEl = document.querySelector('.recipeDetails');

// EVENTS
btnSearchEl.addEventListener('click', () => {
  const query = inptSearchEl.value.trim();
  if (query) fetchRecipes(query);
});

resultAreaEl.addEventListener('click', (e) => {
  if (e.target.classList.contains('btnRecipe')) {
    const id = e.target.getAttribute('data-id');
    fetchRecipeDetails(id);
  }
});

recipeDetailsEl.addEventListener('click', (e) => {
  if (e.target.closest('.btnDetails')) {
    recipeDetailsEl.classList.remove('showDetails');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  fetchRecipes('');
});

// FUNCTIONS
function fetchRecipes(query) {
  fetch(`https://www.themealdb.com/api/json/v2/1/search.php?s=${query}`)
    .then(res => res.ok && res.json())
    .then(data => displayRecipes(data));
}

function displayRecipes(data) {
  resultAreaEl.innerHTML = '';
  if (!data.meals) {
    resultAreaEl.innerHTML = '<p>No recipes found.</p>';
    return;
  }

  data.meals.forEach(meal => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <h1>${meal.strMeal}</h1>
      <button class="btnRecipe" data-id="${meal.idMeal}">View Recipe</button>
    `;
    resultAreaEl.appendChild(card);
  });
}

function fetchRecipeDetails(id) {
  fetch(`https://www.themealdb.com/api/json/v2/1/lookup.php?i=${id}`)
    .then(res => res.ok && res.json())
    .then(data => showRecipeDetails(data.meals[0]));
}

function showRecipeDetails(meal) {
  recipeDetailsEl.innerHTML = `
    <button class="btnDetails" title="Close">
      <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
        <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
      </svg>
    </button>
    <h2>${meal.strMeal}</h2>
    <img class="detailsImg" src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <h4>Instructions:</h4>
    <span class="spanDetails">${meal.strInstructions}</span>
    <a class="aDetails" href="${meal.strYoutube}" target="_blank" rel="noopener noreferrer">Watch Video</a>
  `;
  recipeDetailsEl.classList.add('showDetails');
}
