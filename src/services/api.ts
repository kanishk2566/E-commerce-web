export async function apiFetch<T>(baseUrl: string, endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${baseUrl}${endpoint}`, options);

  if(!response.ok) {
    throw new Error(`Request Failed ${response.status} ${response.statusText}`);
  }

  const data: T = await response.json();

  return data;
}