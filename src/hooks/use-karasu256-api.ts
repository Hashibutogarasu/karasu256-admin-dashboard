import { APIClient } from '@karasu-lab/karasu256-api-client'

export function useKarasu256API() {
  const api = new APIClient();

  if (import.meta.env.DEV) {
    api.characters.httpRequest.config.HEADERS = {
      Authorization: `Bearer ${import.meta.env.VITE_API_BEARER}`
    }
    api.characters.httpRequest.config.BASE = import.meta.env.VITE_API_HOST
  }
  else {
    api.characters.httpRequest.config.HEADERS = {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  }

  return api;
}