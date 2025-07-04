import { useEffect, useState, useCallback, useRef } from "react";
import { db, collection } from "../firebase";
import { getDocs } from "firebase/firestore";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import {
  Code,
  Award,
  Boxes,
  Search,
  Filter,
  TrendingUp,
  Users,
  Star,
  Zap,
  Globe,
  Database,
  Palette,
  Wrench,
  BookOpen,
  Trophy,
  Target,
  Rocket,
  Monitor,
  Smartphone,
  Cloud,
  Shield,
  GitBranch,
  Package,
  Layers,
  Activity,
  ChevronRight,
  ExternalLink,
  Download,
  Eye,
  Heart,
  ThumbsUp,
  Sparkles,
  Flame,
  X,
  Calendar,
  BarChart3,
  CheckCircle,
  Clock,
  Lightbulb,
  ArrowUpRight,
} from "lucide-react";

// Loading Skeleton Component
const SkeletonCard = () => (
  <div className="animate-pulse">
    <div className="p-6 space-y-4 bg-white/5 rounded-xl">
      <div className="h-40 rounded-lg bg-white/10"></div>
      <div className="space-y-2">
        <div className="w-3/4 h-4 rounded bg-white/10"></div>
        <div className="w-1/2 h-3 rounded bg-white/10"></div>
      </div>
    </div>
  </div>
);

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
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="relative flex items-center gap-2 px-4 py-2 overflow-hidden text-sm font-medium transition-all duration-500 ease-out transform border rounded-lg shadow-lg group text-slate-300 hover:text-white bg-gradient-to-r from-white/5 to-white/10 hover:from-purple-500/10 hover:to-blue-500/10 border-white/10 hover:border-purple-500/30 backdrop-blur-sm hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/20"
  >
    <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-blue-600/0 group-hover:opacity-100"></div>

    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "Show Less" : "Show More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-500 ${
          isShowingMore
            ? "group-hover:-translate-y-1 rotate-180"
            : "group-hover:translate-y-1"
        }`}
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </span>

    <div
      className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 
                    transition-all duration-500 group-hover:w-full"
    ></div>

    <div
      className="absolute inset-0 transition-opacity duration-500 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100"
      style={{
        background:
          "linear-gradient(45deg, transparent 30%, rgba(139, 92, 246, 0.1) 50%, transparent 70%)",
        transform: "translateX(-100%)",
        animation: "shimmer 1.5s infinite",
      }}
    ></div>
  </button>
);

// Search and Filter Component
const SearchFilter = ({
  searchTerm,
  onSearchChange,
  selectedFilter,
  onFilterChange,
  filters,
}) => (
  <div
    className="flex flex-col gap-4 mb-6 sm:flex-row"
    data-aos="fade-up"
    data-aos-delay="200"
  >
    <div className="relative flex-1">
      <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-slate-400" />
      <input
        type="text"
        placeholder="Search projects..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full py-2 pl-10 pr-4 text-white transition-all duration-300 border rounded-lg bg-white/5 border-white/10 placeholder-slate-400 focus:outline-none focus:border-purple-500/50 focus:bg-white/10"
      />
    </div>

    <div className="relative">
      <Filter className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-slate-400" />
      <select
        value={selectedFilter}
        onChange={(e) => onFilterChange(e.target.value)}
        className="pl-10 pr-8 py-2 bg-white/5 border border-white/10 rounded-lg
                   text-white focus:outline-none focus:border-purple-500/50
                   focus:bg-white/10 transition-all duration-300 min-w-[140px]"
      >
        <option value="all">All Projects</option>
        {filters.map((filter) => (
          <option key={filter} value={filter}>
            {filter}
          </option>
        ))}
      </select>
    </div>
  </div>
);

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

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

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
              <img
                src={`/TechStackIcon/${skill.icon}`}
                alt={skill.name}
                className="object-contain w-full h-full transition-transform duration-500 hover:scale-110"
              />
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

  const getProficiencyColor = (level) => {
    if (level >= 90)
      return {
        bg: "from-emerald-500 to-teal-500",
        text: "text-emerald-400",
        border: "border-emerald-500/30",
      };
    if (level >= 75)
      return {
        bg: "from-blue-500 to-indigo-500",
        text: "text-blue-400",
        border: "border-blue-500/30",
      };
    if (level >= 60)
      return {
        bg: "from-purple-500 to-pink-500",
        text: "text-purple-400",
        border: "border-purple-500/30",
      };
    return {
      bg: "from-orange-500 to-red-500",
      text: "text-orange-400",
      border: "border-orange-500/30",
    };
  };

  const getProficiencyLabel = (level) => {
    if (level >= 90) return "Expert";
    if (level >= 75) return "Advanced";
    if (level >= 60) return "Intermediate";
    return "Learning";
  };

  const colors = getProficiencyColor(proficiency);

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
              <img
                src={`/TechStackIcon/${icon}`}
                alt={name}
                className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-110"
              />
              {/* Floating badge */}
              <div
                className={`absolute -top-2 -right-2 w-6 h-6 ${colors.bg} rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg`}
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
                className={`px-2 py-1 text-xs rounded-full ${colors.text} bg-gradient-to-r ${colors.bg} bg-opacity-20 border ${colors.border}`}
              >
                {getProficiencyLabel(proficiency)}
              </span>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="text-right">
          <div className={`text-2xl font-bold ${colors.text} mb-1`}>
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
            className={`absolute top-0 left-0 h-full bg-gradient-to-r ${colors.bg} rounded-full transition-all duration-1000 ease-out`}
            style={{
              width: `${animatedWidth}%`,
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
          <div className="flex items-center gap-1 text-xs text-purple-400">
            <ArrowUpRight className="w-3 h-3" />
            <span>View more</span>
          </div>
        </div>
      </div>

      {/* Hover Effects */}
      <div className="absolute inset-0 transition-all duration-300 opacity-0 pointer-events-none group-hover:opacity-100 rounded-2xl">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-5 rounded-2xl`}
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

