// src/api/apiClient.ts
const API_URL = process.env.NEXT_PUBLIC_APP_API_URL;

export async function apiRequest<T>(
  endpoint: string,
  token?: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    },
    ...options,
  });

  if (!res.ok) throw new Error(`Erro da API: ${res.status}`);
  return res.json();
}