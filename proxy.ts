import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // 只在匹配这两类路由时激活 i18n
  // 跳开所有内部系统路由(_next) 及 静态文件 (.jpg, .mp4)
  // 当用户访问未知前缀 (如 /5/5) 时，我们希望能被捕捉到并自动补全默认语言 (如 /zh/5/5)，因此将匹配规则稍微放宽
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
