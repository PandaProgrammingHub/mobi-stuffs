var API_URL = 'http://localhost:3000/api/'; // URL for the api to be used
switch (window.location.host) {
case 'localhost:3000':
  API_URL = 'http://localhost:3000/api/';
  break;
case 'localhost:9000':
  API_URL = 'http://localhost:9000/api/';
  break;
case 'api.theloopend.com:9000':
  API_URL = 'http://api.theloopend.com:9000/api/';
  break;
case 'qa.salesdoor.co':
  API_URL = 'http://qa.salesdoor.co/api/';
  break;
case 'salesdoor.co':
  API_URL = 'salesdoor.co/api/';
  break;
default:
  API_URL = 'http://localhost:3000/api/';
}

export const environment = {
  production: false,
  url: API_URL
};
export default environment;
