const inputElement = document.getElementById("postcode");
const suggestionsDiv = document.getElementById("suggestions");

suggestionsDiv.innerHTML = "";
suggestionsDiv.style.display = "none";

inputElement.addEventListener("input", function () {
  const query = inputElement.value;

  // Clear previous suggestions
  suggestionsDiv.innerHTML = "";
  suggestionsDiv.style.display = "none";

  if (query.length >= 3) {
    fetch(`https://api.postcodes.io/postcodes/${query}/autocomplete`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Check if there are results
        if (data.result && data.result.length > 0) {
          console.log(data.result);
          data.result.forEach((item) => {
            const suggestionItem = document.createElement("div");
            suggestionItem.textContent = item;
            suggestionItem.style.cursor = "pointer";
            suggestionItem.addEventListener("click", function () {
              inputElement.value = item; // Set input value to selected suggestion
              suggestionsDiv.innerHTML = ""; // Clear suggestions
              suggestionsDiv.style.display = "none"; // Hide suggestions
            });
            suggestionsDiv.appendChild(suggestionItem);
          });
          suggestionsDiv.style.display = "block"; // Show suggestions
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }
});

// Hide suggestions when clicking outside
document.addEventListener("click", function (event) {
  if (!suggestionsDiv.contains(event.target) && event.target !== inputElement) {
    suggestionsDiv.innerHTML = "";
    suggestionsDiv.style.display = "none";
  }
});
