/** vue 的 defineExpose导出的类型 */
declare namespace Expose {
  interface BetterScroll {
    instance: import('@better-scroll/core').BScrollInstance;
  }

  interface ImageVerify {
    /** 获取图片的验证码 */
    getImgCode(): void;
  }
}
