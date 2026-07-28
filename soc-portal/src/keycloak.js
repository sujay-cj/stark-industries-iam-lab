import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8080',
  realm: 'stark-industries',
  clientId: 'soc-portal',
});

export default keycloak;
