import { APIClient } from '@karasu-lab/karasu256-api-client'

export function useKarasu256API() {
  const api = new APIClient();

  api.characters.httpRequest.config.BASE = `${import.meta.env.VITE_BASE_URL}/api`

  if (import.meta.env.DEV) {
    api.characters.httpRequest.config.HEADERS = {
      Authorization: `Bearer ${import.meta.env.VITE_API_BEARER}`
    }
  }
  else {
    api.characters.httpRequest.config.HEADERS = {
      Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
    }
  }

  return api;
}