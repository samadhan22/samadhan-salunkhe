document
  .getElementById("generateForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const prompt = document.getElementById("prompt").value;
    const loadingElement = document.getElementById("loading");
    const imageContainer = document.getElementById("imageContainer");

    // Show loading message
    loadingElement.style.display = "block";
    imageContainer.innerHTML = ""; // Clear previous images

    try {
      // Send the prompt to the backend for image generation
      const response = await fetch("/generate-images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const result = await response.json();

      // Hide the loading message and show the generated images
      loadingElement.style.display = "none";

      if (result.images) {
        result.images.forEach((image, index) => {
          const imgElement = document.createElement("img");
          imgElement.src = `data:image/png;base64,${image}`;
          imgElement.alt = `Generated Image ${index + 1}`;

          // Create the "Save" button for each image
          const saveButton = document.createElement("button");
          saveButton.textContent = "Save Image";
          saveButton.onclick = function () {
            const link = document.createElement("a");
            link.href = `data:image/png;base64,${image}`;
            link.download = `generated-image-${index + 1}.png`;
            link.click();
          };

          // Add the image and save button to the container
          const imageWrapper = document.createElement("div");
          imageWrapper.appendChild(imgElement);
          imageWrapper.appendChild(saveButton);
          imageContainer.appendChild(imageWrapper);
        });
      } else {
        imageContainer.innerHTML =
          "<p style='color: red;'>Error generating images!</p>";
      }
    } catch (error) {
      loadingElement.style.display = "none";
      imageContainer.innerHTML =
        "<p style='color: red;'>Error generating images. Please try again!</p>";
    }
  });
