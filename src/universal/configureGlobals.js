// import { addLocaleData } from 'react-intl';
// import { en } from 'react-intl/locale-data/en';
// import { sk } from 'react-intl/locale-data/sk';
import axios from 'axios';

import { URL } from './consts/apiConsts';

export default function configureGlobals() {
  // react-intl locale data
  // addLocaleData([...en, ...sk]); TODO fix

  // sets up 'axios' defaults
  axios.defaults.baseURL = URL;
}
