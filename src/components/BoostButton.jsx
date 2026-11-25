import React from 'react';
import { Rocket, Coins, Crown } from 'lucide-react';

/**
 * Floating Boost button — sits bottom-left, mirroring Swabiee on the bottom-right.
 * Tapping it opens the BoostPage (refer & earn coins, 200-coin profile boost).
 */
export const BoostButton = ({ coins = 0, isBoosted = false, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-20 z-40 flex items-end gap-2 active:scale-95 transition-transform cursor-pointer animate-pulse-subtle"
      style={{ left: 'max(12px, calc((100vw - 448px) / 2 + 12px))' }}
      title={isBoosted ? 'Boost Active' : 'Boost profile & earn coins'}
      aria-label="Boost profile"
    >
      {/* Coin count pill */}
      <span className="mb-2 rounded-2xl rounded-bl-sm bg-white px-2.5 py-1.5 text-[11px] font-bold text-zinc-900 shadow-xl flex items-center gap-1">
        <Coins className="w-3.5 h-3.5 text-amber-500" />
        {coins}
      </span>

      {/* Boost icon button */}
      <span
        className={`relative block h-[60px] w-[60px] overflow-hidden rounded-full shadow-[0_10px_30px_rgba(245,158,11,0.45)] ring-1 ring-white/50 flex items-center justify-center ${
          isBoosted
            ? 'bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-500'
            : 'bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700'
        }`}
      >
        {isBoosted ? (
          <Crown className="w-7 h-7 text-white drop-shadow" />
        ) : (
          <Rocket className="w-7 h-7 text-white drop-shadow" />
        )}
        {!isBoosted && (
          <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400 animate-pulse" />
        )}
        {isBoosted && (
          <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full leading-none">
            ACTIVE
          </span>
        )}
      </span>
    </button>
  );
};

export default BoostButton;
