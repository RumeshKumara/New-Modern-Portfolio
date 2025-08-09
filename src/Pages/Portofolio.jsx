import React, { useEffect, useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import AOS from "aos";
import "aos/dist/aos.css";
import {
  Code,
  Boxes,
  TrendingUp,
  Star,
  Globe,
  Database,
  Wrench,
  BookOpen,
  Trophy,
  Rocket,
  Monitor,
  Smartphone,
  Cloud,
  Shield,
  Package,
  Layers,
  ChevronRight,
  ExternalLink,
  X,
  BarChart3,
  CheckCircle,
  Clock,
  Lightbulb,
  ArrowUpRight,
} from "lucide-react";
// React Icons imports for tech stack
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTailwindcss,
  SiReact,
  SiVite,
  SiNodedotjs,
  SiBootstrap,
  SiFirebase,
  SiMui,
  SiVercel,
  SiTypescript,
  SiGit,
  SiGithub,
  // SiVisualstudio,
  SiNextdotjs,
  // SiJava,
  SiSpring,
  SiDocker,
  SiMysql,
  SiLinux,
} from "react-icons/si";
import { FaExclamationTriangle } from "react-icons/fa";

// SkeletonCard removed (unused)

// Statistics Counter Component
const StatCounter = ({ end, duration = 2000, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const endTime = startTime + duration;

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setCount(Math.floor(easeOutQuart * end));

      if (now < endTime) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(updateCount);
  }, [end, duration, isVisible]);

  return (
    <span ref={counterRef} className="tabular-nums">
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

// Enhanced Toggle Button with more animations
// ToggleButton removed (unused)

// Search and Filter Component
// SearchFilter removed (unused)

// Remove leftover incomplete JSX from deleted SearchFilter
// Removed leftover incomplete JSX from deleted SearchFilter

// Enhanced TabPanel with fade transitions
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
      className={`transition-all duration-500 ${
        value === index
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4"
      }`}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

// Skill Details Modal Component
const SkillDetailsModal = ({ skill, isOpen, onClose }) => {
  if (!isOpen || !skill) return null;

  const proficiencyDetails = {
    90: {
      level: "Expert",
      description:
        "Advanced mastery with deep understanding and ability to teach others",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
    },
    75: {
      level: "Advanced",
      description: "Strong proficiency with ability to handle complex projects",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
    },
    60: {
      level: "Intermediate",
      description:
        "Good understanding with room for growth in complex scenarios",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
    },
    default: {
      level: "Learning",
      description: "Currently learning and practicing fundamental concepts",
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
    },
  };

  const getDetails = (proficiency) => {
    if (proficiency >= 90) return proficiencyDetails[90];
    if (proficiency >= 75) return proficiencyDetails[75];
    if (proficiency >= 60) return proficiencyDetails[60];
    return proficiencyDetails.default;
  };

  const details = getDetails(skill.proficiency);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl transition-all duration-500 transform ${
          isOpen
            ? "scale-100 translate-y-0 opacity-100"
            : "scale-95 translate-y-4 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b bg-slate-900/95 backdrop-blur-xl border-white/10">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 p-2 transition-all duration-500 transform rounded-lg bg-white/10 animate-pulse">
              {React.createElement(skill.icon, {
                className:
                  "w-full h-full transition-transform duration-500 hover:scale-110",
                style: { color: getIconColor(skill.name) },
              })}
              <div className="absolute inset-0 transition-opacity duration-500 rounded-lg opacity-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 hover:opacity-100"></div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white transition-colors duration-300 hover:text-purple-300">
                {skill.name}
              </h2>
              <p className="text-slate-400">{skill.category}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 transition-all duration-300 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white hover:rotate-90 hover:scale-110 active:scale-95"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Proficiency Section */}
          <div
            className={`p-4 rounded-xl ${details.bgColor} border ${details.borderColor}`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white">
                Proficiency Level
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${details.color} ${details.bgColor} border ${details.borderColor}`}
              >
                {details.level}
              </span>
            </div>

            <div className="mb-3">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-slate-300">Progress</span>
                <span className="text-sm font-medium text-white">
                  {skill.proficiency}%
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full bg-gradient-to-r ${
                    skill.proficiency >= 90
                      ? "from-green-500 to-emerald-500"
                      : skill.proficiency >= 75
                      ? "from-blue-500 to-cyan-500"
                      : skill.proficiency >= 60
                      ? "from-purple-500 to-violet-500"
                      : "from-orange-500 to-yellow-500"
                  } transition-all duration-1000 ease-out`}
                  style={{ width: `${skill.proficiency}%` }}
                />
              </div>
            </div>

            <p className="text-sm text-slate-300">{details.description}</p>
          </div>

          {/* Experience & Projects */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border rounded-xl bg-white/5 border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-5 h-5 text-blue-400" />
                <h4 className="font-semibold text-white">Experience</h4>
              </div>
              <p className="text-sm text-slate-300">
                {skill.experience || "2+ years of hands-on experience"}
              </p>
            </div>

            <div className="p-4 border rounded-xl bg-white/5 border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <BarChart3 className="w-5 h-5 text-purple-400" />
                <h4 className="font-semibold text-white">Projects Used</h4>
              </div>
              <p className="text-sm text-slate-300">
                {skill.projectsCount || "5+"} projects completed
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div className="p-4 border rounded-xl bg-white/5 border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <h4 className="font-semibold text-white">Key Capabilities</h4>
            </div>
            <div className="grid gap-2 md:grid-cols-2">
              {(
                skill.capabilities || [
                  "Component Development",
                  "State Management",
                  "Performance Optimization",
                  "Best Practices Implementation",
                ]
              ).map((capability, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-slate-300"
                >
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                  {capability}
                </div>
              ))}
            </div>
          </div>

          {/* Learning Resources */}
          <div className="p-4 border rounded-xl bg-white/5 border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-5 h-5 text-yellow-400" />
              <h4 className="font-semibold text-white">Learning Journey</h4>
            </div>
            <p className="mb-3 text-sm text-slate-300">
              {skill.learningPath ||
                "Continuously expanding knowledge through practical projects and staying updated with latest features and best practices."}
            </p>
            {skill.resources && (
              <div className="flex flex-wrap gap-2">
                {skill.resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1 text-xs transition-colors border rounded-full text-slate-300 hover:text-white bg-white/5 border-white/10 hover:border-purple-500/30"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {resource.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Next Steps */}
          <div className="p-4 border rounded-xl bg-white/5 border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              <h4 className="font-semibold text-white">Growth Areas</h4>
            </div>
            <p className="text-sm text-slate-300">
              {skill.nextSteps ||
                "Focus on advanced features, performance optimization, and exploring ecosystem tools to reach expert level."}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-slate-900/50 border-white/10">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-400">
              Last updated: {skill.lastUpdated || "Recently"}
            </div>
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-all duration-300 border rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/30 hover:from-purple-500/20 hover:to-blue-500/20 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-purple-500/25"
            >
              Close Details
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modern Card-based SkillBar Component
const SkillBar = ({
  icon,
  name,
  proficiency,
  category,
  delay = 0,
  onClick,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const skillRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          setTimeout(() => {
            setAnimatedWidth(proficiency);
          }, delay);
        }
      },
      { threshold: 0.3 }
    );

    if (skillRef.current) {
      observer.observe(skillRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible, proficiency, delay]);

  const handleClick = () => {
    onClick({
      icon,
      name,
      proficiency,
      category,
      experience: skillRef.current?.dataset.experience,
      projectsCount: skillRef.current?.dataset.projectsCount,
      capabilities: skillRef.current?.dataset.capabilities?.split(","),
      learningPath: skillRef.current?.dataset.learningPath,
      nextSteps: skillRef.current?.dataset.nextSteps,
      resources: skillRef.current?.dataset.resources
        ? JSON.parse(skillRef.current.dataset.resources)
        : undefined,
      lastUpdated: skillRef.current?.dataset.lastUpdated,
    });
  };

  const getProficiencyLabel = (level) => {
    if (level >= 90) return "Expert";
    if (level >= 75) return "Advanced";
    if (level >= 60) return "Intermediate";
    return "Learning";
  };

  return (
    <div
      ref={skillRef}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative p-6 transition-all duration-500 transform border cursor-pointer group bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl rounded-2xl border-white/10 hover:border-white/20 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 active:scale-95"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 rounded-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 translate-x-16 -translate-y-16 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 -translate-x-12 translate-y-12 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20"></div>
      </div>

      {/* Header Section */}
      <div className="relative z-10 flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="relative w-16 h-16 p-3 transition-all duration-300 rounded-xl bg-gradient-to-br from-white/10 to-white/5 group-hover:from-white/20 group-hover:to-white/10">
              {React.createElement(icon, {
                className:
                  "w-full h-full transition-transform duration-300 group-hover:scale-110",
                style: { color: getIconColor(name) },
              })}
              {/* Floating badge */}
              <div
                className="absolute flex items-center justify-center w-6 h-6 text-xs font-bold text-white rounded-full shadow-lg -top-2 -right-2"
                style={{ backgroundColor: getIconColor(name) }}
              >
                {proficiency}
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-1 text-lg font-bold text-white transition-colors duration-300 group-hover:text-purple-300">
              {name}
            </h4>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 text-xs border rounded-full bg-white/10 text-slate-300 border-white/20">
                {category}
              </span>
              <span
                className="px-2 py-1 text-xs text-white border rounded-full"
                style={{
                  backgroundColor: `${getIconColor(name)}20`,
                  borderColor: `${getIconColor(name)}40`,
                  color: getIconColor(name),
                }}
              >
                {getProficiencyLabel(proficiency)}
              </span>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="text-right">
          <div
            className="mb-1 text-2xl font-bold"
            style={{ color: getIconColor(name) }}
          >
            {proficiency}%
          </div>
          <div className="text-xs text-slate-400">Proficiency</div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="relative z-10 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-300">Skill Level</span>
          <span className="text-sm text-slate-400">{proficiency}%</span>
        </div>

        {/* Enhanced Progress Bar */}
        <div className="relative h-3 overflow-hidden rounded-full bg-white/10">
          <div
            className="absolute top-0 left-0 h-full transition-all duration-1000 ease-out rounded-full"
            style={{
              width: `${animatedWidth}%`,
              backgroundColor: getIconColor(name),
              transition: "width 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>

          {/* Progress indicator dot */}
          <div
            className="absolute transition-all duration-1000 ease-out transform -translate-y-1/2 top-1/2"
            style={{ left: `${animatedWidth}%` }}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-lg -translate-x-1/2 ${
                isHovered ? "animate-pulse" : ""
              }`}
            ></div>
          </div>
        </div>
      </div>

      {/* Interactive Elements */}
      <div
        className={`relative z-10 transition-all duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Clock className="w-3 h-3" />
            <span>Click for details</span>
          </div>
          <div
            className="flex items-center gap-1 text-xs"
            style={{ color: getIconColor(name) }}
          >
            <ArrowUpRight className="w-3 h-3" />
            <span>View more</span>
          </div>
        </div>
      </div>

      {/* Hover Effects */}
      <div className="absolute inset-0 transition-all duration-300 opacity-0 pointer-events-none group-hover:opacity-100 rounded-2xl">
        <div
          className="absolute inset-0 opacity-5 rounded-2xl"
          style={{ backgroundColor: getIconColor(name) }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>
      </div>

      {/* Click Ripple Effect */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <div className="absolute inset-0 transition-transform duration-300 scale-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl group-active:scale-100 group-active:animate-ping"></div>
      </div>
    </div>
  );
};

// Modern Category Section with enhanced visuals
const CategorySection = ({ title, skills, icon: Icon, onSkillClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayedSkills = isExpanded ? skills : skills.slice(0, 6);

  return (
    <div className="mb-12" data-aos="fade-up">
      {/* Enhanced Header */}
      <div className="relative mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="p-3 transition-all duration-300 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm group-hover:from-purple-500/30 group-hover:to-blue-500/30">
              <Icon className="w-8 h-8 text-purple-400" />
            </div>
            <div className="absolute w-4 h-4 rounded-full -top-1 -right-1 bg-gradient-to-br from-purple-500 to-blue-500 animate-pulse"></div>
          </div>

          <div className="flex-1">
            <h3 className="mb-1 text-2xl font-bold text-white">{title}</h3>
            <p className="text-sm text-slate-400">
              {skills.length} technologies • Click to explore
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1 border rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/30">
              <span className="text-sm font-medium text-purple-300">
                {skills.length} skills
              </span>
            </div>

            {skills.length > 6 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-all duration-300 border rounded-lg bg-gradient-to-r from-white/5 to-white/10 border-white/10 hover:from-purple-500/10 hover:to-blue-500/10 hover:border-purple-500/30 hover:scale-105"
              >
                {isExpanded ? "Show Less" : "Show All"}
                <ChevronRight
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isExpanded ? "rotate-90" : ""
                  }`}
                />
              </button>
            )}
          </div>
        </div>

        {/* Decorative line */}
        <div className="relative h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent">
          <div className="absolute top-0 w-32 h-px transform -translate-x-1/2 left-1/2 bg-gradient-to-r from-purple-500 to-blue-500"></div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayedSkills.map((skill, index) => (
          <SkillBar
            key={skill.name}
            icon={skill.icon}
            name={skill.name}
            proficiency={skill.proficiency}
            category={skill.category}
            delay={index * 100}
            onClick={onSkillClick}
          />
        ))}
      </div>

      {/* Expansion indicator */}
      {skills.length > 6 && !isExpanded && (
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-slate-400">
            <span>+{skills.length - 6} more skills</span>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      )}
    </div>
  );
};

CategorySection.propTypes = {
  title: PropTypes.string.isRequired,
  skills: PropTypes.array.isRequired,
  icon: PropTypes.elementType.isRequired,
  onSkillClick: PropTypes.func.isRequired,
};

// Icon color mapping for tech stack icons
const getIconColor = (language) => {
  const colorMap = {
    HTML: "#E34F26",
    CSS: "#1572B6",
    JavaScript: "#F7DF1E",
    "Tailwind CSS": "#06B6D4",
    ReactJS: "#61DAFB",
    Vite: "#646CFF",
    "Node JS": "#339933",
    Bootstrap: "#7952B3",
    Firebase: "#FFCA28",
    "Material UI": "#007FFF",
    Vercel: "#000000",
    TypeScript: "#3178C6",
    Git: "#F05032",
    GitHub: "#181717",
    "VS Code": "#007ACC",
    "Next.js": "#000000",
    SweetAlert2: "#FA8142",
    Java: "#007396",
    "Spring Boot": "#6DB33F",
    "React Native": "#61DAFB",
    Docker: "#2496ED",
    MySQL: "#4479A1",
    Linux: "#FCC624",
  };
  return colorMap[language] || "#ffffff";
};

// Enhanced tech stacks with React Icons instead of SVG files
const techStacks = [
  {
    icon: SiHtml5,
    language: "HTML",
    category: "Frontend",
    proficiency: 95,
    experience: "3+ years",
    projectsCount: "15+",
    capabilities: [
      "Semantic HTML",
      "Accessibility",
      "SEO Optimization",
      "Modern HTML5 Features",
    ],
    learningPath:
      "Mastered through building responsive websites and web applications with focus on semantic structure and accessibility.",
    nextSteps: "Exploring Web Components and advanced HTML5 APIs",
    lastUpdated: "December 2024",
  },
  {
    icon: SiCss3,
    language: "CSS",
    category: "Frontend",
    proficiency: 90,
    experience: "3+ years",
    projectsCount: "15+",
    capabilities: [
      "Responsive Design",
      "Flexbox & Grid",
      "CSS Animations",
      "Preprocessors (Sass, Less)",
    ],
    learningPath:
      "Gained expertise through styling complex layouts and learning modern CSS techniques.",
    nextSteps: "Mastering CSS-in-JS and advanced animations",
    lastUpdated: "December 2024",
  },
  {
    icon: SiJavascript,
    language: "JavaScript",
    category: "Frontend",
    proficiency: 85,
    experience: "2+ years",
    projectsCount: "10+",
    capabilities: [
      "ES6+ Features",
      "Asynchronous Programming",
      "DOM Manipulation",
      "API Integration",
    ],
    learningPath:
      "Developed skills through building interactive web applications and learning modern JavaScript practices.",
    nextSteps: "Diving deeper into TypeScript and advanced JS patterns",
    lastUpdated: "December 2024",
  },
  {
    icon: SiTailwindcss,
    language: "Tailwind CSS",
    category: "Frontend",
    proficiency: 88,
    experience: "2+ years",
    projectsCount: "8+",
    capabilities: [
      "Utility-First Design",
      "Responsive Utilities",
      "Custom Themes",
      "Tailwind CSS Animation",
    ],
    learningPath:
      "Mastered through building modern, responsive interfaces with a focus on design consistency.",
    nextSteps: "Exploring Tailwind CSS JIT mode and advanced theming",
    lastUpdated: "December 2024",
  },
  {
    icon: SiReact,
    language: "ReactJS",
    category: "Frontend",
    proficiency: 82,
    experience: "2+ years",
    projectsCount: "8+",
    capabilities: [
      "Component Architecture",
      "Hooks & State Management",
      "Performance Optimization",
      "Testing",
    ],
    learningPath:
      "Developed expertise through building complex SPAs and learning modern React patterns.",
    nextSteps:
      "Mastering React Server Components and advanced optimization techniques",
    resources: [
      { name: "React Docs", url: "https://react.dev" },
      { name: "React Patterns", url: "https://reactpatterns.com" },
    ],
    lastUpdated: "December 2024",
  },
  {
    icon: SiReact,
    language: "React Native",
    category: "Frontend",
    proficiency: 75,
    experience: "1+ years",
    projectsCount: "3+",
    capabilities: [
      "Cross-Platform Mobile Development",
      "Native Module Integration",
      "Navigation",
      "Performance Optimization",
    ],
    learningPath:
      "Building mobile applications using React Native for iOS and Android platforms.",
    nextSteps: "Exploring Expo and advanced native integrations",
    resources: [
      { name: "React Native Docs", url: "https://reactnative.dev" },
      { name: "Expo Docs", url: "https://docs.expo.dev" },
    ],
    lastUpdated: "January 2025",
  },
  {
    icon: SiVite,
    language: "Vite",
    category: "Build Tool",
    proficiency: 75,
    categoryIcon: Rocket,
  },
  {
    icon: SiNodedotjs,
    language: "Node JS",
    category: "Backend",
    proficiency: 70,
    categoryIcon: Database,
  },
  // {
  //   icon: SiJava,
  //   language: "Java",
  //   category: "Backend",
  //   proficiency: 80,
  //   experience: "2+ years",
  //   projectsCount: "6+",
  //   capabilities: [
  //     "Object-Oriented Programming",
  //     "Spring Framework",
  //     "JPA/Hibernate",
  //     "RESTful APIs",
  //   ],
  //   learningPath:
  //     "Developed expertise through building enterprise applications and learning backend development patterns.",
  //   nextSteps:
  //     "Exploring microservices architecture and advanced Spring features",
  //   lastUpdated: "January 2025",
  // },
  {
    icon: SiSpring,
    language: "Spring Boot",
    category: "Backend",
    proficiency: 78,
    experience: "1+ years",
    projectsCount: "4+",
    capabilities: [
      "Auto Configuration",
      "Spring Security",
      "Data JPA",
      "Microservices",
    ],
    learningPath:
      "Building scalable backend applications with Spring Boot framework and learning enterprise patterns.",
    nextSteps: "Advanced Spring Cloud and containerization with Docker",
    lastUpdated: "January 2025",
  },
  {
    icon: SiFirebase,
    language: "Firebase",
    category: "Backend",
    proficiency: 78,
    categoryIcon: Cloud,
  },
  {
    icon: SiDocker,
    language: "Docker",
    category: "Backend",
    proficiency: 72,
    experience: "1+ years",
    projectsCount: "4+",
    capabilities: [
      "Containerization",
      "Docker Compose",
      "Multi-stage Builds",
      "Container Orchestration",
    ],
    learningPath:
      "Learning containerization for development and deployment environments to ensure consistency across different platforms.",
    nextSteps: "Exploring Kubernetes and advanced Docker networking",
    lastUpdated: "January 2025",
  },
  {
    icon: SiMysql,
    language: "MySQL",
    category: "Backend",
    proficiency: 75,
    experience: "2+ years",
    projectsCount: "5+",
    capabilities: [
      "Database Design",
      "Query Optimization",
      "Indexing",
      "Stored Procedures",
    ],
    learningPath:
      "Gained experience through building data-driven applications and learning relational database management.",
    nextSteps: "Advanced database administration and performance tuning",
    lastUpdated: "January 2025",
  },
  {
    icon: SiLinux,
    language: "Linux",
    category: "Backend",
    proficiency: 78,
    experience: "2+ years",
    projectsCount: "8+",
    capabilities: [
      "System Administration",
      "Command Line Interface",
      "Server Management",
      "Shell Scripting",
    ],
    learningPath:
      "Developed expertise through server management, deployment processes, and development environment setup on Linux systems.",
    nextSteps: "Advanced system administration and automation with Ansible",
    lastUpdated: "January 2025",
  },
  {
    icon: SiBootstrap,
    language: "Bootstrap",
    category: "Frontend",
    proficiency: 85,
    categoryIcon: Smartphone,
  },
  {
    icon: SiMui,
    language: "Material UI",
    category: "Frontend",
    proficiency: 80,
    categoryIcon: Layers,
  },
  {
    icon: SiVercel,
    language: "Vercel",
    category: "Deployment",
    proficiency: 85,
    categoryIcon: Globe,
  },
  {
    icon: FaExclamationTriangle,
    language: "SweetAlert2",
    category: "Library",
    proficiency: 90,
    categoryIcon: Shield,
  },
  {
    icon: SiTypescript,
    language: "TypeScript",
    category: "Frontend",
    proficiency: 75,
    experience: "1+ years",
    projectsCount: "5+",
    capabilities: [
      "Type Safety",
      "Interface Design",
      "Generic Programming",
      "Advanced Types",
      "Mobile Development",
    ],
    learningPath:
      "Learning TypeScript to enhance JavaScript development with type safety for web and mobile applications.",
    nextSteps: "Mastering advanced TypeScript features and decorators",
    lastUpdated: "January 2025",
  },
  {
    icon: SiGit,
    language: "Git",
    category: "Version Control",
    proficiency: 85,
    experience: "2+ years",
    projectsCount: "All projects",
    capabilities: [
      "Branch Management",
      "Merge Conflicts Resolution",
      "Remote Repositories",
      "Git Workflow",
    ],
    learningPath: "Version control essential for all development projects.",
    nextSteps: "Advanced Git workflows and CI/CD integration",
    lastUpdated: "December 2024",
  },
  {
    icon: SiGithub,
    language: "GitHub",
    category: "Platform",
    proficiency: 80,
    experience: "2+ years",
    projectsCount: "All projects",
    capabilities: [
      "Repository Management",
      "Pull Requests",
      "Issues & Projects",
      "GitHub Actions",
    ],
    learningPath: "Code hosting and collaboration platform for all projects.",
    nextSteps: "Advanced GitHub Actions and workflow automation",
    lastUpdated: "December 2024",
  },
  // {
  //   icon: SiVisualstudio,
  //   language: "VS Code",
  //   category: "Development Tool",
  //   proficiency: 90,
  //   experience: "3+ years",
  //   projectsCount: "All projects",
  //   capabilities: [
  //     "Extension Management",
  //     "Debugging",
  //     "IntelliSense",
  //     "Integrated Terminal",
  //   ],
  //   learningPath: "Primary development environment for all coding projects.",
  //   nextSteps: "Custom extension development and advanced configurations",
  //   lastUpdated: "December 2024",
  // },
  {
    icon: SiNextdotjs,
    language: "Next.js",
    category: "Frontend",
    proficiency: 70,
    experience: "1+ years",
    projectsCount: "3+",
    capabilities: [
      "Server-Side Rendering",
      "Static Site Generation",
      "API Routes",
      "App Router",
    ],
    learningPath:
      "Building full-stack React applications with enhanced performance.",
    nextSteps: "Advanced Next.js features and deployment optimization",
    lastUpdated: "December 2024",
  },
];

const dummyProjects = [
  {
    id: "dummy-1",
    title: "Modern Portfolio Website",
    description:
      "A visually stunning and fully responsive portfolio website built with React and Tailwind CSS. Features project showcase, animated transitions, and a contact form.",
    imageUrl:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    TechStack: ["React", "Tailwind CSS"],
    tags: ["Web", "Frontend", "Featured"],
    demoUrl: "https://your-demo-link.com",
    repoUrl: "https://github.com/yourusername/portfolio",
  },
  {
    id: "dummy-2",
    title: "Sample Project",
    description:
      "This is a sample project to demonstrate the portfolio layout. It includes basic features and a simple design.",
    imageUrl:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=600&q=80",
    TechStack: ["HTML", "CSS", "JavaScript"],
    tags: ["Web", "Basic"],
    demoUrl: "https://your-demo-link.com/sample-project",
    repoUrl: "https://github.com/yourusername/sample-project",
  },
  {
    id: "dummy-3",
    title: "UI/UX Dashboard Design",
    description:
      "An intuitive and visually appealing dashboard interface for data analytics. Features clean design principles, interactive charts, and a responsive layout for all device sizes.",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    TechStack: ["Figma", "Adobe XD", "UI/UX Design"],
    tags: ["UI/UX", "Featured", "Design"],
    demoUrl:
      "https://www.figma.com/file/example-dashboard-design/example-dashboard?type=design&node-id=0%3A1&mode=design&t=xYz123ABC-1",
  },
];

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  // Add a dummy project as the initial state
  const [projects, setProjects] = useState([
    {
      id: "mobile-app-1",
      title: "Fitness Tracker App",
      description:
        "A comprehensive mobile fitness application built with React Native that allows users to track workouts, set fitness goals, and monitor progress. Features include customizable workout plans, real-time statistics, and social sharing capabilities.",
      imageUrl:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80",
      TechStack: ["React Native", "Firebase", "Redux", "Expo"],
      tags: ["Mobile", "Featured"],
      demoUrl: "https://expo.dev/@yourname/fitness-tracker",
      repoUrl: "https://github.com/yourusername/fitness-tracker-app",
    },
    {
      id: "mobile-app-2",
      title: "Travel Companion App",
      description:
        "A mobile travel application that helps users plan trips, discover local attractions, and navigate unfamiliar locations. Features offline maps, itinerary planning, language translation, and weather forecasts for a seamless travel experience.",
      imageUrl:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
      TechStack: ["React Native", "Google Maps API", "Firebase", "Context API"],
      tags: ["Mobile", "UI/UX"],
      demoUrl: "https://play.google.com/store/apps/example",
      repoUrl: "https://github.com/yourusername/travel-companion-app",
    },
    {
      id: "dummy-1",
      title: "Modern Portfolio Website",
      description:
        "A visually stunning and fully responsive portfolio website built with React and Tailwind CSS. Features project showcase, animated transitions, and a contact form.",
      imageUrl:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
      TechStack: ["React", "Tailwind CSS"],
      tags: ["Web", "Frontend", "Featured"],
      demoUrl: "https://your-demo-link.com",
      repoUrl: "https://github.com/yourusername/portfolio",
    },
    {
      id: "dummy-2",
      title: "Sample Project",
      description:
        "This is a sample project to demonstrate the portfolio layout. It includes basic features and a simple design.",
      imageUrl:
        "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=600&q=80",
      TechStack: ["HTML", "CSS", "JavaScript"],
      tags: ["Web", "Basic"],
      demoUrl: "https://your-demo-link.com/sample-project",
      repoUrl: "https://github.com/yourusername/sample-project",
    },
    {
      id: "dummy-3",
      title: "UI/UX Dashboard Design",
      description:
        "An intuitive and visually appealing dashboard interface for data analytics. Features clean design principles, interactive charts, and a responsive layout for all device sizes.",
      imageUrl:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
      TechStack: ["Figma", "Adobe XD", "UI/UX Design"],
      tags: ["UI/UX", "Featured", "Design"],
      demoUrl:
        "https://www.figma.com/file/example-dashboard-design/example-dashboard?type=design&node-id=0%3A1&mode=design&t=xYz123ABC-1",
    },
  ]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null); // New state for tag filtering
  // Removed: loading, searchTerm, selectedFilter (unused after project section removal)
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNavFixed, setIsNavFixed] = useState(false);
  const navRef = useRef(null);
  const portfolioRef = useRef(null);
  const [navOriginalPosition, setNavOriginalPosition] = useState(0);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      setParallaxOffset(scrolled * 0.5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smart navigation positioning
  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current || !portfolioRef.current) return;

      const portfolioElement = portfolioRef.current;
      const contactElement = document.getElementById("Contact");
      const scrollTop = window.pageYOffset;
      const portfolioTop = portfolioElement.offsetTop;
      const portfolioBottom = portfolioTop + portfolioElement.offsetHeight;
      const navbarHeight = 80; // Approximate navbar height

      // Store original position when first calculated
      if (navOriginalPosition === 0) {
        const navTop =
          portfolioTop +
          (portfolioElement.querySelector(".statistics-section")
            ?.offsetHeight || 400);
        setNavOriginalPosition(navTop);
      } // Check if contact section is in viewport
      let isContactVisible = false;
      if (contactElement) {
        const contactRect = contactElement.getBoundingClientRect();

        // Contact section is considered visible if it's starting to enter the viewport
        // Made more sensitive - disappears when contact is 80% into viewport (earlier)
        isContactVisible = contactRect.top <= window.innerHeight * 0.8; // When contact is 80% into viewport
      }

      // Check if we're within the portfolio section
      const isInPortfolioSection =
        scrollTop >= portfolioTop &&
        scrollTop <= portfolioBottom - window.innerHeight;

      // Check if we've scrolled past the navigation's original position
      const hasScrolledPastNav =
        scrollTop + navbarHeight >= navOriginalPosition;

      // Set fixed state based on conditions
      // Hide the fixed nav when contact section becomes visible
      if (isInPortfolioSection && hasScrolledPastNav && !isContactVisible) {
        setIsNavFixed(true);
      } else {
        setIsNavFixed(false);
      }
    };

    // Set up the scroll listener
    window.addEventListener("scroll", handleScroll);

    // Calculate initial positions after component mounts
    setTimeout(handleScroll, 100);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [navOriginalPosition]);

  useEffect(() => {
    AOS.init({
      once: false,
      duration: 800,
      easing: "ease-out-cubic",
    });
  }, []);

  // No need to fetch anything - we're using dummy projects only
  const fetchData = useCallback(() => {
    // Store the dummy projects in localStorage for reference
    localStorage.setItem("projects", JSON.stringify(dummyProjects));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Handle tag selection
  const handleTagClick = (tag) => {
    setSelectedTag(tag === selectedTag ? null : tag);
  };

  // Filter projects based on tags
  const filteredProjects = selectedTag
    ? projects.filter(
        (project) => project.tags && project.tags.includes(selectedTag)
      )
    : projects;

  // Removed: toggleShowMore (unused after project section removal)

  // Removed: displayedProjects (unused after project section removal)

  // Get unique filters from projects
  // Removed: projectFilters (unused after project section removal)

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSkill(null);
  };

  return (
    <div
      ref={portfolioRef}
      className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden relative"
      id="Portofolio"
    >
      {/* Animated background elements */}
      <div
        className="absolute inset-0 opacity-20"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
        <div className="absolute w-2 h-2 bg-purple-500 rounded-full top-20 left-10 animate-pulse"></div>
        <div className="absolute w-1 h-1 bg-blue-500 rounded-full top-40 right-20 animate-ping"></div>
        <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"></div>
      </div>

      {/* Enhanced Header with Statistics */}
      <div className="relative pb-10 text-center statistics-section">
        <div data-aos="fade-up" data-aos-duration="1000">
          <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7] mb-4">
            Portfolio Showcase
          </h2>
          <p className="max-w-2xl mx-auto mt-2 mb-8 text-sm text-slate-400 md:text-base">
            Explore my journey through projects, certifications, and technical
            expertise. Each section represents a milestone in my continuous
            learning path.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid max-w-4xl grid-cols-2 gap-4 mx-auto mb-8 md:grid-cols-3">
          {[
            {
              icon: Code,
              label: "Projects",
              value: projects.length,
              bgIcon: Rocket,
              color: "blue",
            },
            {
              icon: Boxes,
              label: "Technologies",
              value: techStacks.length,
              bgIcon: Package,
              color: "green",
            },
            {
              icon: TrendingUp,
              label: "Experience",
              value: 2,
              suffix: "+",
              bgIcon: Star,
              color: "orange",
            },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="relative p-6 overflow-hidden transition-all duration-500 transform border cursor-pointer group bg-white/5 backdrop-blur-sm rounded-xl border-white/10 hover:bg-white/10 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 transition-opacity duration-500 opacity-5 group-hover:opacity-10">
                <stat.bgIcon className="w-16 h-16 text-white" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className="w-6 h-6 text-purple-400 transition-colors duration-300 group-hover:text-purple-300" />
                  <div className="flex space-x-1">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 h-1 rounded-full bg-${stat.color}-400 opacity-50 group-hover:opacity-100 transition-all duration-300`}
                        style={{ animationDelay: `${i * 0.2}s` }}
                      ></div>
                    ))}
                  </div>
                </div>

                <div className="mb-1 text-2xl font-bold text-white transition-colors duration-300 group-hover:text-purple-100">
                  <StatCounter end={stat.value} suffix={stat.suffix || ""} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm transition-colors duration-300 text-slate-400 group-hover:text-slate-300">
                    {stat.label}
                  </div>
                  <ChevronRight className="w-4 h-4 transition-all duration-300 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1" />
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 transition-all duration-500 bg-gradient-to-br from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/5 group-hover:to-blue-500/5 rounded-xl"></div>
            </div>
          ))}
        </div>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* Smart Fixed Tab Navigation */}
        <div className="relative py-4 mb-12">
          {/* Fixed Tab Container */}
          <div
            ref={navRef}
            className={`transition-all duration-500 ease-in-out ${
              isNavFixed
                ? "fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-auto"
                : "relative w-full"
            }`}
            data-aos="fade-up"
            data-aos-delay="300"
          >
            {/* Central Navigation Hub */}
            <div className="flex justify-center">
              <div className="relative">
                {/* Main Navigation Container */}
                <div
                  className={`relative px-2 py-2 border shadow-2xl bg-gradient-to-r from-slate-900/95 to-slate-800/95 border-slate-600/40 rounded-3xl backdrop-blur-2xl transition-all duration-500 ${
                    isNavFixed
                      ? "scale-95 shadow-3xl bg-gradient-to-r from-slate-900/98 to-slate-800/98"
                      : ""
                  }`}
                >
                  {/* Morphing Background Slider */}
                  <div
                    className={`absolute top-2 bottom-2 w-1/2 transition-all duration-700 ease-out transform rounded-2xl ${
                      value === 0
                        ? "left-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 shadow-lg shadow-purple-500/30"
                        : "left-1/2 ml-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 shadow-lg shadow-blue-500/30"
                    }`}
                  >
                    {/* Animated Border */}
                    <div
                      className={`absolute inset-0 rounded-2xl border-2 ${
                        value === 0
                          ? "border-purple-400/40"
                          : "border-blue-400/40"
                      } opacity-60`}
                    ></div>

                    {/* Glowing Orb */}
                    {/* <div
                    className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full ${
                      value === 0
                        ? "bg-gradient-to-r from-purple-400 to-indigo-400 shadow-lg shadow-purple-400/50"
                        : "bg-gradient-to-r from-blue-400 to-cyan-400 shadow-lg shadow-blue-400/50"
                    } animate-pulse`}
                  ></div> */}
                  </div>

                  {/* Navigation Options */}
                  <div className="relative z-10 flex">
                    {/* Projects Tab */}
                    <button
                      onClick={() => handleChange(null, 0)}
                      className={`relative flex items-center gap-4 px-8 py-6 transition-all duration-500 group ${
                        value === 0
                          ? "text-white"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {/* Icon Container */}
                      <div className="relative">
                        <div
                          className={`p-3 rounded-xl transition-all duration-500 ${
                            value === 0
                              ? "bg-white/10 backdrop-blur-sm"
                              : "bg-transparent group-hover:bg-white/5"
                          }`}
                        >
                          <Code
                            className={`w-6 h-6 transition-all duration-500 ${
                              value === 0
                                ? "text-purple-300 scale-110"
                                : "text-slate-400 group-hover:text-purple-300 group-hover:scale-110"
                            }`}
                          />
                        </div>

                        {/* Active Indicator */}
                        {value === 0 && (
                          <div className="absolute flex items-center justify-center w-6 h-6 rounded-full -top-1 -right-1 bg-gradient-to-r from-purple-500 to-indigo-500">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          </div>
                        )}

                        {/* Hover Glow */}
                        {/* {value !== 0 && (
                        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-indigo-500/20 group-hover:opacity-100 blur-lg"></div>
                      )} */}
                      </div>

                      {/* Text Content */}
                      <div className="flex flex-col items-start">
                        <span
                          className={`text-lg font-bold transition-colors duration-300 ${
                            value === 0
                              ? "text-white"
                              : "text-slate-300 group-hover:text-white"
                          }`}
                        >
                          Projects
                        </span>
                        <span
                          className={`text-sm transition-colors duration-300 ${
                            value === 0
                              ? "text-purple-300"
                              : "text-slate-500 group-hover:text-purple-300"
                          }`}
                        >
                          {projects.length} works
                        </span>
                      </div>

                      {/* Status Indicator */}
                      <div className="absolute top-2 right-2">
                        <div
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            value === 0
                              ? "bg-purple-400 animate-pulse scale-125"
                              : "bg-slate-600 group-hover:bg-purple-400"
                          }`}
                        ></div>
                      </div>
                    </button>

                    {/* Tech Stack Tab */}
                    <button
                      onClick={() => handleChange(null, 1)}
                      className={`relative flex items-center gap-4 px-8 py-6 transition-all duration-500 group ${
                        value === 1
                          ? "text-white"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {/* Icon Container */}
                      <div className="relative">
                        <div
                          className={`p-3 rounded-xl transition-all duration-500 ${
                            value === 1
                              ? "bg-white/10 backdrop-blur-sm"
                              : "bg-transparent group-hover:bg-white/5"
                          }`}
                        >
                          <Boxes
                            className={`w-6 h-6 transition-all duration-500 ${
                              value === 1
                                ? "text-blue-300 scale-110"
                                : "text-slate-400 group-hover:text-blue-300 group-hover:scale-110"
                            }`}
                          />
                        </div>

                        {/* Active Indicator */}
                        {value === 1 && (
                          <div className="absolute flex items-center justify-center w-6 h-6 rounded-full -top-1 -right-1 bg-gradient-to-r from-blue-500 to-cyan-500">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          </div>
                        )}

                        {/* Hover Glow */}
                        {value !== 1 && (
                          <div className="absolute inset-0 transition-opacity duration-300 opacity-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 group-hover:opacity-100 blur-lg"></div>
                        )}
                      </div>

                      {/* Text Content */}
                      <div className="flex flex-col items-start">
                        <span
                          className={`text-lg font-bold transition-colors duration-300 ${
                            value === 1
                              ? "text-white"
                              : "text-slate-300 group-hover:text-white"
                          }`}
                        >
                          Tech Stack
                        </span>
                        <span
                          className={`text-sm transition-colors duration-300 ${
                            value === 1
                              ? "text-blue-300"
                              : "text-slate-500 group-hover:text-blue-300"
                          }`}
                        >
                          {techStacks.length} skills
                        </span>
                      </div>

                      {/* Status Indicator */}
                      <div className="absolute top-2 right-2">
                        <div
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            value === 1
                              ? "bg-blue-400 animate-pulse scale-125"
                              : "bg-slate-600 group-hover:bg-blue-400"
                          }`}
                        ></div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Floating Ambient Effects */}
                <div className="absolute inset-0 -z-10">
                  {/* Outer Glow */}
                  <div
                    className={`absolute inset-0 transition-all duration-700 blur-3xl opacity-20 ${
                      value === 0
                        ? "bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500"
                        : "bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500"
                    }`}
                  ></div>

                  {/* Rotating Elements */}
                  <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                    <div
                      className={`w-32 h-32 transition-all duration-1000 ${
                        value === 0 ? "rotate-0" : "rotate-180"
                      }`}
                    >
                      <div
                        className={`absolute top-0 left-0 w-3 h-3 rounded-full ${
                          value === 0 ? "bg-purple-400" : "bg-blue-400"
                        } animate-ping`}
                      ></div>
                      <div
                        className={`absolute top-0 right-0 w-2 h-2 rounded-full ${
                          value === 0 ? "bg-indigo-400" : "bg-cyan-400"
                        } animate-pulse`}
                      ></div>
                      <div
                        className={`absolute bottom-0 left-0 w-2 h-2 rounded-full ${
                          value === 0 ? "bg-purple-300" : "bg-blue-300"
                        } animate-bounce`}
                      ></div>
                      <div
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                          value === 0 ? "bg-indigo-300" : "bg-cyan-300"
                        } animate-pulse`}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Active Section Description - Always stays in place */}
          <div
            className={`text-center mt-8 transition-all duration-500 ${
              isNavFixed ? "opacity-75" : "opacity-100"
            }`}
          >
            <div
              className={`inline-flex items-center gap-3 px-6 py-3 mb-4 border shadow-xl rounded-2xl backdrop-blur-xl transition-all duration-500 ${
                value === 0
                  ? "bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border-purple-500/30 text-purple-200"
                  : "bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-blue-500/30 text-blue-200"
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full animate-spin ${
                  value === 0
                    ? "bg-gradient-to-r from-purple-400 to-indigo-400"
                    : "bg-gradient-to-r from-blue-400 to-cyan-400"
                }`}
              ></div>
              <span className="text-lg font-semibold">
                {value === 0
                  ? "Exploring Creative Projects"
                  : "Discovering Technical Skills"}
              </span>
              <div
                className={`w-3 h-3 rounded-full animate-pulse ${
                  value === 0
                    ? "bg-gradient-to-r from-indigo-400 to-purple-400"
                    : "bg-gradient-to-r from-cyan-400 to-blue-400"
                }`}
              ></div>
            </div>
            <p className="max-w-md mx-auto leading-relaxed text-slate-400">
              {value === 0
                ? "Dive into my portfolio of creative applications and digital experiences"
                : "Explore my technical expertise and the tools that power my development"}
            </p>
          </div>
        </div>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={setValue}
          style={{ minHeight: "400px" }}
        >
          {/* Projects Tab */}
          <TabPanel value={value} index={0} dir={theme.direction}>
            {/* Project Section: Display projects as cards */}
            <div className="container pb-8 mx-auto">
              <div className="mb-10 text-center">
                <h3 className="mb-4 text-3xl font-bold text-white">
                  My{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                    Projects
                  </span>
                </h3>
                <p className="max-w-2xl mx-auto mb-6 text-slate-400">
                  A showcase of my creative work, technical expertise, and
                  learning journey through real-world projects.
                </p>

                {/* Project Tags Filter */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                  <button
                    onClick={() => handleTagClick(null)}
                    className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                      !selectedTag
                        ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                        : "bg-white/10 text-slate-300 hover:bg-white/20"
                    }`}
                  >
                    All Projects
                  </button>

                  <button
                    onClick={() => handleTagClick("UI/UX")}
                    className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                      selectedTag === "UI/UX"
                        ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white"
                        : "bg-white/10 text-slate-300 hover:bg-white/20"
                    }`}
                  >
                    UI/UX
                  </button>

                  <button
                    onClick={() => handleTagClick("Web")}
                    className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                      selectedTag === "Web"
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                        : "bg-white/10 text-slate-300 hover:bg-white/20"
                    }`}
                  >
                    Web
                  </button>

                  <button
                    onClick={() => handleTagClick("Featured")}
                    className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                      selectedTag === "Featured"
                        ? "bg-gradient-to-r from-green-500 to-teal-500 text-white"
                        : "bg-white/10 text-slate-300 hover:bg-white/20"
                    }`}
                  >
                    Featured
                  </button>

                  <button
                    onClick={() => handleTagClick("Design")}
                    className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                      selectedTag === "Design"
                        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                        : "bg-white/10 text-slate-300 hover:bg-white/20"
                    }`}
                  >
                    Design
                  </button>

                  <button
                    onClick={() => handleTagClick("Mobile")}
                    className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                      selectedTag === "Mobile"
                        ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white"
                        : "bg-white/10 text-slate-300 hover:bg-white/20"
                    }`}
                  >
                    Mobile App
                  </button>
                </div>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.length === 0 ? (
                  <div className="py-12 text-center col-span-full text-slate-400">
                    No projects found. Try a different tag filter.
                  </div>
                ) : (
                  filteredProjects.map((project, idx) => (
                    <div
                      key={project.id || idx}
                      className={`relative flex flex-col p-6 transition-all duration-500 border shadow-xl bg-white/5 rounded-2xl hover:scale-105 group card-hover-effect ${
                        project.tags && project.tags.includes("Mobile")
                          ? "border-orange-500/30 hover:shadow-orange-500/20"
                          : "border-white/10 hover:shadow-purple-500/20"
                      }`}
                      data-aos="fade-up"
                      data-aos-delay={idx * 100}
                    >
                      {/* Project Image */}
                      {project.imageUrl && (
                        <div className="relative mb-4 overflow-hidden rounded-xl aspect-video bg-slate-800">
                          <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                          />
                          {project.tags && project.tags.includes("Mobile") && (
                            <div className="absolute top-2 right-2 p-1.5 rounded-full bg-gradient-to-r from-orange-500/70 to-amber-500/70 backdrop-blur-sm">
                              <Smartphone className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Project Title */}
                      <h4
                        className="mb-2 text-xl font-bold text-white truncate"
                        title={project.title}
                      >
                        {project.title}
                      </h4>

                      {/* Project Description */}
                      <p className="mb-4 text-slate-400 line-clamp-3 min-h-[60px]">
                        {project.description}
                      </p>

                      {/* Project Tags */}
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.tags.map((tag, i) => {
                            // Define color schemes for different tags
                            let tagColorClass = "";
                            switch (tag) {
                              case "UI/UX":
                                tagColorClass =
                                  "from-pink-500/30 to-orange-500/30 border-pink-500/30 text-pink-200";
                                break;
                              case "Featured":
                                tagColorClass =
                                  "from-green-500/30 to-teal-500/30 border-green-500/30 text-green-200";
                                break;
                              case "Design":
                                tagColorClass =
                                  "from-indigo-500/30 to-purple-500/30 border-indigo-500/30 text-indigo-200";
                                break;
                              case "Mobile":
                                tagColorClass =
                                  "from-orange-500/30 to-amber-500/30 border-orange-500/30 text-orange-200";
                                break;
                              case "Web":
                              default:
                                tagColorClass =
                                  "from-blue-500/30 to-cyan-500/30 border-blue-500/30 text-blue-200";
                                break;
                            }

                            return (
                              <span
                                key={tag + i}
                                onClick={() => handleTagClick(tag)}
                                className={`px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r border cursor-pointer hover:opacity-80 ${tagColorClass}`}
                              >
                                {tag === "UI/UX" ? "UI/UX" : tag}
                              </span>
                            );
                          })}
                        </div>
                      )}

                      {/* Tech Stack */}
                      {project.TechStack && project.TechStack.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.TechStack.map((tech, i) => (
                            <span
                              key={tech + i}
                              className="px-2 py-1 text-xs font-medium text-purple-200 border rounded bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Project Links */}
                      <div className="flex items-center gap-4 mt-auto">
                        {project.tags && project.tags.includes("UI/UX") ? (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-4 py-1.5 text-sm font-medium text-pink-300 transition-colors duration-300 rounded-lg bg-gradient-to-r from-pink-500/10 to-orange-500/10 border border-pink-500/20 hover:from-pink-500/20 hover:to-orange-500/20 hover:text-white"
                          >
                            Design View
                            <svg
                              className="w-4 h-4 ml-1"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </a>
                        ) : project.tags && project.tags.includes("Mobile") ? (
                          <>
                            {project.demoUrl && (
                              <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-4 py-1.5 text-sm font-medium text-orange-300 transition-colors duration-300 rounded-lg bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 hover:from-orange-500/20 hover:to-amber-500/20 hover:text-white"
                              >
                                App Demo
                                <Smartphone className="w-4 h-4 ml-1" />
                              </a>
                            )}
                            {project.repoUrl && (
                              <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium text-orange-300 transition-colors duration-300 rounded hover:text-white hover:bg-orange-500/20"
                              >
                                Source Code
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16 18l6-6-6-6M8 6l-6 6 6 6"
                                  />
                                </svg>
                              </a>
                            )}
                          </>
                        ) : (
                          <>
                            {project.demoUrl && (
                              <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium text-blue-300 transition-colors duration-300 rounded hover:text-white hover:bg-blue-500/20"
                              >
                                Live Demo
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14 3h7m0 0v7m0-7L10 14m-7 7h7a2 2 0 002-2v-7"
                                  />
                                </svg>
                              </a>
                            )}
                            {project.repoUrl && (
                              <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium text-purple-300 transition-colors duration-300 rounded hover:text-white hover:bg-purple-500/20"
                              >
                                Source Code
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16 18l6-6-6-6M8 6l-6 6 6 6"
                                  />
                                </svg>
                              </a>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </TabPanel>

          {/* Tech Stack Tab */}
          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container pb-8 mx-auto overflow-hidden">
              {/* Enhanced Header Section */}
              <div className="mb-10 text-center">
                <h3 className="mb-4 text-3xl font-bold text-white">
                  Technical{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                    Arsenal
                  </span>
                </h3>
                <p className="max-w-2xl mx-auto mb-8 text-slate-400">
                  A comprehensive overview of my technical skills and expertise
                  across different domains
                </p>

                {/* Skills Overview Cards */}
                <div className="grid grid-cols-2 gap-4 mb-8 md:grid-cols-4">
                  {[
                    {
                      label: "Frontend",
                      count: techStacks.filter((t) => t.category === "Frontend")
                        .length,
                      icon: Monitor,
                      gradient: "from-blue-500 to-cyan-500",
                      bgPattern: "bg-blue-500/10",
                      borderColor: "border-blue-500/30",
                    },
                    {
                      label: "Backend",
                      count: techStacks.filter((t) => t.category === "Backend")
                        .length,
                      icon: Database,
                      gradient: "from-green-500 to-emerald-500",
                      bgPattern: "bg-green-500/10",
                      borderColor: "border-green-500/30",
                    },
                    {
                      label: "Tools & Platforms",
                      count: techStacks.filter((t) =>
                        [
                          "Build Tool",
                          "Deployment",
                          "Library",
                          "Version Control",
                          "Development Tool",
                          "Platform",
                        ].includes(t.category)
                      ).length,
                      icon: Wrench,
                      gradient: "from-orange-500 to-red-500",
                      bgPattern: "bg-orange-500/10",
                      borderColor: "border-orange-500/30",
                    },
                    {
                      label: "All Categories",
                      count: techStacks.length,
                      icon: Cloud,
                      gradient: "from-purple-500 to-pink-500",
                      bgPattern: "bg-purple-500/10",
                      borderColor: "border-purple-500/30",
                    },
                  ].map((stat, index) => (
                    <div
                      key={stat.label}
                      className={`relative p-6 overflow-hidden transition-all duration-500 transform border cursor-pointer group ${stat.bgPattern} backdrop-blur-sm rounded-2xl ${stat.borderColor} hover:scale-105 hover:shadow-xl`}
                      data-aos="zoom-in"
                      data-aos-delay={index * 100}
                    >
                      {/* Background decoration */}
                      <div className="absolute top-0 right-0 w-20 h-20 transition-all duration-500 opacity-10 group-hover:opacity-20 group-hover:scale-110">
                        <stat.icon className="w-full h-full" />
                      </div>

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} bg-opacity-20`}
                          >
                            <stat.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex items-center gap-1">
                            <div
                              className={`w-2 h-2 rounded-full bg-gradient-to-r ${stat.gradient} animate-pulse`}
                            ></div>
                            <div
                              className={`w-1 h-1 rounded-full bg-gradient-to-r ${stat.gradient} animate-pulse`}
                              style={{ animationDelay: "0.5s" }}
                            ></div>
                          </div>
                        </div>

                        <div className="text-center">
                          <div className="mb-2 text-3xl font-bold text-white transition-colors duration-300 group-hover:text-purple-100">
                            <StatCounter end={stat.count} />
                          </div>
                          <div className="text-sm transition-colors duration-300 text-slate-400 group-hover:text-slate-300">
                            {stat.label}
                          </div>
                        </div>
                      </div>

                      {/* Hover glow effect */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-5 transition-all duration-500 rounded-2xl`}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Skills Sections */}
              <div className="space-y-12">
                <CategorySection
                  title="Frontend Development"
                  icon={Monitor}
                  skills={techStacks
                    .filter((tech) => tech.category === "Frontend")
                    .map((tech) => ({
                      name: tech.language,
                      icon: tech.icon,
                      proficiency: tech.proficiency,
                      category: tech.category,
                      experience: tech.experience,
                      projectsCount: tech.projectsCount,
                      capabilities: tech.capabilities,
                      learningPath: tech.learningPath,
                      nextSteps: tech.nextSteps,
                      resources: tech.resources,
                      lastUpdated: tech.lastUpdated,
                    }))}
                  onSkillClick={handleSkillClick}
                />

                <CategorySection
                  title="Backend & Infrastructure"
                  icon={Database}
                  skills={techStacks
                    .filter((tech) => tech.category === "Backend")
                    .map((tech) => ({
                      name: tech.language,
                      icon: tech.icon,
                      proficiency: tech.proficiency,
                      category: tech.category,
                      experience: tech.experience,
                      projectsCount: tech.projectsCount,
                      capabilities: tech.capabilities,
                      learningPath: tech.learningPath,
                      nextSteps: tech.nextSteps,
                      resources: tech.resources,
                      lastUpdated: tech.lastUpdated,
                    }))}
                  onSkillClick={handleSkillClick}
                />

                <CategorySection
                  title="Development Tools & Platforms"
                  icon={Wrench}
                  skills={techStacks
                    .filter((tech) =>
                      ["Build Tool", "Deployment", "Library"].includes(
                        tech.category
                      )
                    )
                    .map((tech) => ({
                      name: tech.language,
                      icon: tech.icon,
                      proficiency: tech.proficiency,
                      category: tech.category,
                      experience: tech.experience,
                      projectsCount: tech.projectsCount,
                      capabilities: tech.capabilities,
                      learningPath: tech.learningPath,
                      nextSteps: tech.nextSteps,
                      resources: tech.resources,
                      lastUpdated: tech.lastUpdated,
                    }))}
                  onSkillClick={handleSkillClick}
                />

                <CategorySection
                  title="Development Environment & Version Control"
                  icon={Package}
                  skills={techStacks
                    .filter((tech) =>
                      [
                        "Version Control",
                        "Development Tool",
                        "Platform",
                      ].includes(tech.category)
                    )
                    .map((tech) => ({
                      name: tech.language,
                      icon: tech.icon,
                      proficiency: tech.proficiency,
                      category: tech.category,
                      experience: tech.experience,
                      projectsCount: tech.projectsCount,
                      capabilities: tech.capabilities,
                      learningPath: tech.learningPath,
                      nextSteps: tech.nextSteps,
                      resources: tech.resources,
                      lastUpdated: tech.lastUpdated,
                    }))}
                  onSkillClick={handleSkillClick}
                />
              </div>

              {/* Skills Summary */}
              <div className="p-6 mt-12 border rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-sm border-white/10">
                <div className="text-center">
                  <h4 className="mb-2 text-xl font-bold text-white">
                    Continuous Learning Journey
                  </h4>
                  <p className="mb-4 text-slate-400">
                    Always exploring new technologies and expanding my skill set
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <BookOpen className="w-4 h-4 text-blue-400" />
                      <span>Learning</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-slate-400"></div>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Rocket className="w-4 h-4 text-purple-400" />
                      <span>Building</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-slate-400"></div>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Trophy className="w-4 h-4 text-green-400" />
                      <span>Mastering</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
        </SwipeableViews>

        {/* Skill Details Modal */}
        <SkillDetailsModal
          skill={selectedSkill}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </Box>

      {/* Add CSS animations */}
      <style>
        {`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }

        @keyframes modalSlideIn {
          0% {
            transform: scale(0.9) translateY(20px);
            opacity: 0;
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        @keyframes modalSlideOut {
          0% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
          100% {
            transform: scale(0.9) translateY(20px);
            opacity: 0;
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .animate-ripple {
          animation: ripple 0.6s ease-out;
        }

        .animate-modal-in {
          animation: modalSlideIn 0.3s ease-out;
        }

        .animate-modal-out {
          animation: modalSlideOut 0.3s ease-in;
        }

        /* Enhanced skill card animations */
        .skill-card-hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 20px 40px -12px rgba(139, 92, 246, 0.3);
        }

        .skill-progress-glow {
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
        }

        /* Floating animations */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        /* Pulse glow effect */
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 5px rgba(139, 92, 246, 0.3);
          }
          50% { 
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.6);
          }
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        /* Enhanced Tab Navigation Animations */
        @keyframes cardPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.02);
            opacity: 1;
          }
        }

        @keyframes cardGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.1);
          }
          50% {
            box-shadow: 0 0 40px rgba(139, 92, 246, 0.3);
          }
        }

        @keyframes cardSlideIn {
          0% {
            transform: translateY(20px) scale(0.95);
            opacity: 0;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        /* Fixed Tab Animations */
        @keyframes fixedTabSlideIn {
          0% {
            transform: translateX(-50%) translateY(-20px) scale(0.9);
            opacity: 0;
          }
          100% {
            transform: translateX(-50%) translateY(0) scale(0.95);
            opacity: 1;
          }
        }

        @keyframes fixedTabSlideOut {
          0% {
            transform: translateX(-50%) translateY(0) scale(0.95);
            opacity: 1;
          }
          100% {
            transform: translateX(-50%) translateY(-20px) scale(0.9);
            opacity: 0;
          }
        }

        .fixed-tab-enter {
          animation: fixedTabSlideIn 0.5s ease-out forwards;
        }

        .fixed-tab-exit {
          animation: fixedTabSlideOut 0.3s ease-in forwards;
        }

        /* Enhanced shadow for fixed tabs */
        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05);
        }

        /* Ensure perfect centering for fixed navigation */
        .fixed-nav-center {
          position: fixed;
          top: 5rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 50;
          white-space: nowrap;
        }

        /* Card hover effects */
        .card-hover-effect {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-hover-effect:hover {
          transform: translateY(-8px) scale(1.02);
          filter: brightness(1.1);
        }

        /* Active card indicators */
        .card-active-indicator {
          position: relative;
          overflow: hidden;
        }

        .card-active-indicator::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.1), transparent);
          transition: left 0.8s ease;
        }

        .card-active-indicator.active::before {
          left: 100%;
          animation: cardShimmer 2s infinite;
        }

        @keyframes cardShimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }

        /* Enhanced background animations */
        .bg-pattern-animation {
          background-size: 400% 400%;
          animation: gradientShift 8s ease infinite;
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* Progress indicator animations */
        .progress-indicator {
          position: relative;
        }

        .progress-indicator::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent, rgba(139, 92, 246, 0.1), transparent);
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .progress-indicator.active::after {
          opacity: 1;
          animation: progressGlow 2s ease-in-out infinite;
        }

        @keyframes progressGlow {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
          }
        }
        `}
      </style>
    </div>
  );
}
