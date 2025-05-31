import { useEffect, memo, useMemo } from "react";
import PropTypes from "prop-types";
import {
  FileText,
  Code,
  Award,
  Globe,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

// Memoized Components
const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <div className="relative inline-block group">
      <h2
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        About Me
      </h2>
    </div>
    <p
      className="flex items-center justify-center max-w-2xl gap-2 mx-auto mt-2 text-base text-gray-400 sm:text-lg"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Sparkles className="w-5 h-5 text-purple-400" />
      Transforming ideas into digital experiences
      <Sparkles className="w-5 h-5 text-purple-400" />
    </p>
  </div>
));
Header.displayName = "Header";

const ProfileImage = memo(() => (
  <div className="flex items-center justify-end p-0 py-2 pb-2 sm:p-12 sm:py-0 sm:pb-0">
    <div className="relative group" data-aos="fade-up" data-aos-duration="1000">
      {/* Optimized gradient backgrounds with reduced complexity for mobile */}
      <div className="absolute -inset-6 opacity-[25%] z-0 hidden sm:block">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 blur-2xl animate-spin-slower" />
        <div className="absolute inset-0 rounded-full opacity-50 bg-gradient-to-l from-fuchsia-500 via-rose-500 to-pink-600 blur-2xl animate-pulse-slow" />
        <div className="absolute inset-0 rounded-full opacity-50 bg-gradient-to-t from-blue-600 via-cyan-500 to-teal-400 blur-2xl animate-float" />
      </div>

      <div className="relative">
        <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(120,119,198,0.3)] transform transition-all duration-700 group-hover:scale-105">
          <div className="absolute inset-0 z-20 transition-all duration-700 border-4 rounded-full border-white/20 group-hover:border-white/40 group-hover:scale-105" />

          {/* Optimized overlay effects - disabled on mobile */}
          <div className="absolute inset-0 z-10 hidden transition-opacity duration-700 bg-gradient-to-b from-black/20 via-transparent to-black/40 group-hover:opacity-0 sm:block" />
          <div className="absolute inset-0 z-10 hidden transition-opacity duration-700 opacity-0 bg-gradient-to-t from-purple-500/20 via-transparent to-blue-500/20 group-hover:opacity-100 sm:block" />

          <img
            src="/public/profile.jpg"
            alt="Profile"
            className="object-cover w-full h-full transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
            loading="lazy"
          />

          {/* Advanced hover effects - desktop only */}
          <div className="absolute inset-0 z-20 hidden transition-all duration-700 opacity-0 group-hover:opacity-100 sm:block">
            <div className="absolute inset-0 transition-transform duration-1000 transform -translate-x-full bg-gradient-to-tr from-transparent via-white/20 to-transparent group-hover:translate-x-full" />
            <div className="absolute inset-0 transition-transform duration-1000 delay-100 transform translate-y-full bg-gradient-to-bl from-transparent via-white/10 to-transparent group-hover:-translate-y-full" />
            <div className="absolute inset-0 transition-transform duration-700 scale-0 border-8 rounded-full border-white/10 group-hover:scale-100 animate-pulse-slow" />
          </div>
        </div>
      </div>
    </div>
  </div>
));
ProfileImage.displayName = "ProfileImage";

const StatCard = memo(
  ({ icon: Icon, color, value, label, description, animation }) => (
    <div
      data-aos={animation}
      data-aos-duration={1300}
      className="relative group"
    >
      <div className="relative z-10 flex flex-col justify-between h-full p-6 overflow-hidden transition-all duration-300 border bg-gray-900/50 backdrop-blur-lg rounded-2xl border-white/10 hover:scale-105 hover:shadow-2xl">
        <div
          className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
        ></div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center justify-center w-16 h-16 transition-transform rounded-full bg-white/10 group-hover:rotate-6">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <span
            className="text-4xl font-bold text-white"
            data-aos="fade-up-left"
            data-aos-duration="1500"
            data-aos-anchor-placement="top-bottom"
          >
            {value}
          </span>
        </div>

        <div>
          <p
            className="mb-2 text-sm tracking-wider text-gray-300 uppercase"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-anchor-placement="top-bottom"
          >
            {label}
          </p>
          <div className="flex items-center justify-between">
            <p
              className="text-xs text-gray-400"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-anchor-placement="top-bottom"
            >
              {description}
            </p>
            <ArrowUpRight className="w-4 h-4 transition-colors text-white/50 group-hover:text-white" />
          </div>
        </div>
      </div>
    </div>
  )
);
StatCard.displayName = "StatCard";
StatCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  color: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  animation: PropTypes.string.isRequired,
};

