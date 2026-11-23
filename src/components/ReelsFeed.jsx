import React, { useState, useRef, useEffect } from 'react';
import { 
  Heart, MessageCircle, Share2, Bookmark, AlertTriangle, 
  Volume2, VolumeX, Briefcase, MapPin, CheckCircle, ChevronUp, ChevronDown, Send, Play, Pause, Compass, Plus
} from 'lucide-react';

export const ReelsFeed = ({ 
  reels = [], 
  onApplyJob, 
  appliedJobIds = [], 
  onReport, 
  onOpenPost,
  t 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showPlayIcon, setShowPlayIcon] = useState(false);
  const [likedReels, setLikedReels] = useState({});
  const [savedReels, setSavedReels] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [isCaptionExpanded, setIsCaptionExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [swipeHint, setSwipeHint] = useState(true);
  const [commentsList, setCommentsList] = useState([
    { id: 1, user: "Rohan V.", text: "Is this position open for immediate joiners?" },
    { id: 2, user: "Recruiter Team", text: "Yes! Tap APPLY NOW to connect directly with the hiring manager." },
    { id: 3, user: "Ananya S.", text: "Can freshers apply for the junior role?" }
  ]);
  const [newComment, setNewComment] = useState("");
  
  const videoRef = useRef(null);
  const touchStartY = useRef(null);
  const touchStartX = useRef(null);
  const isSwiping = useRef(false);
  const lastWheelTime = useRef(0);

  const activeReel = reels[currentIndex] || reels[0] || {};
  const isLiked = !!likedReels[activeReel?.id];
  const isSaved = !!savedReels[activeReel?.id];
  const hasApplied = activeReel?.jobDetails && appliedJobIds.includes(activeReel.jobDetails.id);

  // When a new reel is prepended (first reel id changes), jump to it so the
  // user immediately sees their freshly uploaded reel.
  useEffect(() => {
    if (reels.length && currentIndex !== 0) {
      setCurrentIndex(0);
    }
  }, [reels[0]?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Play active video on reel index change
  useEffect(() => {
    setIsCaptionExpanded(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.log("Autoplay caught:", e);
      });
    }
  }, [currentIndex]);

  // Hide swipe hint after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => setSwipeHint(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleNextReel = () => {
    setSwipeHint(false);
    if (currentIndex < reels.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0); // loop back to first reel
    }
  };

  const handlePrevReel = () => {
    setSwipeHint(false);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Touch Swipe Handlers (Vertical Swipe Up/Down)
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
    isSwiping.current = true;
  };

  const handleTouchEnd = (e) => {
    if (!isSwiping.current || touchStartY.current === null) return;
    const endY = e.changedTouches[0].clientY;
    const endX = e.changedTouches[0].clientX;
    const diffY = touchStartY.current - endY;
    const diffX = touchStartX.current - endX;

    // Minimum swipe threshold: 40px, mostly vertical
    if (Math.abs(diffY) > 40 && Math.abs(diffY) > Math.abs(diffX)) {
      if (diffY > 0) {
        // Swiped Up -> Next reel
        handleNextReel();
      } else {
        // Swiped Down -> Previous reel
        handlePrevReel();
      }
    }
    isSwiping.current = false;
    touchStartY.current = null;
    touchStartX.current = null;
  };

  // Trackpad / Mouse Wheel Swipe
  const handleWheel = (e) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 450) return; // Debounce wheel
    if (Math.abs(e.deltaY) > 25) {
      lastWheelTime.current = now;
      if (e.deltaY > 0) {
        handleNextReel();
      } else {
        handlePrevReel();
      }
    }
  };

  // Keyboard Navigation (ArrowUp / ArrowDown / Space)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showComments) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        handleNextReel();
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        handlePrevReel();
      } else if (e.key === " ") {
        e.preventDefault();
        togglePlayPause();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, isPlaying, showComments]);

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
    setShowPlayIcon(true);
    setTimeout(() => setShowPlayIcon(false), 700);
  };

  const toggleSound = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  const toggleLike = (e) => {
    e.stopPropagation();
    if (!activeReel?.id) return;
    setLikedReels((prev) => ({
      ...prev,
      [activeReel.id]: !prev[activeReel.id]
    }));
  };

  const toggleSave = (e) => {
    e.stopPropagation();
    if (!activeReel?.id) return;
    setSavedReels((prev) => ({
      ...prev,
      [activeReel.id]: !prev[activeReel.id]
    }));
  };

  const handleShareWhatsApp = (e) => {
    e.stopPropagation();
    if (!activeReel) return;
    const text = encodeURIComponent(
      `Check out this Job Reel on JobReels: ${activeReel.caption}\nDirect Apply: https://jobreels.io/reels/${activeReel.id}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setCommentsList((prev) => [
      ...prev,
      { id: Date.now(), user: "You", text: newComment.trim() }
    ]);
    setNewComment("");
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(p);
    }
  };

  if (!activeReel || !activeReel.videoUrl) {
    return (
      <div className="w-full h-[calc(100vh-115px)] flex items-center justify-center bg-black text-slate-400">
        Loading reels...
      </div>
    );
  }

  return (
    <div 
      onClick={togglePlayPause}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
      className="relative w-full h-[calc(100vh-115px)] max-h-[820px] bg-black overflow-hidden flex items-center justify-center select-none cursor-pointer"
    >
      {/* REAL HTML5 AUTOPLAYING VIDEO ELEMENT WITH SMOOTH TRANSITION */}
      <video
        ref={videoRef}
        key={activeReel.videoUrl}
        src={activeReel.videoUrl}
        poster={activeReel.poster}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        onTimeUpdate={handleTimeUpdate}
        className="absolute inset-0 w-full h-full object-cover animate-in fade-in zoom-in-95 duration-300"
      />

      {/* Dark Gradient Vignette for readable UI */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-black/60 pointer-events-none" />

      {/* Center Play / Pause Indicator */}
      {showPlayIcon && (
        <div className="absolute z-30 w-16 h-16 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white animate-in zoom-in-50 fade-out-50 duration-500">
          {isPlaying ? <Play className="w-8 h-8 fill-white ml-1" /> : <Pause className="w-8 h-8 fill-white" />}
        </div>
      )}

      {/* Top Left: Swipe Hint (Reel counter 1/4 removed as requested) */}
      {swipeHint && (
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <span className="bg-emerald-600/90 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-lg border border-emerald-400 animate-bounce flex items-center gap-1">
            <span>Swipe ↕ to next reel</span>
          </span>
        </div>
      )}

      {/* Right Side Compact Action Bar (Post Reel, Like, Comment, Save, Share, Report) */}
      <div className="absolute right-2.5 bottom-24 z-20 flex flex-col items-center gap-2.5" onClick={(e) => e.stopPropagation()}>
        {/* Post Reel (Plus icon on top of Like) */}
        {onOpenPost && (
          <button
            onClick={onOpenPost}
            className="flex flex-col items-center group active:scale-90 transition-transform cursor-pointer"
            title="Post a reel"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 text-white flex items-center justify-center border border-white/20 shadow-md shadow-purple-600/50 hover:scale-105 transition-all">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-semibold text-purple-100 drop-shadow mt-0.5">
              Post
            </span>
          </button>
        )}

        {/* Like */}
        <button
          onClick={toggleLike}
          className="flex flex-col items-center group active:scale-90 transition-transform cursor-pointer"
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border shadow-md transition-all ${
            isLiked ? "bg-purple-600 border-purple-400 text-white shadow-purple-600/50" : "bg-black/60 border-purple-500/30 text-purple-200 hover:border-purple-400"
          }`}>
            <Heart className={`w-4 h-4 ${isLiked ? "fill-white" : ""}`} />
          </div>
          <span className="text-[10px] font-semibold text-purple-100 drop-shadow mt-0.5">
            {(activeReel.likes || 1200) + (isLiked ? 1 : 0)}
          </span>
        </button>

        {/* Comment */}
        <button
          onClick={() => setShowComments(true)}
          className="flex flex-col items-center group active:scale-90 transition-transform cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-purple-200 flex items-center justify-center border border-purple-500/30 shadow-md hover:border-purple-400 transition-all">
            <MessageCircle className="w-4 h-4 text-purple-300" />
          </div>
          <span className="text-[10px] font-semibold text-purple-100 drop-shadow mt-0.5">
            {(activeReel.comments || 50) + commentsList.length - 3}
          </span>
        </button>

        {/* Save */}
        <button
          onClick={toggleSave}
          className="flex flex-col items-center group active:scale-90 transition-transform cursor-pointer"
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border shadow-md transition-all ${
            isSaved ? "bg-purple-600 border-purple-400 text-white shadow-purple-600/50" : "bg-black/60 border-purple-500/30 text-purple-200 hover:border-purple-400"
          }`}>
            <Bookmark className={`w-4 h-4 ${isSaved ? "fill-white" : ""}`} />
          </div>
          <span className="text-[10px] font-semibold text-purple-100 drop-shadow mt-0.5">
            {t?.save || "Save"}
          </span>
        </button>

        {/* Share WhatsApp */}
        <button
          onClick={handleShareWhatsApp}
          className="flex flex-col items-center group active:scale-90 transition-transform cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-purple-200 flex items-center justify-center border border-purple-500/30 shadow-md hover:border-purple-400 transition-all">
            <Share2 className="w-4 h-4 text-purple-300" />
          </div>
          <span className="text-[10px] font-semibold text-purple-100 drop-shadow mt-0.5">
            Share
          </span>
        </button>

        {/* Report */}
        <button
          onClick={() => onReport(activeReel)}
          className="flex flex-col items-center group active:scale-90 transition-transform cursor-pointer"
        >
          <div className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md text-zinc-400 hover:text-rose-400 flex items-center justify-center border border-white/10">
            <AlertTriangle className="w-3.5 h-3.5" />
          </div>
          <span className="text-[9px] font-medium text-zinc-400 mt-0.5">
            {t?.report || "Report"}
          </span>
        </button>
      </div>

      {/* Bottom Content: Creator info, caption, skills & In-Feed Job Card */}
      <div className="absolute left-0 right-16 bottom-3 z-20 px-4 text-white" onClick={(e) => e.stopPropagation()}>
        {/* Creator Info */}
        <div className="flex items-center gap-2.5 mb-2">
          <img
            src={activeReel.creator?.avatar}
            alt={activeReel.creator?.name}
            className="w-9 h-9 rounded-full object-cover border border-purple-400/80 shadow"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="font-bold text-xs tracking-tight text-white drop-shadow">
                {activeReel.creator?.name}
              </h2>
              {activeReel.creator?.verified && (
                <CheckCircle className="w-3.5 h-3.5 text-purple-400 fill-purple-500 text-white" />
              )}
            </div>
            <p className="text-xs text-zinc-300 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-rose-400" />
              {activeReel.location}
            </p>
          </div>
        </div>

        {/* Caption & Project Info: collapsed to title + plain '...' by default, expandable on click */}
        <div className="text-xs text-zinc-100 font-normal mb-2.5 leading-relaxed drop-shadow">
          {!isCaptionExpanded ? (
            <p className="line-clamp-2">
              <span className="font-medium text-white">
                {activeReel.title || activeReel.caption?.split(' - ')[0] || activeReel.caption?.slice(0, 45)}
              </span>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCaptionExpanded(true);
                }}
                className="cursor-pointer text-zinc-300 hover:text-white select-none ml-1 font-semibold"
                title="Expand"
              >
                ...
              </span>
            </p>
          ) : (
            <p className="max-h-36 overflow-y-auto no-scrollbar">
              <span>{activeReel.caption} </span>
              {activeReel.skills?.map((skill, i) => {
                const cleanTag = skill.replace(/[\s\.]+/g, '').toLowerCase();
                return (
                  <span
                    key={i}
                    className="text-purple-300 font-semibold hover:text-purple-200 hover:underline mr-1.5 cursor-pointer"
                  >
                    #{cleanTag}
                  </span>
                );
              })}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCaptionExpanded(false);
                }}
                className="cursor-pointer text-zinc-400 hover:text-zinc-200 select-none ml-1 font-semibold"
                title="Collapse"
              >
                ...
              </span>
            </p>
          )}
        </div>

        {/* IN-FEED JOB CARD & ONE-TAP APPLY BUTTON */}
        {activeReel.jobDetails && (
          <div className="box-inset-3d rounded-2xl p-3 backdrop-blur-md shadow-2xl">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="text-xs font-bold text-white leading-tight truncate">
                  {activeReel.jobDetails.title}
                </h3>
                <p className="text-xs font-bold text-purple-300 mt-0.5">
                  {activeReel.jobDetails.salary}
                </p>
              </div>

              {/* One-Tap APPLY NOW Button with Light Purple Click Shadow */}
              <button
                onClick={() => onApplyJob(activeReel.jobDetails)}
                disabled={hasApplied}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  hasApplied
                    ? "bg-zinc-800 text-zinc-400 border border-zinc-700 cursor-default"
                    : "btn-purple"
                }`}
              >
                {hasApplied ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{t?.applied || "Applied ✓"}</span>
                  </>
                ) : (
                  <>
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>{t?.applyNow || "APPLY NOW"}</span>
                  </>
                )}
              </button>
            </div>
            <div className="text-xs text-zinc-400 flex items-center justify-between border-t border-zinc-800 pt-1.5 mt-1.5">
              <span className="truncate">🎓 {activeReel.jobDetails.education}</span>
              <span className="shrink-0 font-medium text-zinc-300">🏢 {activeReel.jobDetails.company}</span>
            </div>
          </div>
        )}
      </div>

      {/* Video Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div 
          className="h-full bg-purple-500 transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Comments Drawer */}
      {showComments && (
        <div 
          className="absolute inset-x-0 bottom-0 top-1/3 bg-slate-900/98 border-t border-slate-700 z-30 rounded-t-3xl p-4 flex flex-col shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom-5"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
            <h4 className="font-bold text-xs text-white">Questions & Inquiries ({commentsList.length})</h4>
            <button
              onClick={() => setShowComments(false)}
              className="text-slate-400 hover:text-white text-xs font-bold px-2 py-1 cursor-pointer"
            >
              ✕ Close
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2.5 no-scrollbar pr-1">
            {commentsList.map((c) => (
              <div key={c.id} className="bg-slate-800/60 rounded-xl p-2.5 border border-slate-700/50">
                <span className="font-bold text-[11px] text-emerald-400">{c.user}</span>
                <p className="text-xs text-slate-200 mt-0.5">{c.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddComment} className="mt-3 flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ask a question about this role..."
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-xl text-xs font-bold cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
