import { useRef, forwardRef, useImperativeHandle } from 'react';

interface GlassJarProps {
  width?: number;
  height?: number;
  children?: React.ReactNode;
}

export interface JarRef {
  getBounds: () => { left: number; right: number; top: number; bottom: number } | null;
}

const GlassJar = forwardRef<JarRef, GlassJarProps>(({ 
  width = 300, 
  height = 400,
  children 
}, ref) => {
  const jarRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    getBounds: () => {
      if (!jarRef.current) return null;
      const rect = jarRef.current.getBoundingClientRect();
      return {
        left: rect.left + 35,
        right: rect.right - 35,
        top: rect.top + 90,
        bottom: rect.bottom - 25
      };
    }
  }));

  return (
    <div 
      ref={jarRef}
      className="relative"
      style={{ width, height }}
      data-testid="glass-jar"
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 300 400"
        className="absolute inset-0"
        style={{ pointerEvents: 'none' }}
      >
        <defs>
          <linearGradient id="amberJar" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(210,140,60,0.55)" />
            <stop offset="15%" stopColor="rgba(240,180,80,0.25)" />
            <stop offset="45%" stopColor="rgba(255,210,120,0.10)" />
            <stop offset="80%" stopColor="rgba(230,170,70,0.22)" />
            <stop offset="100%" stopColor="rgba(190,120,40,0.50)" />
          </linearGradient>

          <linearGradient id="amberJarBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,220,130,0.18)" />
            <stop offset="100%" stopColor="rgba(180,100,30,0.12)" />
          </linearGradient>

          <linearGradient id="brassLid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c8a850" />
            <stop offset="25%" stopColor="#d4b660" />
            <stop offset="60%" stopColor="#b8922a" />
            <stop offset="100%" stopColor="#8a6a18" />
          </linearGradient>

          <linearGradient id="brassShine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,240,180,0.5)" />
            <stop offset="30%" stopColor="rgba(255,230,150,0.2)" />
            <stop offset="100%" stopColor="rgba(100,70,0,0.15)" />
          </linearGradient>

          <linearGradient id="labelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,248,235,0.92)" />
            <stop offset="100%" stopColor="rgba(245,230,200,0.88)" />
          </linearGradient>

          <linearGradient id="rimGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c8a030" />
            <stop offset="100%" stopColor="#a07818" />
          </linearGradient>

          <filter id="softGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <clipPath id="jarClip">
            <path d="
              M 68 88
              Q 35 108 30 160
              L 24 355
              Q 24 382 58 382
              L 242 382
              Q 276 382 276 355
              L 270 160
              Q 265 108 232 88
              Z
            " />
          </clipPath>
        </defs>

        {/* Lid band */}
        <rect x="58" y="70" width="184" height="22" rx="3" fill="url(#brassLid)" />
        <rect x="58" y="70" width="184" height="22" rx="3" fill="url(#brassShine)" opacity="0.6" />

        {/* Lid top dome */}
        <ellipse cx="150" cy="68" rx="100" ry="13" fill="url(#brassLid)" />
        <ellipse cx="150" cy="68" rx="100" ry="13" fill="url(#brassShine)" opacity="0.5" />
        <ellipse cx="150" cy="57" rx="86" ry="11" fill="url(#brassLid)" />
        <rect x="64" y="46" width="172" height="24" rx="3" fill="url(#brassLid)" />
        <rect x="64" y="46" width="172" height="24" rx="3" fill="url(#brassShine)" opacity="0.4" />

        {/* Lid top shine line */}
        <path d="M 75 50 Q 150 44 225 50" stroke="rgba(255,245,190,0.6)" strokeWidth="2" fill="none" />

        {/* Neck ring */}
        <rect x="58" y="88" width="184" height="8" rx="2" fill="url(#rimGrad)" />

        {/* Jar body */}
        <path
          d="
            M 68 88
            Q 35 108 30 160
            L 24 355
            Q 24 382 58 382
            L 242 382
            Q 276 382 276 355
            L 270 160
            Q 265 108 232 88
            Z
          "
          fill="url(#amberJar)"
          stroke="rgba(200,150,60,0.4)"
          strokeWidth="2"
        />

        {/* Amber inner warmth */}
        <path
          d="
            M 68 88
            Q 35 108 30 160
            L 24 355
            Q 24 382 58 382
            L 242 382
            Q 276 382 276 355
            L 270 160
            Q 265 108 232 88
            Z
          "
          fill="url(#amberJarBody)"
        />

        {/* Left glass highlight streak */}
        <path
          d="M 42 115 Q 38 230 44 365"
          stroke="rgba(255,230,150,0.55)"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 56 130 Q 52 240 58 350"
          stroke="rgba(255,220,120,0.28)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Right edge shadow */}
        <path
          d="M 258 115 Q 262 230 256 365"
          stroke="rgba(150,90,20,0.3)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />

        {/* Highlight oval top-left */}
        <ellipse
          cx="72"
          cy="145"
          rx="9"
          ry="18"
          fill="rgba(255,240,180,0.45)"
          transform="rotate(-18 72 145)"
        />

        {/* Vintage label */}
        <rect x="80" y="195" width="140" height="80" rx="6" fill="url(#labelGrad)" stroke="rgba(180,130,50,0.5)" strokeWidth="1.5" />
        <rect x="85" y="200" width="130" height="70" rx="4" fill="none" stroke="rgba(180,130,50,0.3)" strokeWidth="0.8" strokeDasharray="3 2" />

        {/* Label text decorations (rendered as shapes since SVG text needs font loading) */}
        <text x="150" y="228" textAnchor="middle" fontFamily="'Playfair Display', serif" fontSize="11" fill="rgba(120,80,20,0.85)" fontStyle="italic">lucky star</text>
        <line x1="100" y1="234" x2="200" y2="234" stroke="rgba(180,130,50,0.4)" strokeWidth="0.8" />
        <text x="150" y="252" textAnchor="middle" fontFamily="'Playfair Display', serif" fontSize="16" fontWeight="bold" fill="rgba(100,60,15,0.9)">JAR</text>
        <line x1="100" y1="258" x2="200" y2="258" stroke="rgba(180,130,50,0.4)" strokeWidth="0.8" />
        <text x="150" y="272" textAnchor="middle" fontFamily="'Architects Daughter', cursive" fontSize="8" fill="rgba(140,90,30,0.7)">✦ open with love ✦</text>

        {/* Bottom rim highlight */}
        <ellipse cx="150" cy="382" rx="90" ry="6" fill="rgba(160,100,20,0.2)" />

        {/* Overall warm overlay shine */}
        <path
          d="
            M 68 88
            Q 35 108 30 160
            L 24 355
            Q 24 382 58 382
            L 242 382
            Q 276 382 276 355
            L 270 160
            Q 265 108 232 88
            Z
          "
          fill="none"
          stroke="rgba(255,200,80,0.18)"
          strokeWidth="1"
        />
      </svg>

      {/* Stars container clipped to jar interior */}
      <div 
        className="absolute overflow-hidden"
        style={{
          left: 28,
          top: 94,
          width: width - 56,
          height: height - 118,
          borderRadius: '0 0 22px 22px'
        }}
      >
        {children}
      </div>

      {/* Front glass sheen overlay */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: 0,
          top: 88,
          width: width,
          height: height - 88,
          background: 'radial-gradient(ellipse at 28% 25%, rgba(255,235,150,0.12) 0%, transparent 55%)',
          zIndex: 50
        }}
      />
    </div>
  );
});

GlassJar.displayName = 'GlassJar';

export default GlassJar;
