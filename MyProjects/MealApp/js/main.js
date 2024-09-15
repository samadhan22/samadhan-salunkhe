const searchInput = document.getElementById('search-input');
const mealList = document.getElementById('meal-list');
const apiUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

searchInput.addEventListener('input', function() {
    const query = searchInput.value.trim();
    if (query) {
        fetchMeals(query);
    } else {
        mealList.innerHTML = '';
    }
});

function fetchMeals(query) {
    fetch(apiUrl + query)
        .then(response => response.json())
        .then(data => displayMeals(data.meals))
        .catch(error => console.error('Error:', error));
}

function displayMeals(meals) {
    mealList.innerHTML = '';
    if (meals) {
        meals.forEach(meal => {
            const mealCard = document.createElement('div');
            mealCard.className = 'col-md-4';
            mealCard.innerHTML = `
                <div class="card mb-4">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <button class="btn btn-primary" onclick="addToFavorites('${meal.idMeal}')">Add to Favorites</button>
                        <a href="meal.html?id=${meal.idMeal}" class="btn btn-secondary">View Details</a>
                    </div>
                </div>
            `;
            mealList.appendChild(mealCard);
        });
    } else {
        mealList.innerHTML = '<p>No meals found</p>';
    }
}

function addToFavorites(mealId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(mealId)) {
        favorites.push(mealId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Added to favorites');
    } else {
        alert('Already in favorites');
    }
}
