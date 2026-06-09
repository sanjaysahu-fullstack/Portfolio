import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { profileData } from "../data";

export default function Hero() {
  const sanjayProfile = "/src/assets/images/sanjay_profile.png";
  const [isHovered, setIsHovered] = useState(false);
  const [showHiringAlert, setShowHiringAlert] = useState(true);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-[90vh] flex flex-col items-center justify-center text-center pt-24 sm:pt-32 pb-14 px-4 select-none relative z-10 animate-fade-in"
    >
      <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16 w-full">
        {/* Dynamic Centered Text Cluster with Minimalist Apple-style Spacing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-4 sm:space-y-6"
        >
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-sans font-extrabold tracking-tighter text-zinc-950 leading-[1.08] sm:leading-[1.05]">
              Hi, I'm {profileData.name}
            </h1>
            <p className="text-lg sm:text-2.5xl md:text-3.5xl font-sans font-semibold tracking-tight text-zinc-850 opacity-90">
              Experience Developer at Avish Educom
            </p>
          </div>
          
          <p className="text-sm sm:text-base md:text-lg text-zinc-500 font-sans tracking-tight max-w-2xl mx-auto font-normal leading-relaxed">
            MERN stack specialist. Computer Science student. Chhattisgarh based.
          </p>
        </motion.div>

        {/* Premium Cinematic Portrait Container (Single Elegant Image) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
          className="relative flex items-center justify-center pointer-events-auto max-w-lg mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Subtle surround background glow on hover, synced via React state */}
          <div 
            className={`absolute -inset-8 rounded-[3.5rem] bg-gradient-to-tr from-amber-500/5 via-zinc-200/20 to-transparent blur-3xl transition-opacity duration-700 pointer-events-none ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Portrait clipping envelope with color scale transition */}
          <div 
            className="relative w-[300px] h-[360px] sm:w-[480px] sm:h-[580px] rounded-[2.5rem] sm:rounded-[3.2rem] overflow-hidden border border-zinc-200/50 bg-white transition-all duration-[600ms] cubic-bezier(0.16, 1, 0.3, 1)"
            style={{
              boxShadow: isHovered 
                ? "0 40px 80px -15px rgba(0,0,0,0.12), 0 0 50px -10px rgba(245,158,11,0.06)" 
                : "0 10px 30px -10px rgba(0,0,0,0.04)"
            }}
          >
            <motion.img
              src={sanjayProfile}
              alt={`${profileData.name} portrait`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover select-none object-top"
              animate={{
                filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
                scale: isHovered ? 1.04 : 1.0,
              }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1]
              }}
            />
            {/* Ambient vignette shadow layer */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/[0.02] via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Floating 'Available for hire' Capsule - overlaps bottom boundary */}
          <AnimatePresence>
            {showHiringAlert && (
              <motion.div
                initial={{ opacity: 0, y: 15, x: "-50%" }}
                animate={{ opacity: 1, y: 0, x: "-50%" }}
                exit={{ opacity: 0, y: 10, scale: 0.95, x: "-50%" }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
                className="absolute bottom-[-18px] left-1/2 z-20 w-[92%] max-w-[340px] sm:max-w-[370px] bg-white/95 backdrop-blur-md border border-zinc-200/80 py-2 pl-3 pr-2 rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.08)] flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-zinc-200/50 flex-shrink-0">
                    <img 
                      src={sanjayProfile} 
                      alt="Sanjay avatar" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top grayscale"
                    />
                  </div>
                  <div className="flex flex-col text-left truncate">
                    <span className="text-[11px] sm:text-xs font-sans font-semibold text-zinc-900 truncate">
                      Sanjay is available for hire
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={scrollToContact}
                    className="px-3.5 py-1.5 rounded-full bg-zinc-950 text-white hover:bg-zinc-800 text-[10px] sm:text-xs font-bold leading-none tracking-tight transition-colors cursor-pointer"
                  >
                    Hire Sanjay
                  </button>
                  <button 
                    onClick={() => setShowHiringAlert(false)}
                    className="w-5 h-5 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-650 hover:bg-zinc-100 transition-colors cursor-pointer"
                    aria-label="Dismiss hiring status indicator"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

