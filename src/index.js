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
    .catch(onError);
}

function createCountryItemEl(countries) {
  if (countries.length === 1) {
    createCountryInfo(countries);
  } else {
    refs.infoEl.innerHTML = "";
    const markup = countries
    .map(({ flags, name }) => {
      return `<li class="country-item">
        <p class="county-name"><img class="country-flag" alt="${flags.alt}" src="${flags.svg}" width="80" height="40"> ${name.official}</p>
        </li>`;
    })
      .join("");
    refs.listEl.innerHTML = markup;
  }
}

function createCountryInfo(countries) {
  refs.listEl.innerHTML = "";
  const markup = countries
    .map(({ flags, name, capital, population, languages }) => {
      return `<h1 class="county-name"><img class="country-flag" alt="${flags.alt}" src="${flags.svg}" width="100" height="40"> ${name.official}</h1>
        <ul class="country-info">
        <li><b>Capital:</b> ${capital}</li>
        <li><b>Population:</b> ${population}</li>
        <li><b>Languages:</b> ${Object.values(languages)}</li>
        </ul>`
    })
    .join("");
  refs.infoEl.innerHTML = markup;
}

function onError() {
  refs.listEl.innerHTML = "";
  refs.infoEl.innerHTML = "";
  Notify.failure('Oops, there is no country with that name');
}

// Notify.failure('Oops, there is no country with that name');
// Notify.info('Too many matches found. Please enter a more specific name.');

/*
Create a front-end part of the application to search for information 
about countries by their partial or full names.

Use the public API Rest Countries, namely resource name, which returns an array of country objects that match the search criteria. 
Add at least some decoration to the interface elements.

Write a function, fetchCountries(name), that makes an HTTP request to resource name and returns a promise 
with an array of countries - the result of your request. Move it to a separate file called fetchCountries.js and make a named export.

1. If the back-end returns more than 10 countries, a notification appears in the interface saying that the name should be more specific.
2. If the back-end returns from 2 to 10 countries, a list of found countries is displayed under the text field. 
Each list item consists of a flag and country name.
3. If the request results in an array with one country, the interface displays the card markup 
with information about the country: flag, name, capital, population and languages.
*/