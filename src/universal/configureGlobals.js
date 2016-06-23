import axios from 'axios';

import { URL } from './consts/apiConsts';

export default function configureGlobals() {
  // sets up 'axios' defaults
  axios.defaults.baseURL = URL;
}
