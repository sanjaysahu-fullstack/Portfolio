import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Github, Check, Cpu, Database, Sparkles, Code2 } from "lucide-react";
import { Project } from "../types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "code">("overview");

  if (!project) return null;

  const getSimulatedCode = (id: string) => {
    if (id === "proj-job-portal") {
      return `// Express.js Controller Backend Logic - Job Marketplace
import express, { Request, Response } from 'express';
import { Job } from '../models/Job';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// @route   POST /api/jobs
// @desc    Post a new career listing (Recruiters only)
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { title, company, description, location, salaryRange, tags } = req.body;
    
    if (req.user.role !== 'Recruiter') {
      return res.status(403).json({ error: 'Access denied. Recruiters only.' });
    }

    const newJob = new Job({
      recruiter: req.user.id,
      title,
      company,
      description,
      location,
      salaryRange,
      tags,
      createdAt: new Date()
    });

    const job = await newJob.save();
    return res.status(201).json({ success: true, count: 1, data: job });
  } catch (error) {
    console.error('SERVER_ERROR [POST_JOB]:', error);
    return res.status(500).json({ status: 'Database transaction failed' });
  }
});

export default router;`;
    }
    return `// React Custom 3D Mouse Tracker Hooks
import { useState, useEffect } from 'react';

export function usePointerPerspective(elementRef: React.RefObject<HTMLElement>) {
  const [coords, setCoords] = useState({ x: 0.5, y: 0.5 });
  
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!elementRef.current) return;
      const rect = elementRef.current.getBoundingClientRect();
      
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      setCoords({ x: Math.min(1, Math.max(0, x)), y: Math.min(1, Math.max(0, y)) });
    };
    
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [elementRef]);

  return coords;
}`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop glass blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
        />

        {/* Modal Sheet */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="relative w-full max-w-3xl bg-white border border-zinc-200/80 rounded-3xl overflow-hidden z-10 shadow-[0_30px_70px_rgba(0,0,0,0.12)] flex flex-col max-h-[85vh] text-left"
        >
          {/* Accent Bronze Top Line */}
          <div className="h-1 bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700" />

          {/* Modal Header */}
          <div className="p-6 sm:p-8 border-b border-zinc-100 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wide bg-amber-50 text-amber-800 border border-amber-200/60 uppercase">
                  {project.category}
                </span>
                <span className="text-zinc-400 text-xs font-mono">• Production Build Verified</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-medium text-zinc-950 tracking-tight">{project.title}</h3>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-zinc-950 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content - Scrollable panel */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
            {/* Nav Tabs */}
            <div className="flex border-b border-zinc-100 gap-2 pb-0.5">
              <button
                onClick={() => setActiveTab("overview")}
                className={`py-2.5 px-4 text-xs font-bold tracking-tight border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "overview"
                    ? "border-amber-600 text-zinc-950"
                    : "border-transparent text-zinc-400 hover:text-zinc-700"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Feature Set &amp; Overview</span>
              </button>
              <button
                onClick={() => setActiveTab("code")}
                className={`py-2.5 px-4 text-xs font-bold tracking-tight border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "code"
                    ? "border-amber-600 text-zinc-950"
                    : "border-transparent text-zinc-400 hover:text-zinc-700"
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Component Architecture</span>
              </button>
            </div>

            {/* Tab content bodies */}
            {activeTab === "overview" ? (
              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest mb-2">Role &amp; Objective</h4>
                  <p className="text-sm font-sans text-zinc-600 leading-relaxed font-light">{project.longDescription}</p>
                </div>

                <div>
                  <h4 className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest mb-3">Key Full-Stack Features</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {project.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 rounded-2xl bg-zinc-50/60 border border-zinc-200/50"
                      >
                        <div className="w-5.5 h-5.5 rounded-full bg-emerald-50 border border-emerald-200/60 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                        <span className="text-xs font-sans text-zinc-700 leading-relaxed font-light">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest mb-2.5">Tech Matrix Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => {
                      const isDB = ["MongoDB", "Database", "Firestore"].includes(tag);
                      const isBackend = ["Express.js", "Node.js", "RESTful API", "REST API"].includes(tag);
                      return (
                        <div
                          key={idx}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium ${
                            isDB
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200/50"
                              : isBackend
                              ? "bg-orange-50 text-orange-850 border border-orange-200/50"
                              : "bg-amber-50 text-amber-850 border border-amber-200/50"
                          }`}
                        >
                          {isDB ? <Database className="w-3.5 h-3.5" /> : isBackend ? <Cpu className="w-3.5 h-3.5" /> : <Code2 className="w-3.5 h-3.5" />}
                          <span>{tag}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-250" />
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400">TypeScript Module • controller.ts</span>
                </div>
                <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-[#0d0d10] p-5 text-[11px] font-mono text-zinc-300 leading-relaxed max-h-[380px] scrollbar">
                  <pre>{getSimulatedCode(project.id)}</pre>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-6 border-t border-zinc-100 bg-zinc-50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-zinc-400 text-[11px] font-mono">
              Designed &amp; developed in full conformity to MERN architecture.
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-sm"
              >
                <Github className="w-4 h-4" />
                <span>Browse Repository</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
