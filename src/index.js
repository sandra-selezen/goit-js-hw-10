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
        <ul>
        <li>Capital: ${capital}</li>
        <li>Population: ${population}</li>
        <li>Languages: ${Object.values(languages)}</li>
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