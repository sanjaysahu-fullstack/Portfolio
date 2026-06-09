import { Project, Skill, Experience, Education } from "./types";

export const profileData = {
  name: "Sanjay Sahu",
  title: "Full Stack Developer",
  subtitle: "Specializing in MERN Stack & Interactive Web Interfaces",
  email: "sanjaysahu10067@gmail.com",
  phone: "+91 8120067073",
  location: "Balodabazar, Chhattisgarh, India",
  github: "https://github.com/sanjaysahu-fullstack",
  bio: "Passionate and detail-oriented Full Stack Developer with practical knowledge of MERN Stack technologies and web development fundamentals. I specialize in crafting elegant, highly responsive, and high-performance web applications that bridge intuitive user interfaces with robust, scale-to-zero backend architectures.",
};

export const skillsData: Skill[] = [
  // Frontend
  { name: "React.js", category: "Frontend", level: 90 },
  { name: "JavaScript (ES6+)", category: "Frontend", level: 88 },
  { name: "HTML5", category: "Frontend", level: 95 },
  { name: "CSS3 & Tailwind", category: "Frontend", level: 92 },
  { name: "Bootstrap", category: "Frontend", level: 85 },
  // Backend
  { name: "Node.js", category: "Backend", level: 86 },
  { name: "Express.js", category: "Backend", level: 88 },
  { name: "MongoDB", category: "Backend", level: 85 },
  { name: "RESTful APIs", category: "Backend", level: 90 },
  // Tools
  { name: "Git & GitHub", category: "Tools", level: 87 },
  { name: "VS Code", category: "Tools", level: 90 },
  { name: "Thunder Client", category: "Tools", level: 85 },
  // Other
  { name: "Responsive Web Design", category: "Other", level: 95 },
  { name: "UI/UX Fundamentals", category: "Other", level: 82 },
  { name: "Debugging", category: "Other", level: 88 },
];

export const experienceData: Experience[] = [
  {
    id: "exp1",
    course: "Web Development Certification Course",
    organization: "AVISH EDUCOM",
    duration: "June 2025 - May 2026",
    highlights: [
      "Learned and applied the MERN stack (MongoDB, Express.js, React, Node.js) for end-to-end web deployment.",
      "Developed high-performance full-stack web applications and RESTful APIs from scratch.",
      "Gained detailed hands-on experience in client-side state management, responsive designs, and database connections.",
      "Built beautiful, user-centric interfaces incorporating high usability standards and secure APIs.",
    ],
  },
];

export const projectsData: Project[] = [
  {
    id: "proj-job-portal",
    title: "MERN Stack Job Portal",
    description: "A fully responsive, feature-rich employment matching web application allowing streamlined workflow between recruiters and applicants.",
    longDescription: "A full-scale job marketplace created as a showcase of the power of the MERN stack. Designed with interactive layout dynamics, this application streamlines the employer-to-candidate loop through robust search metrics, responsive job posts, application records, and secure data states.",
    tags: ["MongoDB", "Express.js", "React.js", "Node.js", "RESTful API", "Tailwind CSS"],
    githubUrl: "https://github.com/sanjaysahu-fullstack",
    category: "MERN Stack",
    features: [
      "Dynamic User Authorization & role profiles (Recruiter/Candidate)",
      "Real-time search filters for jobs based on titles, tags, and location",
      "Interactive application submission and status tracking dashboard",
      "Full API-driven architecture utilizing Express.js routing",
    ],
  },
  {
    id: "proj-portfolio",
    title: "Professional Interactive Portfolio",
    description: "An editorial, high-fidelity portfolio featuring 3D transitions, particle constellations, dynamic perspective hover engines, and silky animations.",
    longDescription: "This personal developer portfolio features top-tier modern visual aesthetics including fluid animations, customizable view grids, client-safe form validations, and fully responsive touch-optimized architectures.",
    tags: ["React.js", "Tailwind CSS", "Framer Motion", "HTML5/CSS3", "JavaScript"],
    githubUrl: "https://github.com/sanjaysahu-fullstack",
    category: "Frontend",
    features: [
      "Seamless canvas particle node constellation simulation with 3D projection factors",
      "Custom mouse-coupled 3D tilt engine for responsive card transformations",
      "Fully responsive desktop-to-mobile visual symmetry with fluid padding",
      "Contact messaging state fully integrated with local persistence",
    ],
  },
];

export const educationData: Education[] = [
  {
    id: "edu1",
    degree: "Diploma in Computer Science Engineering",
    institution: "Government Polytechnic, Durg",
    period: "2023 - Pursuing",
    performance: "In Progress",
    details: "Focusing on fundamental computing principles, algorithm design, software development systems, and web architectures.",
  },
  {
    id: "edu2",
    degree: "Higher Secondary (12th Standard)",
    institution: "Gyan Vidya Higher Secondary School, Raseda",
    period: "Graduated 2023",
    performance: "77.8%",
    details: "Primary specialization in mathematics, physics, and computer science applications.",
  },
  {
    id: "edu3",
    degree: "High School (10th Standard)",
    institution: "Gyan Vidya Higher Secondary School, Raseda",
    period: "Graduated 2021",
    performance: "97.0%",
    details: "Acquired a comprehensive high-academic base in science and algebraic studies with remarkable scoring.",
  },
];