// Enhanced tech stacks with additional details
const techStacks = [
  {
    icon: "html.svg",
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
    icon: "css.svg",
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
    icon: "javascript.svg",
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
    icon: "tailwind.svg",
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
    icon: "reactjs.svg",
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
    icon: "vite.svg",
    language: "Vite",
    category: "Build Tool",
    proficiency: 75,
    categoryIcon: Rocket,
  },
  {
    icon: "nodejs.svg",
    language: "Node JS",
    category: "Backend",
    proficiency: 70,
    categoryIcon: Database,
  },
  {
    icon: "bootstrap.svg",
    language: "Bootstrap",
    category: "Frontend",
    proficiency: 85,
    categoryIcon: Smartphone,
  },
  {
    icon: "firebase.svg",
    language: "Firebase",
    category: "Backend",
    proficiency: 78,
    categoryIcon: Cloud,
  },
  {
    icon: "MUI.svg",
    language: "Material UI",
    category: "Frontend",
    proficiency: 80,
    categoryIcon: Layers,
  },
  {
    icon: "vercel.svg",
    language: "Vercel",
    category: "Deployment",
    proficiency: 85,
    categoryIcon: Globe,
  },
  {
    icon: "SweetAlert.svg",
    language: "SweetAlert2",
    category: "Library",
    proficiency: 90,
    categoryIcon: Shield,
  },
];

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  useEffect(() => {
    AOS.init({
      once: false,
      duration: 800,
      easing: "ease-out-cubic",
    });
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      // Simulate loading delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const projectCollection = collection(db, "projects");
      const certificateCollection = collection(db, "certificates");

      const [projectSnapshot, certificateSnapshot] = await Promise.all([
        getDocs(projectCollection),
        getDocs(certificateCollection),
      ]);

      const projectData = projectSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        TechStack: doc.data().TechStack || [],
      }));

      const certificateData = certificateSnapshot.docs.map((doc) => doc.data());

      setProjects(projectData);
      setCertificates(certificateData);

      localStorage.setItem("projects", JSON.stringify(projectData));
      localStorage.setItem("certificates", JSON.stringify(certificateData));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback((type) => {
    if (type === "projects") {
      setShowAllProjects((prev) => !prev);
    } else {
      setShowAllCertificates((prev) => !prev);
    }
  }, []);

  // Filter projects based on search and filter
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.Title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.Description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" ||
      project.TechStack?.some((tech) =>
        tech.toLowerCase().includes(selectedFilter.toLowerCase())
      );
    return matchesSearch && matchesFilter;
  });

  const displayedProjects = showAllProjects
    ? filteredProjects
    : filteredProjects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates
    ? certificates
    : certificates.slice(0, initialItems);

  // Get unique filters from projects
  const projectFilters = [
    ...new Set(projects.flatMap((project) => project.TechStack || [])),
  ];

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
      <div className="relative pb-10 text-center">
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
        <div className="grid max-w-4xl grid-cols-2 gap-4 mx-auto mb-8 md:grid-cols-4">
          {[
            {
              icon: Code,
              label: "Projects",
              value: projects.length,
              bgIcon: Rocket,
              color: "blue",
            },
            {
              icon: Award,
              label: "Certificates",
              value: certificates.length,
              bgIcon: Trophy,
              color: "purple",
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
        {/* Enhanced AppBar with glassmorphism effect */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(20px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                  "& .lucide": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background:
                    "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                  "& .lucide": {
                    color: "#a78bfa",
                  },
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .MuiTabs-flexContainer": {
                gap: "8px",
              },
            }}
          >
            <Tab
              icon={
                <Code className="w-5 h-5 mb-2 transition-all duration-300" />
              }
              label="Projects"
              {...a11yProps(0)}
            />
            <Tab
              icon={
                <Award className="w-5 h-5 mb-2 transition-all duration-300" />
              }
              label="Certificates"
              {...a11yProps(1)}
            />
            <Tab
              icon={
                <Boxes className="w-5 h-5 mb-2 transition-all duration-300" />
              }
              label="Tech Stack"
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={setValue}
          style={{ minHeight: "400px" }}
        >
          {/* Projects Tab */}
          <TabPanel value={value} index={0} dir={theme.direction}>
            <SearchFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter}
              filters={projectFilters}
            />

            <div className="container flex items-center justify-center mx-auto overflow-hidden">
              {loading ? (
                <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <SkeletonCard key={index} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3">
                  {displayedProjects.map((project, index) => (
                    <div
                      key={project.id || index}
                      data-aos="fade-up"
                      data-aos-duration="800"
                      data-aos-delay={index * 100}
                      className="transition-all duration-500 transform hover:scale-105"
                    >
                      <CardProject
                        Img={project.Img}
                        Title={project.Title}
                        Description={project.Description}
                        Link={project.Link}
                        id={project.id}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {filteredProjects.length > initialItems && (
              <div className="flex justify-start w-full mt-6">
                <ToggleButton
                  onClick={() => toggleShowMore("projects")}
                  isShowingMore={showAllProjects}
                />
              </div>
            )}
          </TabPanel>

          {/* Certificates Tab */}
          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container flex items-center justify-center mx-auto overflow-hidden">
              {loading ? (
                <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <SkeletonCard key={index} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
                  {displayedCertificates.map((certificate, index) => (
                    <div
                      key={index}
                      data-aos="flip-left"
                      data-aos-duration="800"
                      data-aos-delay={index * 150}
                      className="transition-all duration-500 transform hover:scale-105 hover:rotate-1"
                    >
                      <Certificate ImgSertif={certificate.Img} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {certificates.length > initialItems && (
              <div className="flex justify-start w-full mt-6">
                <ToggleButton
                  onClick={() => toggleShowMore("certificates")}
                  isShowingMore={showAllCertificates}
                />
              </div>
            )}
          </TabPanel>

          {/* Tech Stack Tab */}
          <TabPanel value={value} index={2} dir={theme.direction}>
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
                      label: "Tools",
                      count: techStacks.filter(
                        (t) => t.category === "Build Tool"
                      ).length,
                      icon: Wrench,
                      gradient: "from-orange-500 to-red-500",
                      bgPattern: "bg-orange-500/10",
                      borderColor: "border-orange-500/30",
                    },
                    {
                      label: "Cloud & More",
                      count: techStacks.filter((t) =>
                        ["Deployment", "Library"].includes(t.category)
                      ).length,
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
        `}
      </style>
    </div>
  );
}
