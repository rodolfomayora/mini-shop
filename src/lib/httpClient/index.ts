import { HttpError } from '#errors/controlledErrors';

export async function httpClient(url: string, options: RequestInit = {}): Promise<unknown> {
  const { headers, body, ...restOptions } = options;
  const defaultOptions : RequestInit = {
    method: 'GET',

    headers: new Headers({
      'Content-Type': 'application/json',
      ...headers,
    }),

    body: body,

    ...restOptions
  }

  const response = await fetch(url, defaultOptions);
  const hasError = !response.ok;
  // send response as error 'cause' and manage it on ErrorBoundary
  if (hasError) throw new HttpError('HTTP_ERROR', { cause: response });
  const data = await response.json();

  return data;
}