import { APIClient } from '@karasu-lab/karasu256-api-client'

export function useKarasu256API() {
  const api = new APIClient({
    HEADERS: {
      'Authorization': import.meta.env.DEV ? `Bearer ${import.meta.env.VITE_API_BEARER}` : `Bearer ${sessionStorage.getItem('accessToken')}`
    },
    BASE: `${import.meta.env.VITE_BASE_URL}/api`
  });

  return api;
}