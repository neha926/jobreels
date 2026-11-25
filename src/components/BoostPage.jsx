import React, { useState } from 'react';
import {
  Rocket, Crown, TrendingUp, Award, Check, X, Share2, Gift,
  ChevronDown, Shield, RefreshCw, Lock, Coins, Star, Zap,
  Users, MessageSquare, ExternalLink, Copy
} from 'lucide-react';

const BOOST_COST = 200;
const REFER_BONUS = 50;   // coins given to the referrer
const SIGNUP_BONUS = 25;  // coins given to the referred (downloader)

const FEATURES = [
  {
    icon: TrendingUp,
    color: 'text-sky-400',
    bg: 'bg-sky-500/15',
    title: 'Profile on top',
    desc: 'Companies see you first when they search. Your profile ranks above free candidates.',
  },
  {
    icon: MessageSquare,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/15',
    title: 'Apply to 20 jobs a day',
    desc: 'Free candidates get only 5 applies. Boosted profiles can apply to 20 jobs every day.',
  },
  {
    icon: Award,
    color: 'text-amber-400',
    bg: 'bg-amber-500/15',
    title: 'Verified Boost badge',
    desc: 'A golden boost badge on your resume tells companies you are serious about the job.',
  },
  {
    icon: Zap,
    color: 'text-violet-400',
    bg: 'bg-violet-500/15',
    title: 'Priority skill reels',
    desc: 'Your skill reels get pushed to the top of the hiring feed for 30 days.',
  },
];

const COMPARISON = [
  { label: 'Where your profile shows in company search', free: 'Bottom', boost: 'On top' },
  { label: 'Jobs you can apply in a day', free: '5', boost: '20' },
  { label: 'Verified Boost badge on resume', free: false, boost: true },
  { label: 'Priority in reels hiring feed', free: false, boost: true },
  { label: 'Direct HR contact unlock', free: false, boost: true },
];

