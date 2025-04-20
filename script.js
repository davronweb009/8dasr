const darkToggle = document.getElementById("toggle-dark");
const searchInput = document.getElementById("search");
const continentSelect = document.getElementById("continent-select");
const countriesContainer = document.getElementById("countries");

let allCountries = [];

// Toggle dark mode
darkToggle.onclick = () => {
  document.body.classList.toggle("dark");
};

// Fetch all countries from API
async function fetchCountries() {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const countries = await res.json();
  allCountries = countries;
  displayCountries(countries);
}

// Filter countries based on search and region
function filterCountries() {
  const searchValue = searchInput.value.toLowerCase();
  const selectedRegion = continentSelect.value;

  const filtered = allCountries.filter((country) => {
    const nameMatch = country.name.common.toLowerCase().includes(searchValue);
    const regionMatch = selectedRegion === "all" || country.region === selectedRegion;
    return nameMatch && regionMatch;
  });

  displayCountries(filtered);
}

// Display countries
function displayCountries(countries) {
  countriesContainer.innerHTML = "";
  countries.forEach((country) => {
    const card = document.createElement("div");
    card.classList.add("country-card");

    card.innerHTML = `
      <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
      <p><strong>${country.name.common}</strong></p>
      <p>Population: ${country.population.toLocaleString()}</p>
      <p>Region: ${country.region}</p>
      <p>Capital: ${country.capital ? country.capital[0] : "N/A"}</p>
    `;

    countriesContainer.appendChild(card);
  });
}

// Event listeners
searchInput.addEventListener("input", filterCountries);
continentSelect.addEventListener("change", filterCountries);

// Initial fetch
fetchCountries();
