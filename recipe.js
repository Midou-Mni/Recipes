
// Variables
let inptSearchEl = document.querySelector('#inptSearch');
let btnSearchEl = document.querySelector('#btnSearch');
let resultAreaEl = document.querySelector('.resultArea');
let recipeDetails = document.querySelector('recipeDetails');


// Events
btnSearchEl.addEventListener('click', getRecipesFc);
resultAreaEl.addEventListener('click', getDetails);

function getRecipesFc() {
    let searchValue = inptSearchEl.value.trim();
    let apiUrl = `https://www.themealdb.com/api/json/v2/1/search.php?s=${searchValue}`;


    fetch(apiUrl)
    .then(
        function (res){
            if(res.ok){return res.json();}
        }
    )
    
    .then(
        function (data){
            console.log(data)
            displayRecipes(data);
        }
    )   
}

function displayRecipes(recipes){
        resultAreaEl.innerHTML = "";
        if(recipes.meals == null){
            resultAreaEl.innerHTML = "No Recipes for this category";
            return;
        }

        recipes.meals.forEach( (recipe) => {
            resultAreaEl.innerHTML += `
                <div class="card">
                <div class="divimg">
                        <img class="resultimg" src="${recipe.strMealThumb}">
                </div>
                    <h1 class="title">${recipe.strMeal}</h1>
                    <a href="" class="btnRecipe btnGetRecipe" data-id=${recipe.idMeal}>Get Recipe</a>
                </div>
            `
        })
}

function getDetails(e) {
    if(e.target.classList.contains('btnGetRecipe')){
        let id = e.target.getAttribute('data-id');
        let apiUrl = `https://www.themealdb.com/api/json/v2/1/lookup.php?i=${id}`;

        fetch(apiUrl)
        .then(
            function (res){
                if(res.ok){return res.json();}
            }
        )

        .then(
            function (data){
                console.log(data)
                displayDetails(data);
            }
        )
    }
}

function displayDetails(recipItem){
    let item = recipItem.meals[0];
    recipeDetails.classList.remove('showDetails');
    recipeDetails.innerHTML = "";

    recipeDetails.innerHTML = `
        <div class="divRecipe">
            <button class="btnDetails">
                <img class="imgDetails" src="bx-exit.svg">
            </button>
            <h2>${item.strMeal}</h2>
            <h4>Instructions: </h4>
            <p>${item.strInstructions}</p>
            <br>
            <a class="aDetails" href="${item.strYoutube}">Watch video</a>
        </div>
    `
}