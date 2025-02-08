import { GalleriesApi, CharactersApi, Configuration, Middleware, WeaponsApi } from '@karasu-lab/karasu256-api-client'
import { WeaponsApi as WeaponsAdminApi, GalleriesApi as GalleriesAdminApi, Configuration as AdminConfiguration, CharactersApi as CharactersAdminApi, Middleware as AdminMiddleware } from '@karasu-lab/karasu256-api-admin-client'


export function useAPIWithCredentials() {
  const config = new AdminConfiguration({
    basePath: import.meta.env.VITE_API_URL,
    accessToken: (import.meta.env.DEV ? import.meta.env.VITE_API_BEARER : sessionStorage.getItem('accessToken'))!
  });

  const middleware: AdminMiddleware = {
    pre: async (context) => {
      const newURL = new URL(context.url);
      context.url = `${import.meta.env.VITE_BASE_URL}/api${newURL.pathname}/${newURL.search}`;
      return context;
    }
  };

  const galleries = new GalleriesAdminApi(config).withMiddleware(middleware);
  const characters = new CharactersAdminApi(config).withMiddleware(middleware);
  const weapons = new WeaponsAdminApi(config).withMiddleware(middleware);

  return { galleries, characters, weapons };
}

export function useKarasu256API() {
  const config = new Configuration({
    basePath: import.meta.env.VITE_API_URL,
  });

  const middleware: Middleware = {
    pre: async (context) => {
      const newURL = new URL(context.url);
      context.url = `${import.meta.env.VITE_BASE_URL}/api${newURL.pathname}/${newURL.search}`;
      return context;
    }
  };

  const galleries = new GalleriesApi(config).withMiddleware(middleware);
  const characters = new CharactersApi(config).withMiddleware(middleware);
  const weapons = new WeaponsApi(config).withMiddleware(middleware);

  return { galleries, characters, weapons };
}