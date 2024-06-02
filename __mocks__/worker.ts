// import { setupWorker } from 'msw/browser';
// import { setupWorker } from '../node_modules/msw/browser';
import { setupWorker } from 'msw';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);