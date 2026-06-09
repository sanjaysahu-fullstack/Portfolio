import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { profileData } from "../data";

interface HeaderProps {
  activeSection: string;
}

export default function Header({ activeSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "About", id: "home" },
    { label: "Highlights", id: "about" },
    { label: "Work", id: "projects" },
    { label: "LinkedIn", id: "linkedin", isExternal: true, url: "https://linkedin.com" },
    { label: "Get in touch", id: "contact", isContact: true },
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 md:px-0 pointer-events-none"
    >
      {/* Centered Floating Capsule */}
      <div 
        className="w-full max-w-xl bg-white/95 backdrop-blur-xl border border-zinc-200/50 py-1.5 pl-4 pr-1.5 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.06)] flex items-center justify-between pointer-events-auto transition-all"
        id="navbar-capsule"
      >
        <div className="flex items-center gap-1.5 md:gap-3.5 w-full justify-between md:justify-start">
          {navItems.map((item) => {
            // Determine active highlight
            let isActive = false;
            if (item.id === "home") {
              isActive = activeSection === "home";
            } else if (item.id === "about") {
              isActive = activeSection === "about" || activeSection === "skills";
            } else {
              isActive = activeSection === item.id;
            }

            if (item.isContact) {
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="px-4.5 py-1.5 rounded-full text-xs font-sans font-semibold tracking-tight bg-zinc-950 text-white hover:bg-zinc-800 transition-all cursor-pointer active:scale-95 ml-auto shrink-0"
                >
                  {item.label}
                </button>
              );
            }

            if (item.isExternal) {
              return (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hidden md:inline-block px-3 py-1.5 text-xs font-sans font-medium tracking-tight text-zinc-550 hover:text-zinc-950 transition-colors shrink-0"
                >
                  {item.label}
                </a>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`hidden md:inline-block relative px-3 py-1.5 rounded-full font-sans text-xs tracking-tight transition-all font-medium cursor-pointer ${
                  isActive ? "text-zinc-950 font-semibold" : "text-zinc-550 hover:text-zinc-950"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavBG"
                    className="absolute inset-0 bg-zinc-50 rounded-full -z-10 border border-zinc-200/30"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile Hamburger Trigger */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-750 hover:bg-zinc-50 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-16 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl border border-zinc-200/50 p-5 shadow-xl flex flex-col gap-2.5 pointer-events-auto"
          >
            {navItems.map((item) => {
              if (item.isExternal) {
                return (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center justify-between px-4 py-2.5 rounded-xl text-left text-xs font-semibold tracking-tight text-zinc-800 hover:bg-zinc-50 hover:text-zinc-950 transition-all cursor-pointer"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                  </a>
                );
              }
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl text-left text-xs font-semibold tracking-tight text-zinc-800 hover:bg-zinc-50 hover:text-zinc-950 transition-all cursor-pointer"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
