import { createApp } from 'vue';
import App from './App.vue';
import { setupAssets } from './plugins';
import { setupRouter } from './router';
import { setupStore } from './store';

async function setupApp() {
  setupAssets();
  const app = createApp(App);
  setupStore(app);
  await setupRouter(app);
  // mount app
  app.mount('#app');
}

setupApp();
