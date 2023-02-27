import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

Notify.failure('Oops, there is no country with that name');
Notify.info('Too many matches found. Please enter a more specific name.');
