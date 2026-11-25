import React from 'react';
import { Rocket, Coins, Crown } from 'lucide-react';

/**
 * Floating Boost button — sits bottom-left, mirroring Swabiee on the bottom-right.
 * Tapping it opens the BoostPage (refer & earn coins, 200-coin profile boost).
 */
export const BoostButton = ({isBoosted = false, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed top-25 z-40 flex items-end gap-2 active:scale-95 transition-transform cursor-pointer animate-pulse-subtle"
      style={{ right: 'max(12px, calc((101vw - 448px) / 2 + 12px))' }}
      title={isBoosted ? 'Boost Active' : 'Boost profile & earn coins'}
      aria-label="Boost profile"
    >
      {/* Coin count pill */}
      

      {/* Boost icon button */}
      <span
        className={`relative block h-[50px] w-[50px] overflow-hidden rounded-full shadow-[0_10px_30px_rgba(245,158,11,0.45)] ring-1 ring-white/50 flex items-center justify-center ${
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
       
        
      </span>
    </button>
  );
};

export default BoostButton;
