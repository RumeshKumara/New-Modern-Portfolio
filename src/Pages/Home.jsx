import { useState, useEffect, useCallback, memo } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Instagram,
  Sparkles,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import PropTypes from "prop-types";

// Memoized Components
const StatusBadge = memo(() => (
  <div
    className="inline-block animate-float lg:mx-0"
    data-aos="zoom-in"
    data-aos-delay="400"
  >
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
    </div>
  </div>
));
StatusBadge.displayName = "StatusBadge";

const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-3xl font-bold tracking-tight xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text">
          FullStack
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-1 md:mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
          Developer
        </span>
      </span>
    </h1>
  </div>
));
MainTitle.displayName = "MainTitle";

const TechStack = memo(({ tech }) => (
  <div className="relative group">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#6366f1] rounded-full opacity-30 blur-sm "></div>
    <div className="relative px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm text-gray-300 transition-colors border rounded-full bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 group-hover:border-white/20">
      {tech}
    </div>
  </div>
));
TechStack.displayName = "TechStack";

TechStack.propTypes = {
  tech: PropTypes.string.isRequired,
};

const CTAButton = memo(({ href, text, icon: Icon }) => (
  <a href={href}>
    <button className="group relative w-[140px] sm:w-[160px]">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-2xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700"></div>
      <div className="relative h-10 sm:h-11 bg-[#030014] backdrop-blur-xl rounded-3xl border border-white/10 leading-none overflow-hidden">
        <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#4f52c9]/20 to-[#8644c5]/20"></div>
        <span className="absolute inset-0 flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm transition-all duration-300 group-hover:gap-2 sm:group-hover:gap-3">
          <span className="z-10 font-medium text-transparent bg-gradient-to-r from-gray-200 to-white bg-clip-text">
            {text}
          </span>
          <Icon
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-200 ${
              text === "Contact"
                ? "group-hover:translate-x-1"
                : "group-hover:rotate-45"
            } transform transition-all duration-300 z-10`}
          />
        </span>
      </div>
    </button>
  </a>
));
CTAButton.displayName = "CTAButton";

CTAButton.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
};

const SocialLink = memo(({ icon: Icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <button className="relative p-2 sm:p-3 group">
      <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative flex items-center justify-center p-1.5 sm:p-2 transition-all duration-300 border rounded-xl bg-black/50 backdrop-blur-xl border-white/10 group-hover:border-white/20">
        <Icon className="w-4 h-4 text-gray-400 transition-colors sm:w-5 sm:h-5 group-hover:text-white" />
      </div>
    </button>
  </a>
));
SocialLink.displayName = "SocialLink";

SocialLink.propTypes = {
  icon: PropTypes.elementType.isRequired,
  link: PropTypes.string.isRequired,
};

// Constants
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["University Student", "Tech Enthusiast"];
const TECH_STACK = ["React", "Javascript", "Node.js", "Tailwind"];
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/RumeshKumara" },
  {
    icon: Linkedin,
    link: "https://www.linkedin.com/in/rumesh-kumara-166bb72a5",
  },
  { icon: Instagram, link: "https://www.instagram.com/rumesh884/" },
];

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Optimize AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: true,
        offset: 10,
      });
    };

    initAOS();
    window.addEventListener("resize", initAOS);
    return () => window.removeEventListener("resize", initAOS);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  // Optimize typing effect
  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText((prev) => prev + WORDS[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping, isTyping]);

  return (
    <div className="min-h-screen bg-[#030014] overflow-hidden" id="Home">
      <div
        className={`relative z-10 transition-all duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-[5%] xl:px-[8%] 2xl:px-[10%] min-h-screen">
          <div className="flex flex-col items-center justify-center min-h-screen gap-8 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-8 xl:gap-12 2xl:gap-16 sm:py-12 lg:py-0">
            {/* Left Column */}
            <div
              className="order-2 w-full space-y-4 text-center lg:order-1 lg:w-[40%] xl:w-[38%] lg:text-left lg:flex-shrink-0"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                <StatusBadge />
                <MainTitle />

                {/* Typing Effect */}
                <div
                  className="flex items-center justify-center h-6 lg:justify-start sm:h-8"
                  data-aos="fade-up"
                  data-aos-delay="800"
                >
                  <span className="text-lg font-light text-transparent sm:text-xl md:text-2xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text">
                    {text}
                  </span>
                  <span className="w-[2px] sm:w-[3px] h-5 sm:h-6 bg-gradient-to-t from-[#6366f1] to-[#130f17] ml-1 animate-blink"></span>
                </div>

                {/* Description */}
                <p
                  className="max-w-sm mx-auto text-sm font-light leading-relaxed text-gray-400 sm:max-w-md lg:max-w-xl lg:mx-0 sm:text-base lg:text-lg"
                  data-aos="fade-up"
                  data-aos-delay="1000"
                >
                  Menciptakan Website Yang Inovatif, Fungsional, dan
                  User-Friendly untuk Solusi Digital.
                </p>

                {/* Tech Stack */}
                <div
                  className="flex flex-wrap justify-center gap-2 lg:justify-start sm:gap-3"
                  data-aos="fade-up"
                  data-aos-delay="1200"
                >
                  {TECH_STACK.map((tech, index) => (
                    <TechStack key={index} tech={tech} />
                  ))}
                </div>

                {/* CTA Buttons */}
                <div
                  className="flex flex-row justify-center w-full gap-3 lg:justify-start sm:gap-4"
                  data-aos="fade-up"
                  data-aos-delay="1400"
                >
                  <CTAButton
                    href="#Portofolio"
                    text="Projects"
                    icon={ExternalLink}
                  />
                  <CTAButton href="#Contact" text="Contact" icon={Mail} />
                </div>

                {/* Social Links */}
                <div
                  className="flex justify-center gap-3 lg:justify-start sm:gap-4"
                  data-aos="fade-up"
                  data-aos-delay="1600"
                >
                  {SOCIAL_LINKS.map((social, index) => (
                    <SocialLink key={index} {...social} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Video */}
            <div
              className="order-1 lg:order-2 w-full lg:w-[55%] xl:w-[58%] h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[85vh] 2xl:h-[90vh] relative flex items-center justify-center lg:justify-end lg:flex-shrink-0 lg:-mr-[5%] xl:-mr-[8%] 2xl:-mr-[10%]"
              data-aos="fade-left"
              data-aos-delay="600"
            >
              <div className="relative flex items-center justify-center w-full h-full lg:justify-end">
                <video
                  className="object-cover w-full h-full max-w-full rounded-xl sm:rounded-2xl lg:w-full lg:max-w-none shadow-[0_0_40px_rgba(0,0,0,0.8)] sm:shadow-[0_0_60px_rgba(0,0,0,0.9)] lg:shadow-[0_0_80px_rgba(0,0,0,0.95),0_0_120px_rgba(0,0,0,0.85),0_0_200px_rgba(0,0,0,0.7),0_0_300px_rgba(0,0,0,0.5)]"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/216761_small.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Essential Animations */
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-4px) translateX(2px); }
          50% { transform: translateY(-2px) translateX(-1px); }
          75% { transform: translateY(-6px) translateX(3px); }
        }
        
        @media (min-width: 640px) {
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            25% { transform: translateY(-8px) translateX(4px); }
            50% { transform: translateY(-4px) translateX(-2px); }
            75% { transform: translateY(-12px) translateX(6px); }
          }
        }
        
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Extra small devices (up to 480px) */
        @media (max-width: 479px) {
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        }

        /* Small devices and up */
        @media (min-width: 480px) {
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        }

        .animate-blink {
          animation: blink 1s infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default memo(Home);
