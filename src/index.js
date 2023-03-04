import './css/styles.css';
import debounce from "lodash.debounce";
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputEl: document.querySelector("#search-box"),
  listEl: document.querySelector(".country-list"),
  infoEl: document.querySelector(".country-info")
}

refs.inputEl.addEventListener("input", debounce(onHandleInput, DEBOUNCE_DELAY));

function onHandleInput(event) {
  event.preventDefault();
  const name = event.target.value.trim();
  // console.log(name);
  refs.infoEl.innerHTML = "";
  refs.listEl.innerHTML = "";
  if (!name) {
    return;
  }
  fetchCountries(name)
    .then(countries => {
      if (countries.length > 10) {
        return Notify.info('Too many matches found. Please enter a more specific name.');
      }
      
      createCountryItemEl(countries);
    })
    .catch(error => Notify.failure('Oops, there is no country with that name'));
}

function createCountryItemEl(countries) {
  if (countries.length === 1) {
    createCountryInfo(countries);
  } else {
    refs.listEl.innerHTML = countries
    .map(({ flafs, name }) => {
      return `<li class="country-item">
        <img class="country-flag" src="${flafs.svg} alt="${flafs.alt}">
        <p class="county-name">${name.offitial}</p>
        </li>`;
    })
    .join("");
  }
}

function createCountryInfo(countries) {
  refs.infoEl.innerHTML = countries
    .map(({ flafs, name, capital, population, languages }) => {
      return `<img class="country-flag" src="${flafs.svg} alt="${flafs.alt}">
        <p class="county-name">${name.offitial}</p>
        <ul>
        <li>Capital: ${capital}</li>
        <li>Population: ${population}</li>
        <li>Languages: ${languages}</li>
        </ul>`
    })
    .join("");
}


// Notify.failure('Oops, there is no country with that name');
// Notify.info('Too many matches found. Please enter a more specific name.');