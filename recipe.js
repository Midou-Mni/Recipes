// VARIABLES
let inptSearchEl = document.querySelector('#inptSearch');
let btnSearchEl = document.querySelector('#btnSearch');
let resultAreaEl = document.querySelector('.resultArea');
let btnRecipeEl = document.querySelector('.btnRecipe');
let recipeDetailsEl = document.querySelector('.recipeDetails');

//EVENTS
btnSearchEl.addEventListener('click', clickSearch);
resultAreaEl.addEventListener('click', clickGet);
recipeDetailsEl.addEventListener('click', closeDetails);

//FUNCTIONS
function clickSearch(){
    let inptValue = inptSearchEl.value.trim();
    let apiUrl = `https://www.themealdb.com/api/json/v2/1/search.php?s=${inptValue}`;

    fetch(apiUrl)
        .then((res)=>{
            if(res.ok){
                return res.json();
            }
        })
        .then((data)=>{
            // console.log(data);
            displayRecipes(data);
        })
}

function displayRecipes(dataRecipe){
    resultAreaEl.innerHTML = "";

    if(dataRecipe.meals === null){
        resultAreaEl.innerHTML = "No recipes for this choice";
        return;
    }

    const recipesHtml = dataRecipe.meals.map((recipe)=>
        `
            <div class="card">
                <div class="divimg">
                        <img class="resultimg" src="${recipe.strMealThumb}">
                </div>
                <h1 class="title">${recipe.strMeal}</h1>
                <button class="btnRecipe" data-id=${recipe.idMeal}>Get Recipe</button>
            </div>
        `
    );
    resultAreaEl.innerHTML += recipesHtml.join('');
}

function clickGet(event){
    if(event.target.classList.contains('btnRecipe')){
        let a = document.querySelector('.recipeDetails');
        a.classList.remove('showDetails');
        let id = event.target.getAttribute('data-id');
        let  apiUrl2 = `https://www.themealdb.com/api/json/v2/1/lookup.php?i=${id}`;

        fetch(apiUrl2)
            .then((res)=>{
                if(res.ok){
                    return res.json();
                }
            })
            .then((data)=>{
                // console.log(data);
                displayDetails(data);
            })
    }
}
    
function displayDetails(item){
    // console.log(item);
    recipeDetailsEl.innerHTML = "";
    item.meals.forEach((line)=> {
        recipeDetailsEl.innerHTML += `
            <div class="divRecipe">
                <button class="btnDetails">
                    <img class="imgDetails" src="bx-caret-left-square.svg">
                </button>
                <h2>${line.strMeal}</h2>
                <img class="detailsImg" src="${line.strMealThumb}">
                <h4>Instructions: </h4>
                <span class="spanDetails">
                    ${line.strInstructions}
                </span><br><br>
                <a class="aDetails" href="${line.strYoutube}">Watch video</a>
            </div>
        `;
    })
}

function closeDetails(a){
    if(a.target.classList.contains('btnDetails')){
        let b = document.querySelector('.recipeDetails');
        b.classList.add('showDetails');
    }
}