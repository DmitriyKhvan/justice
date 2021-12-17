import { KeycloakService } from 'keycloak-angular';
import { environment } from '../../environments/environment';

export function initializeKeycloak(
  keycloak: KeycloakService
): () => Promise<boolean> {
  return async () =>
    await keycloak.init({
      config: {
        url: environment.authUrl,
        realm: 'JUSTICE',
        clientId: 'justice',
      },
      initOptions: {
        checkLoginIframe: true,
        checkLoginIframeInterval: 25,
        onLoad: 'check-sso',
        // silentCheckSsoRedirectUri:
        //   window.location.origin + '/assets/silent-check-sso.html',
      },
      loadUserProfileAtStartUp: true,
    });
}
