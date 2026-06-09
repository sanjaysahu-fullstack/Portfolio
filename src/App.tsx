import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  Database,
  Code2,
  Cpu,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Sparkles,
  Award,
  ChevronRight,
  Github,
  Check,
  Send,
  FileText,
  Printer,
  X,
  Compass,
  Activity,
  Layers,
  Briefcase
} from "lucide-react";

import {
  profileData,
  skillsData,
  experienceData,
  projectsData,
  educationData
} from "./data";
import { Project } from "./types";

// Import custom interactive components
import Header from "./components/Header";
import Hero from "./components/Hero";
import ThreeCanvas from "./components/ThreeCanvas";
import TiltCard from "./components/TiltCard";
import ProjectModal from "./components/ProjectModal";

// Profile photo asset reference
const sanjayProfile = "/src/assets/images/sanjay_profile.png";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<"All" | "Frontend" | "Backend" | "Tools" | "Other">("All");
  
  // Floating hiring bar state (Image 1)
  const [showHiringBar, setShowHiringBar] = useState(true);

  // Resume modal preview trigger
  const [resumePreviewOpen, setResumePreviewOpen] = useState(false);

  // Form states and developer inbox simulation
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formSubject, setFormSubject] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Update active navigation link on scroll
  useEffect(() => {
    const sections = ["home", "about", "skills", "experience", "projects", "education", "contact"];
    const observers = sections.map((id) => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      observer.observe(element);
      return { observer, element };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.element);
      });
    };
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;

    setFormSubmitted(true);
    setFormName("");
    setFormEmail("");
    setFormSubject("");
    setFormMessage("");

    setTimeout(() => {
      setFormSubmitted(false);
    }, 6000);
  };

  const handleDirectDownload = () => {
    const textResume = `
SANJAY SAHU - FULL STACK DEVELOPER
Balodabazar, Chhattisgarh | +91 8120067073 | sanjaysahu10067@gmail.com
GitHub: ${profileData.github}

CAREER OBJECTIVE:
${profileData.bio}

SKILLS MATRIX:
- Frontend: HTML5, CSS3, JavaScript (ES6+), Bootstrap, React.js
- Backend: Node.js, Express.js, MongoDB, RESTful APIs
- Tools: Git, GitHub, VS Code, Thunder Client
- Other: Responsive Web Layouts, UI/UX Fundamentals, Debugging

PRACTICAL EXPERIENCE & TRAINING:
Avish Educom | Web Development Certification Course (June 2025 - May 2026)
- Applied the MERN stack (MongoDB, Express.js, React, Node.js)
- Crafted robust Express REST APIs and responsive UI layouts.

PROJECTS:
1. MERN Stack Job Portal
- Built using: MongoDB, Express, React, Node, Tailwind CSS
2. Professional Interactive Portfolio

EDUCATION HISTORY:
- Government Polytechnic, Durg: Diploma in Computer Science Engineering (2023 - Pursuing)
- Gyan Vidya Higher Secondary School, Raseda: 12th Standard – 77.8% (2023)
- Gyan Vidya Higher Secondary School, Raseda: 10th Standard – 97.0% (2021)
    `;

  const link = document.createElement("a");
link.href = "/SanjaySahu_CV.pdf";
link.download = "SanjaySahu_CV.pdf";
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
  };

  const filteredSkills = skillsData.filter((skill) => {
    if (selectedSkillCategory === "All") return true;
    return skill.category === selectedSkillCategory;
  });

  return (
    <div className="relative min-h-screen text-zinc-800 font-sans selection:bg-amber-100 overflow-x-hidden bg-[#f7f7f8]">
      
      {/* 1. Technical blueprint lines (Modified for light theme) */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-40 animate-fade-in"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.04) 1px, transparent 0),
            linear-gradient(rgba(0, 0, 0, 0.01) 1px, transparent 0),
            linear-gradient(90deg, rgba(0, 0, 0, 0.01) 1px, transparent 0)
          `,
          backgroundSize: "24px 24px, 120px 120px, 120px 120px",
          maskImage: "radial-gradient(ellipse at 50% 50%, black, transparent 95%)"
        }}
      />

      {/* 2. Interactive Real-time WebGL Crystalline canvas (Lighter refracting glass settings) */}
      <ThreeCanvas />

      {/* 3. Floating Capsule Header */}
      <Header activeSection={activeSection} />

      {/* Main Container */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 space-y-36 pb-36 pt-36">
        
        {/* SECTION 1: HERO VIEW (Minimal / High contrast / Swiss styled - Image 1) */}
        <Hero />

        {/* SECTION 2: ABOUT / FOCUS (about - Bento layout) */}
        <section id="about" className="space-y-10 scroll-mt-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200/60 pb-5">
            <div className="text-left">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-1">01 / CAPABILITIES</span>
              <h2 className="text-2xl sm:text-3xl font-display font-medium text-zinc-950 tracking-tight">Core Competency</h2>
            </div>
            <p className="text-[11px] font-mono text-zinc-400 tracking-wider">MERN ARCHITECTURE LAB</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Primary career card */}
            <div className="md:col-span-2 rounded-3xl bg-white border border-zinc-200/40 p-8 sm:p-10 flex flex-col justify-between space-y-8 hover:border-zinc-300 transition-all shadow-[0_15px_35px_rgba(0,0,0,0.02)] group">
              <div className="space-y-5 text-left">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center border border-amber-200/50 shadow-sm">
                  <Sparkles className="w-5 h-5 text-amber-700" />
                </div>
                <h3 className="text-2xl font-display font-medium text-zinc-950 group-hover:text-amber-700 transition-colors">Career Objective</h3>
                <p className="text-base text-zinc-650 leading-relaxed font-sans font-light">
                  {profileData.bio}
                </p>
              </div>
              
              <div className="pt-6 border-t border-zinc-100 grid grid-cols-2 gap-6 text-left">
                <div>
                  <p className="text-3xl font-display font-black text-zinc-950">100%</p>
                  <p className="text-[10px] font-mono text-zinc-400 mt-1.5 uppercase tracking-widest leading-relaxed">
                    Compliance to Mobile-First responsive layouts
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-display font-black text-amber-700">MERN</p>
                  <p className="text-[10px] font-mono text-zinc-400 mt-1.5 uppercase tracking-widest leading-relaxed">
                    Custom modular clean structures
                  </p>
                </div>
              </div>
            </div>

            {/* Micro details panel with actions */}
            <div className="rounded-3xl bg-white border border-zinc-200/40 p-8 flex flex-col justify-between space-y-8 hover:border-zinc-300 transition-all shadow-[0_15px_35px_rgba(0,0,0,0.02)] text-left">
              <div className="space-y-2">
                <h3 className="text-lg font-display font-bold text-zinc-950">Direct Connect</h3>
                <p className="text-xs text-zinc-450 leading-normal font-light">Fast responsive channels for collaboration.</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3.5 group">
                  <div className="w-9 h-9 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-500 border border-zinc-200/60 group-hover:bg-amber-50 group-hover:text-amber-700 transition-all">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[8px] font-mono text-zinc-400 tracking-widest uppercase font-bold">EMAIL ADDRESS</p>
                    <a href={`mailto:${profileData.email}`} className="text-xs text-zinc-700 hover:text-amber-700 font-mono font-medium transition-colors">
                      {profileData.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 group">
                  <div className="w-9 h-9 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-500 border border-zinc-200/60 group-hover:bg-amber-50 group-hover:text-amber-700 transition-all">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[8px] font-mono text-zinc-400 tracking-widest uppercase font-bold">PHONE CALL</p>
                    <a href={`tel:${profileData.phone}`} className="text-xs text-zinc-700 hover:text-amber-700 font-mono font-medium transition-colors">
                      {profileData.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-500 border border-zinc-200/60">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[8px] font-mono text-zinc-400 tracking-widest uppercase font-bold">LOCALE HUB</p>
                    <p className="text-xs text-zinc-700 font-medium">
                      Chhattisgarh, IN
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                <button
                  onClick={() => setResumePreviewOpen(true)}
                  className="w-full py-3 rounded-xl bg-zinc-950 text-white hover:bg-zinc-900 text-xs text-center transition-colors flex items-center justify-center gap-1.5 font-bold uppercase tracking-wider cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-amber-500" />
                  <span>Render Official CV</span>
                </button>

                <a
                  href={profileData.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="w-full py-3 rounded-xl bg-zinc-50 border border-zinc-200 hover:bg-zinc-100/80 text-xs text-center text-zinc-805 transition-colors flex items-center justify-center gap-1.5 group font-bold uppercase tracking-wider"
                >
                  <Github className="w-4 h-4 text-zinc-655" />
                  <span>GitHub Repos</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Portrait Lookbook Grid */}
          <div className="pt-8 text-left space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-t border-zinc-200/50 pt-8">
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-1">01B / VISUAL LOOKBOOK</span>
                <h3 className="text-xl font-display font-medium text-zinc-950 tracking-tight font-sans">Structured Perspectives</h3>
              </div>
              <p className="text-[10px] font-mono text-zinc-400 tracking-wider">CREATOR ALIGNMENT SERIES</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1 */}
              <div className="group relative rounded-2xl overflow-hidden border border-zinc-200/40 bg-white shadow-sm hover:border-zinc-300 transition-all">
                <div className="h-[180px] sm:h-[260px] overflow-hidden bg-zinc-50 relative">
                  <img
                    src="/src/assets/images/sanjay_night_lamp.png"
                    alt="Sanjay Night Lamp"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-left">
                    <span className="text-[9px] font-mono text-amber-400 uppercase tracking-widest font-bold">Night Serenade</span>
                    <p className="text-xs font-semibold text-white mt-0.5">Under the Streetlamp</p>
                  </div>
                </div>
                <div className="p-3 text-left border-t border-zinc-100 flex flex-col gap-0.5">
                  <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest font-bold">SCENARIO A</span>
                  <span className="text-xs font-semibold text-zinc-900">Cinematic Nocturnal</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group relative rounded-2xl overflow-hidden border border-zinc-200/40 bg-white shadow-sm hover:border-zinc-300 transition-all">
                <div className="h-[180px] sm:h-[260px] overflow-hidden bg-zinc-50 relative">
                  <img
                    src="/src/assets/images/sanjay_side.png"
                    alt="Sanjay Standing Side Profile"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-left">
                    <span className="text-[9px] font-mono text-amber-400 uppercase tracking-widest font-bold">Linear Symmetry</span>
                    <p className="text-xs font-semibold text-white mt-0.5">Structured Side Profile</p>
                  </div>
                </div>
                <div className="p-3 text-left border-t border-zinc-100 flex flex-col gap-0.5">
                  <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest font-bold">SCENARIO B</span>
                  <span className="text-xs font-semibold text-zinc-900">Creative Alignment</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group relative rounded-2xl overflow-hidden border border-zinc-200/40 bg-white shadow-sm hover:border-zinc-300 transition-all">
                <div className="h-[180px] sm:h-[260px] overflow-hidden bg-zinc-50 relative">
                  <img
                    src="/src/assets/images/sanjay_down.png"
                    alt="Sanjay Candid Focus"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-left">
                    <span className="text-[9px] font-mono text-amber-400 uppercase tracking-widest font-bold">Candid Vision</span>
                    <p className="text-xs font-semibold text-white mt-0.5">Minimalist Cuffs Detail</p>
                  </div>
                </div>
                <div className="p-3 text-left border-t border-zinc-100 flex flex-col gap-0.5">
                  <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest font-bold">SCENARIO C</span>
                  <span className="text-xs font-semibold text-zinc-900">Candid Focus</span>
                </div>
              </div>

              {/* Card 4 */}
              <div className="group relative rounded-2xl overflow-hidden border border-zinc-200/40 bg-white shadow-sm hover:border-zinc-300 transition-all">
                <div className="h-[180px] sm:h-[260px] overflow-hidden bg-zinc-50 relative">
                  <img
                    src="/src/assets/images/sanjay_sunset.png"
                    alt="Sanjay Sunset Classic"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-left">
                    <span className="text-[9px] font-mono text-amber-400 uppercase tracking-widest font-bold">Classic Horizon</span>
                    <p className="text-xs font-semibold text-white mt-0.5">Vintage Luxury Sunset</p>
                  </div>
                </div>
                <div className="p-3 text-left border-t border-zinc-100 flex flex-col gap-0.5">
                  <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest font-bold">SCENARIO D</span>
                  <span className="text-xs font-semibold text-zinc-900">Creative Horizon</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: SKILLS CHART (skills) */}
        <section id="skills" className="space-y-10 scroll-mt-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200/60 pb-5">
            <div className="text-left">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-1">02 / GRAPH METRICS</span>
              <h2 className="text-2xl sm:text-3xl font-display font-medium text-zinc-950 tracking-tight">Technical Proficiency</h2>
            </div>
            
            {/* Filter buttons as rounded capsules (Image 1 Capsule theme) */}
            <div className="flex flex-wrap gap-1 bg-white p-1 rounded-full border border-zinc-200 shadow-sm align-start">
              {(["All", "Frontend", "Backend", "Tools", "Other"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedSkillCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-tight uppercase transition-all cursor-pointer ${
                    selectedSkillCategory === cat
                      ? "bg-zinc-950 text-white"
                      : "text-zinc-500 hover:text-zinc-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Skills Grid - Clean modular metric cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill, idx) => {
                const radius = 22;
                const circumference = 2 * Math.PI * radius;
                const strokeDashoffset = circumference - (skill.level / 100) * circumference;

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3, delay: idx * 0.01 }}
                    key={skill.name}
                    className="p-5 rounded-2xl bg-white border border-zinc-200/50 hover:border-zinc-300 hover:shadow-md transition-all flex items-center justify-between group h-[95px] text-left shadow-[0_10px_25px_rgba(0,0,0,0.01)]"
                  >
                    <div className="space-y-1 pt-1.5 pl-1">
                      <p className="text-sm font-bold text-zinc-950 tracking-tight group-hover:text-amber-700 transition-colors">
                        {skill.name}
                      </p>
                      <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest font-bold">
                        {skill.category}
                      </p>
                    </div>

                    {/* Circular Level Graph Indicator */}
                    <div className="relative flex items-center justify-center w-12 h-12 shrink-0">
                      <svg className="w-12 h-12 -rotate-90">
                        <circle
                          cx="24"
                          cy="24"
                          r={radius}
                          className="stroke-zinc-100 fill-none"
                          strokeWidth="3.2"
                        />
                        <motion.circle
                          cx="24"
                          cy="24"
                          r={radius}
                          className="stroke-amber-600 fill-none"
                          strokeWidth="3.2"
                          strokeDasharray={circumference}
                          initial={{ strokeDashoffset: circumference }}
                          animate={{ strokeDashoffset }}
                          transition={{ duration: 0.8, delay: 0.1 }}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute text-[9px] font-mono font-bold text-zinc-600 group-hover:text-amber-805 transition-colors">
                        {skill.level}%
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </section>

        {/* SECTION 4: EDUCATION & EXPERIENCE TIMELINE (experience) */}
        <section id="experience" className="space-y-10 scroll-mt-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200/60 pb-5">
            <div className="text-left">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-1">03 / CERTIFICATIONS</span>
              <h2 className="text-2xl sm:text-3xl font-display font-medium text-zinc-950 tracking-tight">Avish Certifications</h2>
            </div>
            <p className="text-[11px] font-mono text-zinc-400">INDUSTRY PREPAREDNESS</p>
          </div>

          <div className="max-w-3xl mx-auto relative border-l border-zinc-200/80 pl-6 sm:pl-8 space-y-12 text-left">
            {experienceData.map((exp) => (
              <div key={exp.id} className="relative group">
                {/* Node Connector Key */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4.5 h-4.5 rounded-full bg-[#f7f7f8] border-2 border-amber-600 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-amber-600" />
                </div>

                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="px-3 py-1 rounded-full text-[9px] font-mono font-bold tracking-wide uppercase bg-amber-50 text-amber-800 border border-amber-200/60">
                        AVISH ACADEMIC MASTERCLASS
                      </span>
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-zinc-950 tracking-tight mt-2.5">
                        {exp.course}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-zinc-550 mt-1 flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-amber-600" />
                        <span>{exp.organization}</span>
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs font-mono text-zinc-700 self-start sm:self-auto shadow-sm">
                      <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{exp.duration}</span>
                    </div>
                  </div>

                  {/* Syllabus Card Grid */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200/50 hover:border-zinc-300 transition-all space-y-4 shadow-[0_15px_30px_rgba(0,0,0,0.015)]">
                    <p className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase font-bold">Practical Syllabus &amp; Milestones</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px] text-zinc-600 font-sans">
                      {exp.highlights.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 border border-emerald-100 rounded-full p-0.5 bg-emerald-50/50" />
                          <span className="leading-relaxed font-light">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: PROJECTS GRID (projects) */}
        <section id="projects" className="space-y-10 scroll-mt-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200/60 pb-5">
            <div className="text-left">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-1">04 / CORE WORK</span>
              <h2 className="text-2xl sm:text-3xl font-display font-medium text-zinc-950 tracking-tight">Key Portfolio Solutions</h2>
            </div>
            <p className="text-[11px] font-mono text-zinc-400">MERN APPLICATIONS</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectsData.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group relative cursor-pointer"
              >
                {/* Clean responsive Tilt Card */}
                <TiltCard
                  className="h-full border border-zinc-200/50 group-hover:border-zinc-300 bg-white p-7 sm:p-8 flex flex-col justify-between space-y-6 relative rounded-[1.8rem] shadow-[0_15px_35px_rgba(0,0,0,0.02)]"
                  glareColor="rgba(217, 119, 6, 0.05)"
                >
                  <div className="space-y-4 text-left">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wide uppercase bg-amber-50 text-amber-800 border border-amber-200/60">
                        {project.category}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>

                    <h3 className="text-2xl font-display font-medium text-zinc-950 tracking-tight group-hover:text-amber-700 transition-all">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-sans text-zinc-550 leading-relaxed font-light line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-zinc-100">
                    <div className="space-y-1.5 text-left">
                      <p className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Key Focus Highlight</p>
                      <div className="flex items-center gap-2 text-xs text-zinc-600 font-sans font-light">
                        <Activity className="w-4 h-4 text-amber-600 shrink-0" />
                        <span className="line-clamp-1">{project.features[0]}</span>
                      </div>
                    </div>

                    {/* Tag list */}
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg text-[9px] font-mono font-semibold tracking-tight bg-zinc-50 border border-zinc-200/30 text-zinc-650"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="px-2 py-0.5 rounded-lg text-[9px] font-mono text-zinc-400">
                          +{project.tags.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                      className="w-full py-3 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-white text-[11px] font-semibold tracking-wide uppercase text-center transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95"
                    >
                      <span>Retrieve Code Specs</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: ACADEMIC HISTORY (education) */}
        <section id="education" className="space-y-10 scroll-mt-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200/60 pb-5">
            <div className="text-left">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-1">05 / ACADEMIC MARKS</span>
              <h2 className="text-2xl sm:text-3xl font-display font-medium text-zinc-950 tracking-tight">Academic Profile</h2>
            </div>
            <p className="text-[11px] font-mono text-zinc-400">CREDENTIALS</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {educationData.map((edu, idx) => {
              const isOutstanding = edu.performance && (edu.performance.includes("97") || edu.performance.includes("Pursuing") || edu.performance.includes("Progress"));
              
              return (
                <div
                  key={edu.id}
                  className={`p-6 rounded-2xl bg-white border flex flex-col justify-between space-y-6 hover:shadow-md hover:border-zinc-300 transition-all text-left shadow-[0_10px_25px_rgba(0,0,0,0.01)] ${
                    isOutstanding ? "border-amber-500/40" : "border-zinc-200/50"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center shadow-sm">
                        {idx === 0 ? <Compass className="w-4.5 h-4.5 text-zinc-800" /> : <Award className="w-4.5 h-4.5 text-zinc-800" />}
                      </div>
                      
                      <span className="text-[10px] font-mono text-zinc-400 font-bold">{edu.period}</span>
                    </div>

                    <div>
                      <h3 className="font-display font-bold text-sm sm:text-base text-zinc-950 tracking-tight leading-snug">
                        {edu.degree}
                      </h3>
                      <p className="text-xs font-semibold text-zinc-500 mt-1">
                        {edu.institution}
                      </p>
                    </div>

                    <p className="text-xs text-zinc-500 leading-relaxed font-light font-sans">
                      {edu.details}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs">
                    <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Grading Score</span>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold tracking-tight ${
                      isOutstanding
                        ? "bg-amber-50 text-amber-800 border border-amber-200"
                        : "bg-zinc-50 text-zinc-700 border border-zinc-200"
                    }`}>
                      {edu.performance}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 7: INTERACTIVE CONTACT (contact) */}
        <section id="contact" className="space-y-10 scroll-mt-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200/60 pb-5">
            <div className="text-left">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-1">06 / TRANSMISSION LINK</span>
              <h2 className="text-2xl sm:text-3xl font-display font-medium text-zinc-950 tracking-tight">Direct Ingestion</h2>
            </div>
            <p className="text-[11px] font-mono text-zinc-400">ESTABLISH CHANNEL</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Direct details card */}
            <div className="lg:col-span-5 space-y-6">
              {/* Premium Image Frame */}
              <div className="group relative rounded-3xl overflow-hidden border border-zinc-200/50 bg-white p-2 shadow-sm hover:border-zinc-300 transition-all">
                <div className="h-[280px] sm:h-[340px] rounded-2xl overflow-hidden bg-zinc-50 relative">
                  <img
                    src="/src/assets/images/sanjay_sunset.png"
                    alt="Sanjay Sunset Portrait"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-left">
                    <span className="text-[9px] font-mono text-amber-400 uppercase tracking-widest font-extrabold">Professional Vision</span>
                    <h4 className="text-xl font-display font-semibold text-white mt-1 leading-tight">{profileData.name}</h4>
                    <p className="text-xs text-zinc-300 font-light mt-1.5 font-sans leading-relaxed">
                      Specializing in robust MERN architectures and highly responsive, high-performance interfaces.
                    </p>
                  </div>
                </div>
              </div>

              {/* Potential Words Card */}
              <div className="p-8 rounded-3xl bg-white border border-zinc-200/50 text-left space-y-6 shadow-[0_15px_30px_rgba(0,0,0,0.015)]">
                <div>
                  <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest font-extrabold block mb-1.5">POTENTIAL PROFILE</span>
                  <h3 className="text-xl font-display font-medium text-zinc-950">Let's solve together.</h3>
                  <p className="text-xs sm:text-sm font-light text-zinc-550 mt-2.5 leading-relaxed font-sans">
                    I am actively seeking professional Full-Stack developer positions, corporate responsive web applications, and high-performance MERN database consulting roles. Let's engineer clean, ultra-responsive digital systems for your operational needs. Send over your criteria!
                  </p>
                </div>

                <div className="space-y-4 pt-6 border-t border-zinc-100">
                  <div className="group flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-zinc-50 border border-zinc-250/20 flex items-center justify-center text-zinc-650 group-hover:bg-amber-50 group-hover:text-amber-805 transition-all">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest font-bold">SECURE CHANNEL</p>
                      <a href={`mailto:${profileData.email}`} className="text-xs text-zinc-700 hover:text-amber-700 font-mono transition-colors">
                        {profileData.email}
                      </a>
                    </div>
                  </div>

                  <div className="group flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-zinc-50 border border-zinc-250/20 flex items-center justify-center text-zinc-650 group-hover:bg-amber-50 group-hover:text-amber-805 transition-all">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest font-bold">PRIMARY CALL</p>
                      <a href={`tel:${profileData.phone}`} className="text-xs text-zinc-700 hover:text-amber-700 font-mono transition-colors">
                        {profileData.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct contact form */}
            <div className="lg:col-span-7 bg-white border border-zinc-200/50 rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_15px_35px_rgba(0,0,0,0.015)]">
              <div className="text-left space-y-1.5">
                <h3 className="text-lg font-display font-medium text-zinc-950 tracking-tight">Initiate Transmission</h3>
                <p className="text-xs text-zinc-450 leading-relaxed font-sans font-light">
                  Submit a query log directly down below. Input fields highlight on interaction parameters.
                </p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Sender Name *</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-950 focus:outline-none focus:border-amber-600 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Mail Address *</label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-950 focus:outline-none focus:border-amber-600 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Subject Parameters</label>
                  <input
                    type="text"
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    placeholder="E.g. Full-Stack scope proposal"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-950 focus:outline-none focus:border-amber-600 focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Syllabus Details *</label>
                  <textarea
                    required
                    rows={4}
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="Provide details about your project timelines, stack preferences, or specific engineering requirements."
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-950 focus:outline-none focus:border-amber-600 focus:bg-white transition-all resize-none leading-relaxed"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3 rounded-full bg-zinc-950 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 group cursor-pointer active:scale-95"
                  >
                    <span>Send Query parameters</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Instant confirmation banner */}
                <AnimatePresence>
                  {formSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-800 flex items-start gap-2.5 text-left"
                    >
                      <Check className="w-5 h-5 shrink-0 text-emerald-600" />
                      <div>
                        <span className="font-extrabold block uppercase">MESSAGE TRANSMITTED SECURELY</span>
                        <span className="text-zinc-500 mt-1 block font-light leading-normal">Your submission parameters have been compiled and processed. Sanjaysahu-fullstack credentials will review the packet on mailbox intake.</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-zinc-250/50 py-12 relative z-10 bg-white">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div>
            <p className="font-display font-extrabold text-sm text-zinc-950 uppercase tracking-wider">Sanjay Sahu</p>
            <p className="text-[10px] font-mono text-zinc-400 mt-1 uppercase tracking-widest font-bold">MERN stack dev • government polytechnic, durg</p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
            <button onClick={() => {
              const el = document.getElementById("home");
              el?.scrollIntoView({ behavior: "smooth" });
            }} className="hover:text-amber-800 transition-colors cursor-pointer font-bold">Back to top</button>
            <span>•</span>
            <a href={`mailto:${profileData.email}`} className="hover:text-amber-800 transition-colors font-bold">sanjaysahu10067@gmail.com</a>
            <span>•</span>
            <a href={profileData.github} target="_blank" rel="noreferrer noopener" className="hover:text-amber-800 transition-colors flex items-center gap-1 font-bold">
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </footer>

      {/* DETAILED SPECS MODAL */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* FIXED FLOATING TOAST BAR (Image 1 Capsule Footer toast) */}
      <AnimatePresence>
        {showHiringBar && (
          <motion.div
            initial={{ y: 80, opacity: 0, x: "-50%" }}
            animate={{ y: 0, opacity: 1, x: "-50%" }}
            exit={{ y: 80, opacity: 0, x: "-50%" }}
            transition={{ delay: 1.5, type: "spring", stiffness: 220, damping: 25 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-zinc-950 text-white rounded-full py-2 px-2.5 sm:px-3 shadow-[0_24px_55px_rgba(0,0,0,0.18)] flex items-center gap-3 w-[90%] max-w-sm sm:max-w-md border border-white/10"
          >
            <div className="flex items-center gap-2 flex-1 min-w-0 pl-1.5">
              <div className="w-7 h-7 rounded-full overflow-hidden bg-zinc-800 shrink-0">
                <img
                  src={sanjayProfile}
                  referrerPolicy="no-referrer"
                  alt="Sanjay avatar"
                  className="w-full h-full object-cover filter grayscale contrast-125"
                />
              </div>
              <p className="text-[11px] sm:text-xs font-semibold tracking-tight text-zinc-200 truncate">
                Sanjay is available for hire
              </p>
            </div>
            
            <button
              onClick={() => {
                const el = document.getElementById("contact");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-3 py-1.5 sm:px-4 rounded-full bg-white text-zinc-950 hover:bg-zinc-100 font-extrabold text-[10px] sm:text-xs uppercase tracking-wider transition-all shrink-0 cursor-pointer"
            >
              Hire Sanjay
            </button>

            <button
              onClick={() => setShowHiringBar(false)}
              className="p-1 text-zinc-540 hover:text-white transition-colors shrink-0 cursor-pointer"
              title="Close Panel"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL CV PREVIEW SHEET */}
      <AnimatePresence>
        {resumePreviewOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setResumePreviewOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />

            {/* Document sheet */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative w-full max-w-4xl bg-white border border-zinc-200/80 rounded-3xl overflow-hidden z-10 shadow-2xl flex flex-col max-h-[90vh] text-left"
            >
              <div className="px-6 py-4 bg-zinc-50 border-b border-zinc-200/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4.5 h-4.5 text-zinc-800" />
                  <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-black">RESUME_GRID_SYSTEM</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="p-2 py-1.5 px-3 rounded-lg bg-white border border-zinc-250 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50 transition-all text-xs flex items-center gap-1.5 cursor-pointer font-bold uppercase tracking-wider"
                    title="Print Document"
                  >
                    <Printer className="w-4 h-4 text-zinc-550" />
                    <span className="hidden sm:inline font-mono">Print/Save</span>
                  </button>

                  <button
                    onClick={handleDirectDownload}
                    className="px-4 py-2 rounded-lg bg-zinc-950 text-white hover:bg-zinc-900 transition-all text-xs flex items-center gap-1.5 cursor-pointer font-bold uppercase tracking-wider"
                  >
                    <Check className="w-4 h-4" />
                    <span>Download TXT</span>
                  </button>

                  <button
                    onClick={() => setResumePreviewOpen(false)}
                    className="w-9 h-9 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-550 hover:text-zinc-950 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Styled printable paper */}
              <div className="p-8 sm:p-12 overflow-y-auto flex-1 bg-white text-zinc-900 font-sans">
                <div className="max-w-3xl mx-auto space-y-8 print:my-0">
                  
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b-2 border-zinc-950 pb-5 gap-3">
                    <div>
                      <h2 className="text-3xl font-display font-extrabold text-zinc-950 tracking-tight leading-none uppercase">
                        {profileData.name}
                      </h2>
                      <p className="text-sm font-semibold tracking-wide text-amber-700 uppercase font-mono mt-2">
                        {profileData.title}
                      </p>
                    </div>

                    <div className="text-left sm:text-right text-xs font-mono text-zinc-600 space-y-1">
                      <p>Balodabazar, Chhattisgarh, India</p>
                      <p>+91 8120067073</p>
                      <p>{profileData.email}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xs font-bold font-mono tracking-widest text-zinc-900 border-b border-zinc-200 pb-1 uppercase">
                      Career Objective
                    </h3>
                    <p className="text-xs text-zinc-600 leading-relaxed font-sans font-light">
                      {profileData.bio}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xs font-bold font-mono tracking-widest text-zinc-900 border-b border-zinc-200 pb-1 uppercase">
                      Technical Skills
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-zinc-650">
                      <div>
                        <p className="font-semibold text-zinc-950">Frontend:</p>
                        <p className="mt-0.5">HTML, CSS, JavaScript, Bootstrap, React.js, Tailwind CSS</p>
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-950">Backend &amp; Database:</p>
                        <p className="mt-0.5">Node.js, Express.js, MongoDB, RESTful API layers</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xs font-bold font-mono tracking-widest text-zinc-900 border-b border-zinc-200 pb-1 uppercase">
                      Experience &amp; Coursework
                    </h3>
                    
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-start font-semibold text-zinc-950">
                        <div>
                          <span>Web Development Certification</span>
                          <span className="font-normal text-zinc-500 block">AVISH EDUCOM</span>
                        </div>
                        <span className="font-mono text-[11px]">2025 - 2026</span>
                      </div>
                      <p className="text-zinc-600 font-light leading-relaxed">
                        End-to-end coursework on MERN technologies. Created interactive React modular layouts, high efficiency Node routes, and integrated complex schemas within MongoDB.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xs font-bold font-mono tracking-widest text-zinc-900 border-b border-zinc-200 pb-1 uppercase">
                      Key Portfolio Solutions
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-650">
                      {projectsData.map((project) => (
                        <div key={project.id} className="space-y-1">
                          <p className="font-semibold text-zinc-950">{project.title}</p>
                          <p className="font-light">{project.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xs font-bold font-mono tracking-widest text-zinc-900 border-b border-zinc-200 pb-1 uppercase">
                      Academics &amp; Education
                    </h3>
                    
                    <div className="space-y-3 text-xs text-zinc-650">
                      {educationData.map((edu) => (
                        <div key={edu.id} className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-zinc-950">{edu.degree}</p>
                            <p className="font-light">{edu.institution} • {edu.details}</p>
                          </div>
                          <span className="font-mono text-zinc-500 shrink-0 ml-4">{edu.period} ({edu.performance})</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
