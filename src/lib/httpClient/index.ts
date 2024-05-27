export async function httpClient(url: string, options: RequestInit = {}): Promise<unknown> {
  const { headers, body, ...restOptions } = options;
  const defaultOptions : RequestInit = {
    method: 'GET',

    headers: new Headers({
      'Content-Type': 'application/json',
      ...headers,
    }),

    body: JSON.stringify(body),

    ...restOptions
  }

  const response = await fetch(url, defaultOptions);
  const hasError = !response.ok;
  // send the true error through 'cause' and manage it on ErrorBoundary
  if (hasError) throw new Error('NOT_FOUND');
  const data = await response.json();

  return data;
}
