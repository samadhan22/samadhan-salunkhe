//Create you project here from scratch
const moviesList = [
  { movieName: "Flash", price: 7 },
  { movieName: "Spiderman", price: 5 },
  { movieName: "Batman", price: 4 },
];
// Use moviesList array for displaing the Name in the dropdown menu
function populateDropdown() {
  const dropdown = document.getElementById("selectMovie");
  moviesList.forEach((movie) => {
    const option = document.createElement("option");
    option.value = movie.movieName;
    option.text = movie.movieName;
    dropdown.appendChild(option);
  });
}
// Call function to populate dropdown menu
populateDropdown();

//Add eventLister to each unoccupied seat
// Event listener for movie selection
document.getElementById('movies').addEventListener('change', function() {
    const selectedMovie = this.value;
    console.log('Selected movie:', selectedMovie);
    // Add your logic for handling seat selection here
    // For now, let's enable the continue button
    document.getElementById('continueBtn').disabled = false;
});


//Add eventLsiter to continue Button

//Add eventListerner to Cancel Button
