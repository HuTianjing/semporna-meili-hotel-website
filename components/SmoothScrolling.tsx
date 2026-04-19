'use client';

import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

/**
 * 全局高级顺滑滚动 (Smooth Scrolling)
 * 作用于最外层，使原生滚动条具备物理阻尼和线性插值的奢华手感
 */
export default function SmoothScrolling({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08, // 插值强度（越小越丝滑，建议 0.08 适合大面积图片的展示站）
        duration: 1.5, // 最小滚动持续时间
        smoothWheel: true, // 确保鼠标滚轮平滑工作
      }}
    >
      {children}
    </ReactLenis>
  );
}
