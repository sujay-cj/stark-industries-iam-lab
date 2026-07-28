import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080",
  realm: "stark-industries",
  clientId: "stark-portal",
});

export default keycloak;