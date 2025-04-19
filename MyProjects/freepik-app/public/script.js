async function searchFreepik() {
  const query = document.getElementById("search").value;
  const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
  const data = await res.json();

  const container = document.getElementById("results");
  container.innerHTML = "";

  (data.data || []).forEach((item) => {
    const img = document.createElement("img");
    img.src = item.thumbnails?.small || "";
    img.style.margin = "10px";
    container.appendChild(img);
  });
}