const AboutPage = () => {
  // Memoized calculations
  const { totalProjects, totalCertificates, YearExperience } = useMemo(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const storedCertificates = JSON.parse(
      localStorage.getItem("certificates") || "[]"
    );

    const startDate = new Date("2021-11-06");
    const today = new Date();

    // More accurate year calculation
    const monthDiff = today.getMonth() - startDate.getMonth();
    const dayDiff = today.getDate() - startDate.getDate();
    let experience = today.getFullYear() - startDate.getFullYear();

    // Adjust year if we haven't reached anniversary month/day
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      experience--;
    }

    return {
      totalProjects: storedProjects.length,
      totalCertificates: storedCertificates.length,
      YearExperience: Math.max(0, experience), // Ensure non-negative value
    };
  }, []);

  // Optimized AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: false,
      });
    };

    initAOS();

    // Debounced resize handler
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initAOS, 250);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Memoized stats data
  const statsData = useMemo(
    () => [
      {
        icon: Code,
        color: "from-[#6366f1] to-[#a855f7]",
        value: totalProjects,
        label: "Total Projects",
        description: "Innovative web solutions crafted",
        animation: "fade-right",
      },
      {
        icon: Award,
        color: "from-[#a855f7] to-[#6366f1]",
        value: totalCertificates,
        label: "Certificates",
        description: "Professional skills validated",
        animation: "fade-up",
      },
      {
        icon: Globe,
        color: "from-[#6366f1] to-[#a855f7]",
        value: YearExperience,
        label: "Years of Experience",
        description: "Continuous learning journey",
        animation: "fade-left",
      },
    ],
    [totalProjects, totalCertificates, YearExperience]
  );

  return (
    <div
      className="h-auto pb-[10%] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-10 sm-mt-0"
      id="About"
    >
      <Header />

      <div className="relative w-full pt-8 mx-auto sm:pt-12">
        <div className="flex flex-col-reverse items-center gap-10 lg:grid lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6 text-center lg:text-left">
            <h2
              className="text-3xl font-bold sm:text-4xl lg:text-5xl"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                Hello, I'm
              </span>
              <span
                className="block mt-2 text-gray-200"
                data-aos="fade-right"
                data-aos-duration="1300"
              >
                Rumesh Kumara
              </span>
            </h2>

            <p
              className="pb-4 text-base leading-relaxed text-justify text-gray-400 sm:text-lg lg:text-xl sm:pb-0"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              I'm a passionate web developer 🧑🏻‍💻 with a focus on creating
              innovative and user-friendly web applications. With a strong
              foundation in modern web technologies, I strive to deliver
              high-quality solutions that enhance user experiences and drive
              business success.
            </p>

            <div className="flex flex-col items-center w-full gap-4 lg:flex-row lg:items-start lg:gap-4 lg:px-0">
              <a
                href="https://drive.google.com/drive/folders/1BOm51Grsabb3zj6Xk27K-iRwI1zITcpo"
                className="w-full lg:w-auto"
              >
                <button
                  data-aos="fade-up"
                  data-aos-duration="800"
                  className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 shadow-lg hover:shadow-xl animate-bounce-slow"
                >
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" /> Download CV
                </button>
              </a>
              <a href="#Portofolio" className="w-full lg:w-auto">
                <button
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg border border-[#a855f7]/50 text-[#a855f7] font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 hover:bg-[#a855f7]/10 animate-bounce-slow delay-200"
                >
                  <Code className="w-4 h-4 sm:w-5 sm:h-5" /> View Projects
                </button>
              </a>
            </div>
          </div>

          <ProfileImage />
        </div>

        <a href="#Portofolio">
          <div className="grid grid-cols-1 gap-6 mt-16 cursor-pointer md:grid-cols-3">
            {statsData.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </a>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes spin-slower {
          to {
            transform: rotate(360deg);
          }
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        .animate-pulse-slow {
          animation: pulse 3s infinite;
        }
        .animate-spin-slower {
          animation: spin-slower 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default memo(AboutPage);
