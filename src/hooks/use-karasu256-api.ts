import { GalleriesApi, CharactersApi, Configuration } from '@karasu-lab/karasu256-api-client'
import { GalleriesApi as GalleriesAdminApi, Configuration as AdminConfiguration, CharactersApi as CharactersAdminApi } from '@karasu-lab/karasu256-api-admin-client'


export function useAPIWithCredentials() {
  const config = new AdminConfiguration({
    accessToken: (import.meta.env.DEV ? import.meta.env.VITE_API_BEARER : sessionStorage.getItem('accessToken'))!
  });

  const galleries = new GalleriesAdminApi(config);
  const characters = new CharactersAdminApi(config);

  return { galleries, characters };
}

export function useKarasu256API() {
  const config = new Configuration();

  const galleries = new GalleriesApi(config);
  const characters = new CharactersApi(config);

  return { galleries, characters };
}