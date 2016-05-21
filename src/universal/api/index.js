import axios from 'axios';

import { URL } from '../consts/apiConsts';

export default function init() {
  axios.defaults.baseURL = URL;
}
