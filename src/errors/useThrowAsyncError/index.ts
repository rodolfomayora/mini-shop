import { useState } from 'react';

export function useThrowAsyncError () {
  const [_, setState] = useState<any>();

  function throwAsyncError (error: Error | unknown): void {
    setState(() => { throw error });
  }

  return { throwAsyncError };
}