import { rest } from 'msw';
import { server } from '../../../__mocks__/server';
import { httpClient } from '.';
import { HttpError } from '#errors/controlledErrors';


describe('Function: httpClient', () => {
  test('Should handles GET requests successfully', async () => {
    const data = await httpClient('https://example.com');
    expect(data).toEqual({ message: 'test' });
  });

  test('Should handles POST requests successfully', async () => {
    const message = 'test post';
    const data = await httpClient('https://example.com', {
      method: 'POST',
      body: JSON.stringify({ message })
    });
    expect(data).toEqual({ message: 'test post'});
  });

  test('Should throws an exception when an http error occurs', async () => {
    expect.assertions(4);

    server.use(
      rest.get('https://example.com', (_, res, ctx) => {
        return res(ctx.status(404));
      })
    );

    try {
      await httpClient('https://example.com');
      
    } catch (error) {
      // expect(error instanceof Error).toBeTruthy();
      expect(error.name).toBe('HttpError'); // error type
      expect(error.message).toMatch(/^HTTP_ERROR$/);
      expect(error.stack).toBeDefined();
      expect(error.cause).toBeDefined();

    }

    // const promise = httpClient('https://example.com');
    // await expect(promise).rejects.toBeInstanceOf(Error); // verify instance or ancestor
    // await expect(promise).rejects.toThrow(/^HTTP_ERROR$/); // verify error 'message'
  });
});