document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const mealId = urlParams.get("id");
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  const mealDetails = document.getElementById("meal-details");

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => displayMealDetails(data.meals[0]))
    .catch((error) => console.error("Error:", error));

  function displayMealDetails(meal) {
    if (meal) {
      mealDetails.innerHTML = `
                <div class="card mb-4">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="${
        meal.strMeal
      }">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p><strong>Category:</strong> ${meal.strCategory}</p>
                        <p><strong>Area:</strong> ${meal.strArea}</p>
                        <p><strong>Instructions:</strong> ${
                          meal.strInstructions
                        }</p>
                        <p><strong>Ingredients:</strong></p>
                        <ul>
                            ${getIngredients(meal)
                              .map((ingredient) => `<li>${ingredient}</li>`)
                              .join("")}
                        </ul>
                    </div>
                </div>
            `;
    } else {
      mealDetails.innerHTML = "<p>Meal not found</p>";
    }
  }

  function getIngredients(meal) {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(
          `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
        );
      } else {
        break;
      }
    }
    return ingredients;
  }
});
