/** 侧边栏 */
interface Sider {
  /** 侧边栏反转色 */
  inverted: boolean;
  /** 侧边栏宽度 */
  width: number;
  /** 侧边栏折叠时的宽度 */
  collapsedWidth: number;
  /** vertical-mix模式下侧边栏宽度 */
  mixWidth: number;
  /** vertical-mix模式下侧边栏折叠时的宽度 */
  mixCollapsedWidth: number;
  /** vertical-mix模式下侧边栏的子菜单的宽度 */
  mixChildMenuWidth: number;
}

/** 头部样式 */
interface Header {
  /** 头部反转色 */
  inverted: boolean;
  /** 是否显示 */
  visible?: boolean;
  /** 头部高度 */
  height: number;
  /** 面包屑样式 */
  crumb: Crumb;
}

/** 页面样式 */
interface Page {
  /** 页面是否开启动画 */
  animate: boolean;
  /** 动画类型 */
  animateMode: EnumType.ThemeAnimateMode;
  /** 动画类型列表 */
  animateModeList: AnimateModeList[];
}
/** 多标签样式 */
interface Tab {
  /** 多页签可见 */
  visible: boolean;
  /** 多页签高度 */
  height: number;
  /** 多页签风格 */
  mode: EnumType.ThemeTabMode;
  /** 多页签风格列表 */
  modeList: ThemeTabModeList[];
  /** 开启多页签缓存 */
  isCache: boolean;
}

interface OtherColor {
  /** 信息 */
  info: string;
  /** 成功 */
  success: string;
  /** 警告 */
  warning: string;
  /** 错误 */
  error: string;
}
/** 样式主题 */
declare namespace Theme {
  interface Setting {
    /** 暗黑模式 */
    darkMode: boolean;
    /** 是否自动跟随系统主题 */
    followSystemTheme: boolean;
    /** 布局样式 */
    layout: Layout;
    /** 主题颜色 */
    themeColor: string;
    /** 主题颜色列表 */
    themeColorList: string[];
    /** 其他颜色 */
    otherColor: OtherColor;
    /** 是否自定义info的颜色(默认取比主题色深一级的颜色) */
    isCustomizeInfoColor: boolean;
    /** 固定头部和多页签 */
    fixedHeaderAndTab: boolean;
    /** 显示重载按钮 */
    showReload: boolean;
    /** 头部样式 */
    header: Header;
    /** 标多页签样式 */
    tab: Tab;
    /** 侧边栏样式 */
    sider: Sider;
    /** 菜单样式 */
    menu: Menu;
    /** 底部样式 */
    footer: Footer;
    /** 页面样式 */
    page: Page;
  }
}

/** 布局样式 */
interface Layout {
  /** 最小宽度 */
  minWidth: number;
  /** 布局模式 */
  mode: EnumType.ThemeLayoutMode;
  /** 布局模式列表 */
  modeList: LayoutModeList[];
}
interface LayoutModeList {
  value: EnumType.ThemeLayoutMode;
  label: import('@/enum').EnumThemeLayoutMode;
}
