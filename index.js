const btnSearch = document.querySelector("#btnSearch");
const resultDiv = document.querySelector("#resultDiv");
const clearResultDiv = () => {
  resultDiv.innerHTML = "";
};

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

btnSearch.addEventListener("click", async function () {
  let url = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";
  let searchText = document.querySelector("#searchInput").value;
  let data = await fetchData(url + searchText);
  let meals = data.meals;
  clearResultDiv();

  if (meals) {
    meals.forEach((meal) => {
      resultDiv.innerHTML += appendMeal(meal);
    });
  } else {
    resultDiv.innerHTML = `<div class="alert alert-danger text-center" style="width:100%" role="alert">
    No recipes found!
  </div>`;
  }
  console.log(meals);
});

const appendMeal = (meal) => {
  return ` <div class="col">
    <div class="card shadow-sm">
      <img src="${meal.strMealThumb}" class="img-thumbnail" alt="...">

      <div class="card-body">
        <p class="card-text">
          <h3 class="text-center">${meal.strMeal}</h3>
        </p>
        <div
          class="d-flex align-items-center justify-content-center"
        >
        <button type="button" class="btn btn-warning" onclick="getRecipe(${meal.idMeal})">Get Recipe</button>
          </div>
        </div>
      </div>
    </div>`;
};

const getRecipe = async (id) => {
  let url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
  let data = await fetchData(url + id);
  console.log(data.meals[0]);
  let meal = data.meals[0];
  document.getElementById("exampleModalLabel").textContent = meal.strMeal;
  document.getElementById("instructions").textContent = meal.strInstructions;
  document.getElementById("firstIngredient").textContent = meal.strIngredient1;
  document.getElementById("foodPhoto").src = meal.strMealThumb;
  document.getElementById("foodVideo").href = meal.strYoutube;

  openModal();
};

function openModal() {
  document.getElementById("backdrop").style.display = "block";
  document.getElementById("exampleModal").style.display = "block";
  document.getElementById("exampleModal").classList.add("show");
}

function closeModal() {
  document.getElementById("backdrop").style.display = "none";
  document.getElementById("exampleModal").style.display = "none";
  document.getElementById("exampleModal").classList.remove("show");
}
