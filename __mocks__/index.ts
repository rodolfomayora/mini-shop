export async function serverMSW () {
  const isBrowser = typeof window !== 'undefined';
  if (isBrowser) {
    const { worker } = await import('./worker');
    await worker.start();

  } else {
    const { server } = await import ('./server');
    await server.listen();
    
  }
}