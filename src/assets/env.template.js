(function (window) {
  window.__env = window.__env || {};

  // Environment variables
  window.__env.dbUrlBek = "${API_URL}";
  window.__env.fileBaseUrl = "${FILE_BASE_URL}";
  window.__env.authUrl = "${KEYCLOAK_URL}";
})(this);
