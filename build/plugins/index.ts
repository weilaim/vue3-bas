import type { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { VitePWA } from 'vite-plugin-pwa';
import progress from 'vite-plugin-progress';
import unocss from '@unocss/vite';
import html from './html';
import unplugin from './unplugin';
import setupMockPlugin from './mock';
import visualizer from './visualizer';
import compress from './compress';

/**
 * vite插件
 * @param viteEnv - 环境变量配置
 */
export function setupVitePlugins(viteEnv: ImportMetaEnv): (PluginOption | PluginOption[])[] {
  const plugins = [vue(), vueJsx(), VitePWA(), html(viteEnv), ...unplugin(viteEnv), unocss(), progress()];
  // const plugins = [vue(), vueJsx(), VitePWA(), html(viteEnv), unocss(), mock, progress()];

  if (viteEnv.VITE_USE_MOCK === 'Y') {
    plugins.push(setupMockPlugin());
  }
  if (viteEnv.VITE_VISUALIZER === 'Y') {
    plugins.push(visualizer as PluginOption);
  }
  if (viteEnv.VITE_COMPRESS === 'Y') {
    plugins.push(compress(viteEnv));
  }

  return plugins;
}
