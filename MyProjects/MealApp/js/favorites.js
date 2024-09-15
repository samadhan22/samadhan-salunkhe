document.addEventListener("DOMContentLoaded", function () {
  const favoritesList = document.getElementById("favorites-list");
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const apiUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

  if (favorites.length) {
    favorites.forEach((mealId) => fetchMealById(mealId));
  } else {
    favoritesList.innerHTML = "<p>No favorite meals</p>";
  }

  function fetchMealById(mealId) {
    fetch(apiUrl + mealId)
      .then((response) => response.json())
      .then((data) => displayFavoriteMeal(data.meals[0]))
      .catch((error) => console.error("Error:", error));
  }

  function displayFavoriteMeal(meal) {
    const mealCard = document.createElement("div");
    mealCard.className = "col-md-4";
    mealCard.innerHTML = `
            <div class="card mb-4">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <button class="btn btn-danger" onclick="removeFromFavorites('${meal.idMeal}')">Remove from Favorites</button>
                    <a href="meal.html?id=${meal.idMeal}" class="btn btn-secondary">View Details</a>
                </div>
            </div>
        `;
    favoritesList.appendChild(mealCard);
  }

  window.removeFromFavorites = function (mealId) {
    const updatedFavorites = favorites.filter((id) => id !== mealId);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    location.reload();
  };
});
