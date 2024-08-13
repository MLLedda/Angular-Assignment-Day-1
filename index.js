"use strict";
let cities = [];
const loadCities = () => {
    const storedCities = localStorage.getItem('cities');
    if (storedCities) {
        cities = JSON.parse(storedCities);
    }
};
const saveCities = () => {
    localStorage.setItem('cities', JSON.stringify(cities));
};
const addCity = (cityName, country, population) => {
    const newCity = { city: cityName, country: country, population: population };
    cities.push(newCity);
    saveCities();
    displayCities();
};
const displayCities = () => {
    const cityList = document.getElementById('cityList');
    if (cityList) {
        cityList.innerHTML = '';
        cities.forEach(city => {
            const li = document.createElement('li');
            li.innerText = `${city.city}, ${city.country} - Population: ${city.population}`;
            cityList.appendChild(li);
        });
    }
};
const filterCities = (searchValue) => {
    const filteredCities = cities.filter(city => city.city.toLowerCase().includes(searchValue.toLowerCase()) ||
        city.country.toLowerCase().includes(searchValue.toLowerCase()));
    const cityList = document.getElementById('cityList');
    if (cityList) {
        cityList.innerHTML = '';
        filteredCities.forEach(city => {
            const li = document.createElement('li');
            li.innerText = `${city.city}, ${city.country} - Population: ${city.population}`;
            cityList.appendChild(li);
        });
    }
};
const init = () => {
    loadCities();
    displayCities();
    const form = document.getElementById('cityForm');
    const searchInput = document.getElementById('searchInput');
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const cityNameInput = document.getElementById('cityName');
            const countryInput = document.getElementById('country');
            const populationInput = document.getElementById('population');
            if (cityNameInput && countryInput && populationInput) {
                const cityName = cityNameInput.value;
                const country = countryInput.value;
                const population = parseInt(populationInput.value);
                if (cityName && country && !isNaN(population)) {
                    addCity(cityName, country, population);
                    form.reset();
                }
            }
        });
    }
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const searchValue = searchInput.value;
            filterCities(searchValue);
        });
    }
};
init();
