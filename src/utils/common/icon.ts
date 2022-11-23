import { NIcon } from 'naive-ui';
import { Icon } from '@iconify/vue';
import SvgIcon from '@/components/custom/SvgIcon.vue';
interface Props {
  size?: number;
  color?: string;
}
export function renderLocalIcon(icon: string, props: Props = { size: 12 }) {
  return () => h(NIcon, props, { default: () => h(SvgIcon, { icon }) });
}

export function renderIcon(icon: string, props: Props = { size: 12 }) {
  return () => h(NIcon, props, { default: () => h(Icon, { icon }) });
}
