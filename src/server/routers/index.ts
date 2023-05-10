import api from './api';
import auth from './auth';

const routers = [
  {
    path: '/api',
    router: api,
  },
  {
    path: '/auth',
    router: auth,
  },
];

export default routers;
