import type { App } from 'vue';
import { createPinia } from 'pinia';
import { resetSetupStore } from './plugins';

const store = createPinia();
export function setupStore(app: App) {
  store.use(resetSetupStore);
  app.use(store);
}

export { store };
export * from './modules';
export * from './subscribe';
