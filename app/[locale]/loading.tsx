import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      {/* 旋转圆环 + logo 层叠 */}
      <div className="relative flex items-center justify-center">
        {/* 旋转圆弧：SVG 画圆，只描四分之三弧，旋转 */}
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          style={{ animation: 'loading-spin 1.4s linear infinite', position: 'absolute' }}
          aria-hidden="true"
        >
          <circle
            cx="100"
            cy="100"
            r="92"
            stroke="#003865"
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray="433 145"
          />
        </svg>

        {/* 慢速反转的金色细弧（装饰层） */}
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          style={{ animation: 'loading-spin 3s linear infinite reverse', position: 'absolute' }}
          aria-hidden="true"
        >
          <circle
            cx="100"
            cy="100"
            r="92"
            stroke="#b18b74"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeDasharray="96 482"
          />
        </svg>

        {/* Logo */}
        <Image
          src="/images/logo-color.png"
          alt="Meili Resort"
          width={100}
          height={100}
          className="relative z-10"
          priority
        />
      </div>
    </div>
  );
}