const TESTIMONIALS = [
  {
    name: 'Aarav Kumar',
    city: 'Pune',
    role: 'Delivery Executive',
    text: 'Boosted my profile and three companies called me on the first day itself. Got a job in two weeks!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    name: 'Priya Sharma',
    city: 'Mumbai',
    role: 'Customer Support',
    text: 'The refer and earn coins helped me boost for free. Just shared with friends and earned enough coins!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  },
  {
    name: 'Rohan Deshmukh',
    city: 'Nagpur',
    role: 'Data Entry Operator',
    text: 'Profile on top really works. Recruiters started viewing my resume immediately after boost.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
  },
];

const FAQS = [
  {
    q: 'What is JobReels Boost?',
    a: 'Boost is a coin-based plan that pushes your profile to the top of company search results, gives you 20 daily job applies, a verified boost badge, and priority in the hiring reels feed for 30 days.',
  },
  {
    q: 'Do I need real money to boost?',
    a: 'No. Boost is paid only with JobReels coins. You earn coins by referring friends — you get 50 coins and your friend gets 25 coins when they sign up.',
  },
  {
    q: 'How many coins does a boost cost?',
    a: 'One boost costs 200 coins and lasts for 30 days. Refer 4 friends (4 x 50 = 200) and you can boost for free.',
  },
  {
    q: 'How does refer and earn work?',
    a: 'Share your referral link with friends. When a friend downloads JobReels and signs up using your link, you instantly get 50 coins and they get 25 coins as a welcome bonus.',
  },
  {
    q: 'Will more companies call me after boost?',
    a: 'Boost significantly improves your visibility because your profile appears at the top. More companies will see and contact you, though it does not guarantee a job.',
  },
  {
    q: 'Can I cancel or get a refund of coins?',
    a: 'Coins are non-refundable, but you can use them anytime. Unused coins stay in your wallet forever. A boost is active for 30 days once activated.',
  },
];

export const BoostPage = ({
  coins = 0,
  isBoosted = false,
  boostedUntil = null,
  referrals = [],
  referralCode = '',
  onBoost,
  onShareReferral,
  onClose,
  t,
}) => {
  const [openFaq, setOpenFaq] = useState(null);
  const [copied, setCopied] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const canAfford = coins >= BOOST_COST;

  const handleCopyCode = () => {
    try {
      navigator.clipboard.writeText(referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleShare = (platform) => {
    if (onShareReferral) onShareReferral(platform);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex justify-center sm:items-center items-end overflow-y-auto">
      <div className="w-full max-w-md bg-zinc-950 sm:rounded-3xl rounded-t-3xl max-h-[95dvh] overflow-y-auto no-scrollbar relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-zinc-900/80 text-zinc-300 hover:text-white flex items-center justify-center cursor-pointer"
          aria-label="Close"
        >
          ✕
        </button>

        {/* HERO BANNER */}
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 px-5 pt-7 pb-6 relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute right-10 bottom-0 w-24 h-24 rounded-full bg-amber-400/20 blur-2xl" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <Crown className="w-5 h-5 text-amber-300" />
              <span className="text-amber-200 text-xs font-bold uppercase tracking-wider">
                JobReels Boost
              </span>
              {isBoosted && (
                <span className="ml-auto bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  ACTIVE
                </span>
              )}
            </div>
            <h1 className="text-white text-2xl font-extrabold leading-tight">
              Get called first.<br />Get hired sooner.
            </h1>
            <p className="text-indigo-100 text-xs mt-2 leading-relaxed">
              Your profile goes on top, so companies call you before other candidates.
            </p>

            {/* Coin wallet chip */}
            <div className="mt-4 inline-flex items-center gap-2 bg-white/15 backdrop-blur rounded-full px-3 py-1.5 border border-white/20">
              <Coins className="w-4 h-4 text-amber-300" />
              <span className="text-white text-xs font-bold">{coins}</span>
              <span className="text-indigo-100 text-[11px]">coins in wallet</span>
            </div>

            {/* Social proof */}
            <div className="mt-4 flex items-center gap-2">
              <div className="flex -space-x-2">
                {TESTIMONIALS.slice(0, 3).map((p, i) => (
                  <img
                    key={i}
                    src={p.avatar}
                    alt=""
                    className="w-6 h-6 rounded-full border-2 border-indigo-600 object-cover"
                  />
                ))}
              </div>
              <div className="text-[11px] text-indigo-100">
                <span className="font-bold text-white">10,000+</span> candidates boosted
                <div className="flex items-center gap-0.5 text-amber-300">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 fill-current" />
                  ))}
                  <span className="text-white ml-1">4.8</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-5 space-y-6">
          {/* WHAT YOU GET */}
          <section>
            <h2 className="text-white text-base font-bold">What you get</h2>
            <p className="text-zinc-400 text-[11px] mt-0.5">
              Four things that get you more calls. Tap any card to see how it works.
            </p>
            <div className="grid grid-cols-2 gap-2.5 mt-3">
              {FEATURES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div
                    key={i}
                    className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3 hover:border-purple-500/40 transition"
                  >
                    <div className={`w-9 h-9 rounded-xl ${f.bg} flex items-center justify-center mb-2`}>
                      <Icon className={`w-5 h-5 ${f.color}`} />
                    </div>
                    <h3 className="text-white text-xs font-bold">{f.title}</h3>
                    <p className="text-zinc-400 text-[10px] mt-1 leading-snug">{f.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* FREE VS BOOST */}
          <section>
            <h2 className="text-white text-base font-bold">Free vs Boost</h2>
            <p className="text-zinc-400 text-[11px] mt-0.5">
              The same app. A very different chance of getting called.
            </p>
            <div className="mt-3 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
              <div className="grid grid-cols-3 text-[11px] font-bold border-b border-zinc-800">
                <div className="p-2.5 text-zinc-400">Feature</div>
                <div className="p-2.5 text-center text-zinc-300 bg-zinc-950/50">Free</div>
                <div className="p-2.5 text-center text-purple-300 bg-purple-950/30">
                  <Crown className="w-3 h-3 inline mr-1" />
                  BOOST
                </div>
              </div>
              {COMPARISON.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-3 items-center text-[11px] border-b border-zinc-800/60 last:border-0"
                >
                  <div className="p-2.5 text-zinc-300">{row.label}</div>
                  <div className="p-2.5 text-center text-zinc-500 bg-zinc-950/30">
                    {row.free === false ? (
                      <X className="w-3.5 h-3.5 mx-auto text-zinc-600" />
                    ) : (
                      <span>{row.free}</span>
                    )}
                  </div>
                  <div className="p-2.5 text-center text-emerald-400 bg-purple-950/20 font-semibold">
                    {row.boost === true ? (
                      <Check className="w-3.5 h-3.5 mx-auto" />
                    ) : (
                      <span>{row.boost}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* PLAN CARD */}
          <section className="bg-gradient-to-br from-purple-950/60 to-indigo-950/60 border-2 border-purple-500/50 rounded-3xl p-4 relative overflow-hidden">
            <div className="absolute top-3 right-3 bg-purple-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
              30 DAYS
            </div>
            <div className="flex items-center gap-1.5 text-emerald-300 text-[11px] font-semibold mb-2">
              <Check className="w-3.5 h-3.5" />
              One plan. Everything included.
            </div>
            <div className="flex items-end gap-2">
              <div className="flex items-center gap-1.5">
                <Coins className="w-6 h-6 text-amber-400" />
                <span className="text-white text-3xl font-extrabold">{BOOST_COST}</span>
                <span className="text-zinc-400 text-xs mb-1">coins</span>
              </div>
              <span className="text-zinc-500 text-xs line-through mb-1.5 ml-1">₹299</span>
              <span className="text-amber-300 text-[10px] font-bold mb-1.5">COINS ONLY</span>
            </div>
            <p className="text-zinc-300 text-[11px] mt-1">
              Valid for 30 days • No real money needed
            </p>

            {isBoosted ? (
              <div className="mt-3 bg-emerald-500/15 border border-emerald-500/40 rounded-xl p-3 text-center">
                <div className="text-emerald-300 text-xs font-bold">
                  🎉 Your profile is boosted!
                </div>
                {boostedUntil && (
                  <div className="text-emerald-200/70 text-[10px] mt-0.5">
                    Active until {boostedUntil}
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onBoost}
                disabled={!canAfford}
                className={`w-full mt-3 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition active:scale-95 ${
                  canAfford
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-zinc-900 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 cursor-pointer'
                    : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                }`}
              >
                {canAfford ? (
                  <>
                    <Rocket className="w-4 h-4" />
                    Boost Now for {BOOST_COST} coins
                  </>
                ) : (
                  <>
                    <Coins className="w-4 h-4" />
                    Need {BOOST_COST - coins} more coins
                  </>
                )}
              </button>
            )}
            {!canAfford && !isBoosted && (
              <p className="text-center text-zinc-400 text-[10px] mt-2">
                Earn coins by referring friends below 👇
              </p>
            )}
          </section>

          {/* REFER & EARN */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Gift className="w-5 h-5 text-pink-400" />
              <h2 className="text-white text-base font-bold">Refer & Earn Coins</h2>
            </div>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              No real money. Earn coins by inviting friends. Share your link and both of you get rewarded.
            </p>

            {/* Reward split */}
            <div className="grid grid-cols-2 gap-2.5 mt-3">
              <div className="bg-gradient-to-br from-purple-950/60 to-purple-900/40 border border-purple-500/30 rounded-2xl p-3 text-center">
                <div className="text-amber-300 text-2xl font-extrabold">+{REFER_BONUS}</div>
                <div className="text-[10px] text-zinc-300 mt-0.5">coins to you</div>
                <div className="text-[9px] text-zinc-500 mt-1">when your friend signs up</div>
              </div>
              <div className="bg-gradient-to-br from-emerald-950/60 to-emerald-900/40 border border-emerald-500/30 rounded-2xl p-3 text-center">
                <div className="text-amber-300 text-2xl font-extrabold">+{SIGNUP_BONUS}</div>
                <div className="text-[10px] text-zinc-300 mt-0.5">coins to friend</div>
                <div className="text-[9px] text-zinc-500 mt-1">as a welcome bonus</div>
              </div>
            </div>

            {/* Referral code */}
            <div className="mt-3 bg-zinc-950 border border-zinc-800 rounded-xl p-3">
              <div className="text-[10px] text-zinc-400 mb-1">Your referral code</div>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-purple-300 text-sm font-bold tracking-wider">
                  {referralCode || 'JRBOOST'}
                </code>
                <button
                  onClick={handleCopyCode}
                  className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center cursor-pointer active:scale-95"
                  title="Copy code"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Share buttons */}
            <div className="grid grid-cols-3 gap-2 mt-3">
              <button
                onClick={() => handleShare('whatsapp')}
                className="py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-[11px] font-bold flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" /> WhatsApp
              </button>
              <button
                onClick={() => handleShare('sms')}
                className="py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-[11px] font-bold flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" /> SMS
              </button>
              <button
                onClick={handleCopyCode}
                className="py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-[11px] font-bold flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" /> Copy
              </button>
            </div>

            {/* Referral stats */}
            <div className="mt-3 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1.5 text-zinc-300">
                <Users className="w-3.5 h-3.5 text-purple-400" />
                {referrals.length} friend{referrals.length !== 1 ? 's' : ''} joined
              </div>
              <div className="text-amber-300 font-bold">
                +{referrals.length * REFER_BONUS} coins earned
              </div>
            </div>
          </section>

          {/* TESTIMONIALS */}
          <section>
            <h2 className="text-white text-base font-bold">They got hired. You are next.</h2>
            <p className="text-zinc-400 text-[11px] mt-0.5">
              Every candidate below was hired through JobReels.
            </p>
            <div className="mt-3 space-y-2.5">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3.5">
                <div className="flex items-center gap-2.5">
                  <img
                    src={TESTIMONIALS[activeTestimonial].avatar}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-white text-xs font-bold">
                        {TESTIMONIALS[activeTestimonial].name}
                      </span>
                      <span className="text-zinc-400 text-[10px]">
                        • {TESTIMONIALS[activeTestimonial].city}
                      </span>
                    </div>
                    <span className="text-purple-300 text-[10px] font-semibold">
                      ✓ HIRED VIA JOBREELS
                    </span>
                  </div>
                  <div className="flex text-amber-300">
                    {[...Array(TESTIMONIALS[activeTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-zinc-300 text-xs mt-2.5 leading-relaxed">
                  "{TESTIMONIALS[activeTestimonial].text}"
                </p>
                <div className="text-emerald-400 text-[10px] font-bold mt-2">
                  {TESTIMONIALS[activeTestimonial].role}
                </div>
              </div>
            </div>
            {/* dots */}
            <div className="flex justify-center gap-1.5 mt-3">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    i === activeTestimonial ? 'w-6 bg-purple-500' : 'w-1.5 bg-zinc-700'
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </section>

          {/* TRUST BADGES */}
          <section className="grid grid-cols-3 gap-2.5">
            {[
              { icon: Shield, label: '100% Safe' },
              { icon: RefreshCw, label: 'Cancel anytime' },
              { icon: Lock, label: 'No real money' },
            ].map((b, i) => {
              const Icon = b.icon;
              return (
                <div
                  key={i}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-center"
                >
                  <Icon className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                  <div className="text-zinc-300 text-[10px] font-semibold">{b.label}</div>
                </div>
              );
            })}
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-white text-base font-bold">Common questions</h2>
            <div className="mt-3 space-y-2">
              {FAQS.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={i}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-center justify-between p-3 text-left cursor-pointer"
                    >
                      <span className="text-white text-xs font-semibold pr-2">{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform ${
                          isOpen ? 'rotate-180 text-purple-400' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-3 pb-3 text-zinc-400 text-[11px] leading-relaxed animate-in fade-in">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* BOTTOM CTA */}
          <div className="text-center pt-2 pb-4">
            <h3 className="text-white text-xl font-extrabold leading-tight">
              Your next job is one call away.
            </h3>
            <p className="text-zinc-400 text-[11px] mt-1">
              Boost your profile and let companies find you.
            </p>
            {!isBoosted && (
              <button
                onClick={onBoost}
                disabled={!canAfford}
                className={`w-full mt-4 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition active:scale-95 ${
                  canAfford
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-zinc-900 shadow-lg shadow-amber-500/30 cursor-pointer'
                    : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                }`}
              >
                {canAfford ? (
                  <>
                    <Rocket className="w-5 h-5" />
                    Get Boost for {BOOST_COST} coins
                  </>
                ) : (
                  <>
                    <Gift className="w-5 h-5" />
                    Refer friends to earn {BOOST_COST - coins} coins
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoostPage;
