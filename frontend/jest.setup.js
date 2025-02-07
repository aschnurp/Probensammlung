// jest.setup.js
import '@testing-library/jest-dom';
import { server } from './frontend/mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

