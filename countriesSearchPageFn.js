let searchInputEl = document.getElementById("searchInput");
let resultCountriesEl = document.getElementById("resultCountries");
let spinnerEl = document.getElementById("spinner");

let searchInputVal = "";
let countriesList = [];

function displayResultofCountries(country) {
    let countryCardEl = document.createElement("div");
    countryCardEl.classList.add("country-card", "d-flex", "flex-row", "col-11", "col-md-5", "mr-auto", "ml-auto");
    resultCountriesEl.appendChild(countryCardEl);

    let countryFlagEl = document.createElement("img");
    countryFlagEl.classList.add("country-flag", "mt-auto", "mb-auto");
    countryFlagEl.src = country.flag;
    countryCardEl.appendChild(countryFlagEl);

    let countryDetailContainerEl = document.createElement("div");
    countryDetailContainerEl.classList.add("d-flex", "flex-column", "ml-4");
    countryCardEl.appendChild(countryDetailContainerEl);

    let countryNameEl = document.createElement("p");
    countryNameEl.classList.add("country-name");
    countryNameEl.textContent = country.name;
    countryDetailContainerEl.appendChild(countryNameEl);

    let countryPopulationEl = document.createElement("p");
    countryPopulationEl.classList.add("country-population");
    countryPopulationEl.textContent = country.population;
    countryDetailContainerEl.appendChild(countryPopulationEl);

}


function searchResultsOfCountries() {
    for (let country of countriesList) {
        let countryName = country.name;

        if (countryName.includes(searchInputVal)) {
            displayResultofCountries(country);
        }
    }
}

function getCountries() {

    resultCountriesEl.classList.add("d-none");
    let requestedURL = "https://apis.ccbp.in/countries-data";
    let options = {
        method: "GET",
    };
    resultCountriesEl.textContent = "";
    spinnerEl.classList.remove("d-none");

    fetch(requestedURL, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            resultCountriesEl.classList.remove("d-none");
            spinnerEl.classList.add("d-none");

            countriesList = jsonData;
            searchResultsOfCountries();
        });
}

function countriesSearch(event) {
    searchInputVal = event.target.value;
    getCountries();
}

getCountries()
searchInputEl.addEventListener("keydown", countriesSearch);