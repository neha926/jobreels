import React from 'react';

// 2D anime-style Swabiee character.
// Props: isTalking -> mouth animates open/close; isListening -> gentle bounce + glow.
// Same interface as the previous 3D version so AIAssistant needs no prop changes.

const BlinkEyes = ({ talking }) => {
  // CSS blink keyframes are defined inline via <style> in the root svg.
  const duration = talking ? '2.4s' : '4.5s';
  return (
    <g>
      {/* Left eye */}
      <g style={{ transformOrigin: '78px 110px' }}>
        <ellipse cx="78" cy="110" rx="11" ry="13" fill="#ffffff" stroke="#3b2a3a" strokeWidth="1.5" />
        <ellipse cx="78" cy="112" rx="6.5" ry="8.5" fill="#573249">
          <animate attributeName="ry" values="8.5;0.1;8.5" dur={duration} repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="80" cy="109" rx="2.4" ry="3" fill="#ffffff">
          <animate attributeName="ry" values="3;0.1;3" dur={duration} repeatCount="indefinite" />
        </ellipse>
      </g>
      {/* Right eye */}
      <g style={{ transformOrigin: '110px 110px' }}>
        <ellipse cx="110" cy="110" rx="11" ry="13" fill="#ffffff" stroke="#3b2a3a" strokeWidth="1.5" />
        <ellipse cx="110" cy="112" rx="6.5" ry="8.5" fill="#573249">
          <animate attributeName="ry" values="8.5;0.1;8.5" dur={duration} repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="112" cy="109" rx="2.4" ry="3" fill="#ffffff">
          <animate attributeName="ry" values="3;0.1;3" dur={duration} repeatCount="indefinite" />
        </ellipse>
      </g>
    </g>
  );
};

const TalkingMouth = ({ talking }) => {
  if (talking) {
    return (
      <g>
        <ellipse cx="94" cy="138" rx="7" ry="6" fill="#b3425f">
          <animate attributeName="ry" values="2;7;2" dur="0.18s" repeatCount="indefinite" />
          <animate attributeName="rx" values="5;7.5;5" dur="0.18s" repeatCount="indefinite" />
        </ellipse>
        <path d="M87 138 Q94 145 101 138" fill="none" stroke="#8a2f47" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    );
  }
  // gentle resting smile
  return (
    <path
      d="M86 136 Q94 142 102 136"
      fill="none"
      stroke="#b3425f"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  );
};

export const AnimeCharacter3D = ({ isTalking = false, isListening = false, className = '' }) => {
  const bob = isListening ? 'swabiee-bob 1.6s ease-in-out infinite' : 'swabiee-float 5s ease-in-out infinite';
  const glow = isListening ? 'drop-shadow(0 0 18px rgba(167,139,250,0.85))' : 'drop-shadow(0 8px 18px rgba(91,63,180,0.35))';

  return (
    <div className={className}>
      <svg
        viewBox="0 0 188 260"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', display: 'block', animation: bob, filter: glow }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="swabiee-hair" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6b4f5c" />
            <stop offset="1" stopColor="#4a3540" />
          </linearGradient>
          <linearGradient id="swabiee-jacket" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#a7bcff" />
            <stop offset="1" stopColor="#7d95d8" />
          </linearGradient>
          <radialGradient id="swabiee-blush" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#ff9bb0" stopOpacity="0.85" />
            <stop offset="1" stopColor="#ff9bb0" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Soft halo */}
        <ellipse cx="94" cy="120" rx="70" ry="78" fill="#c4b5fd" opacity="0.18" />

        {/* Neck */}
        <rect x="86" y="150" width="16" height="22" rx="6" fill="#f2c7aa" />

        {/* Shoulders / blazer */}
        <path
          d="M44 250 C44 200 64 170 94 170 C124 170 144 200 144 250 Z"
          fill="url(#swabiee-jacket)"
          stroke="#6b7fc0"
          strokeWidth="1.5"
        />
        {/* Shirt collar */}
        <path d="M80 168 L94 184 L108 168 L104 176 L94 180 L84 176 Z" fill="#f4f3fa" />
        {/* Tie */}
        <path d="M91 180 L97 180 L99 205 L94 214 L89 205 Z" fill="#a56d9d" />

        {/* Back hair */}
        <ellipse cx="94" cy="110" rx="56" ry="60" fill="url(#swabiee-hair)" />
        {/* Long side hair */}
        <path d="M40 110 C36 150 42 190 52 210 L60 205 C52 180 48 150 52 116 Z" fill="url(#swabiee-hair)" />
        <path d="M148 110 C152 150 146 190 136 210 L128 205 C136 180 140 150 136 116 Z" fill="url(#swabiee-hair)" />

        {/* Face */}
        <ellipse cx="94" cy="116" rx="42" ry="46" fill="#f7d3b8" />

        {/* Fringe / bangs */}
        <path
          d="M52 96 C58 70 80 58 94 58 C108 58 130 70 136 96 C128 86 116 80 104 84 C112 76 100 70 94 78 C88 70 76 76 84 84 C72 80 60 86 52 96 Z"
          fill="url(#swabiee-hair)"
        />
        {/* Twin buns */}
        <circle cx="50" cy="74" r="18" fill="url(#swabiee-hair)" />
        <circle cx="138" cy="74" r="18" fill="url(#swabiee-hair)" />
        <circle cx="50" cy="74" r="18" fill="none" stroke="#a67e96" strokeWidth="3" opacity="0.6" />
        <circle cx="138" cy="74" r="18" fill="none" stroke="#a67e96" strokeWidth="3" opacity="0.6" />

        {/* Headset band */}
        <path d="M44 86 Q94 40 144 86" fill="none" stroke="#d8f6ff" strokeWidth="6" strokeLinecap="round" />
        {/* Headset cups */}
        <circle cx="46" cy="98" r="11" fill="#b8eefa" stroke="#7584c5" strokeWidth="1.5" />
        <circle cx="142" cy="98" r="11" fill="#b8eefa" stroke="#7584c5" strokeWidth="1.5" />
        <circle cx="46" cy="98" r="5" fill="#7584c5" />
        <circle cx="142" cy="98" r="5" fill="#7584c5" />
        {/* Mic arm */}
        <path d="M46 104 C40 118 44 132 58 138" fill="none" stroke="#d8f6ff" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="58" cy="138" r="4.5" fill="#d8f6ff" />

        {/* Blush */}
        <ellipse cx="70" cy="128" rx="9" ry="6" fill="url(#swabiee-blush)" />
        <ellipse cx="118" cy="128" rx="9" ry="6" fill="url(#swabiee-blush)" />

        <BlinkEyes talking={isTalking} />

        {/* Nose */}
        <path d="M93 124 Q94 128 92 130" fill="none" stroke="#d9a98c" strokeWidth="1.4" strokeLinecap="round" />

        <TalkingMouth talking={isTalking} />
      </svg>

      <style>{`
        @keyframes swabiee-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes swabiee-bob {
          0%, 100% { transform: translateY(0) rotate(-1deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }
      `}</style>
    </div>
  );
};

export default AnimeCharacter3D;
