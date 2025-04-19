async function searchFreepik() {
  const query = document.getElementById("search").value.trim();

  if (!query) {
    alert("Please enter a search query.");
    return;
  }

  const container = document.getElementById("results");
  container.innerHTML = "<p>Loading...</p>"; // Show loading indicator

  try {
    const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
    if (!res.ok) {
      throw new Error(`API error: ${res.statusText}`);
    }

    const data = await res.json();
    container.innerHTML = ""; // Clear loading indicator

    (data.data || []).forEach((item) => {
      const img = document.createElement("img");
      img.src = item.thumbnails?.small || "";
      img.alt = item.title || "Image"; // Add alt text for better accessibility
      img.style.margin = "10px";
      container.appendChild(img);
    });

    if ((data.data || []).length === 0) {
      container.innerHTML = "<p>No results found.</p>";
    }
  } catch (error) {
    console.error("Error fetching Freepik data:", error);
    container.innerHTML =
      "<p>Failed to fetch results. Please try again later.</p>";
  }
}
