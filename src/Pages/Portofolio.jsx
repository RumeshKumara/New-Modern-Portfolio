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
    className="relative flex items-center gap-2 px-4 py-2 overflow-hidden text-sm font-medium transition-all duration-500 ease-out transform border rounded-lg shadow-lg  group text-slate-300 hover:text-white bg-gradient-to-r from-white/5 to-white/10 hover:from-purple-500/10 hover:to-blue-500/10 border-white/10 hover:border-purple-500/30 backdrop-blur-sm hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/20"
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

const techStacks = [
  { icon: "html.svg", language: "HTML", category: "Frontend" },
  { icon: "css.svg", language: "CSS", category: "Frontend" },
  { icon: "javascript.svg", language: "JavaScript", category: "Frontend" },
  { icon: "tailwind.svg", language: "Tailwind CSS", category: "Frontend" },
  { icon: "reactjs.svg", language: "ReactJS", category: "Frontend" },
  { icon: "vite.svg", language: "Vite", category: "Build Tool" },
  { icon: "nodejs.svg", language: "Node JS", category: "Backend" },
  { icon: "bootstrap.svg", language: "Bootstrap", category: "Frontend" },
  { icon: "firebase.svg", language: "Firebase", category: "Backend" },
  { icon: "MUI.svg", language: "Material UI", category: "Frontend" },
  { icon: "vercel.svg", language: "Vercel", category: "Deployment" },
  { icon: "SweetAlert.svg", language: "SweetAlert2", category: "Library" },
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
            { icon: Code, label: "Projects", value: projects.length },
            { icon: Award, label: "Certificates", value: certificates.length },
            { icon: Boxes, label: "Technologies", value: techStacks.length },
            { icon: TrendingUp, label: "Experience", value: 2, suffix: "+" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="p-4 transition-all duration-500 transform border bg-white/5 backdrop-blur-sm rounded-xl border-white/10 hover:bg-white/10 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <stat.icon className="w-6 h-6 mx-auto mb-2 text-purple-400" />
              <div className="text-2xl font-bold text-white">
                <StatCounter end={stat.value} suffix={stat.suffix || ""} />
              </div>
              <div className="text-sm text-slate-400">{stat.label}</div>
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
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6 lg:gap-8">
                {techStacks.map((stack, index) => (
                  <div
                    key={index}
                    data-aos="zoom-in"
                    data-aos-duration="600"
                    data-aos-delay={index * 100}
                    className="transition-all duration-500 transform hover:scale-110 hover:-translate-y-2"
                  >
                    <TechStackIcon
                      TechStackIcon={stack.icon}
                      Language={stack.language}
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>

      {/* Add CSS animation for shimmer effect */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
