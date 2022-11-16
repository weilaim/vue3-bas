import { viteMockServe } from 'vite-plugin-mock';

export default function setupMockPlugin() {
  return viteMockServe({
    mockPath: 'mock/api',
    injectCode: `
		import { setupMockServer } from './mock';
		setupMockServer();
	`
  });
}
