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
      <div className="relative px-3 py-2 border rounded-full sm:px-4 bg-black/40 backdrop-blur-xl border-white/10">
        <span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-transparent bg-clip-text sm:text-sm text-[0.7rem] font-medium flex items-center">
          <Sparkles className="w-3 h-3 mr-2 text-blue-400 sm:w-4 sm:h-4" />
          Ready to Innovate
        </span>
      </div>
    </div>
  </div>
));
StatusBadge.displayName = "StatusBadge";

const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text">
          FullStack
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
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
    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#6366f1] rounded-full opacity-30 blur-sm animate-spin-slow"></div>
    <div className="relative hidden px-4 py-2 text-sm text-gray-300 transition-colors border rounded-full sm:block bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 group-hover:border-white/20">
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
    <button className="group relative w-[160px]">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-2xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700"></div>
      <div className="relative h-11 bg-[#030014] backdrop-blur-xl rounded-3xl border border-white/10 leading-none overflow-hidden">
        <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#4f52c9]/20 to-[#8644c5]/20"></div>
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm transition-all duration-300 group-hover:gap-3">
          <span className="z-10 font-medium text-transparent bg-gradient-to-r from-gray-200 to-white bg-clip-text">
            {text}
          </span>
          <Icon
            className={`w-4 h-4 text-gray-200 ${
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
    <button className="relative p-3 group">
      <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative flex items-center justify-center p-2 transition-all duration-300 border rounded-xl bg-black/50 backdrop-blur-xl border-white/10 group-hover:border-white/20">
        <Icon className="w-5 h-5 text-gray-400 transition-colors group-hover:text-white" />
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
  { icon: Linkedin, link: "https://www.linkedin.com/in/ekizr/" },
  { icon: Instagram, link: "https://www.instagram.com/ekizr_/?hl=id" },
];

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [crowdWave, setCrowdWave] = useState(0);
  const [logoWave, setLogoWave] = useState(0);

  // Track mouse position for magnetic effects
  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  }, []);

  // Crowd spreading wave effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCrowdWave((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Programming logo spreading wave effect
  useEffect(() => {
    const interval = setInterval(() => {
      setLogoWave((prev) => (prev + 1) % 4);
    }, 3000); // Reduced interval for faster sequential movement
    return () => clearInterval(interval);
  }, []);

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
  }, [handleTyping]);

  return (
    <div className="min-h-screen bg-[#030014] overflow-hidden" id="Home">
      <div
        className={`relative z-10 transition-all duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container mx-auto px-[5%] sm:px-6 lg:px-[5%] xl:px-[8%] 2xl:px-[10%] min-h-screen">
          <div className="flex flex-col items-center justify-center h-screen gap-0 lg:flex-row md:justify-between sm:gap-12 lg:gap-20">
            {/* Left Column */}
            <div
              className="order-1 w-full space-y-6 text-left lg:w-1/2 sm:space-y-8 lg:text-left lg:order-1 lg:mt-0"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <div className="space-y-4 sm:space-y-6">
                <StatusBadge />
                <MainTitle />

                {/* Typing Effect */}
                <div
                  className="flex items-center h-8"
                  data-aos="fade-up"
                  data-aos-delay="800"
                >
                  <span className="text-xl font-light text-transparent md:text-2xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text">
                    {text}
                  </span>
                  <span className="w-[3px] h-6 bg-gradient-to-t from-[#6366f1] to-[#a855f7] ml-1 animate-blink"></span>
                </div>

                {/* Description */}
                <p
                  className="max-w-xl text-base font-light leading-relaxed text-gray-400 md:text-lg"
                  data-aos="fade-up"
                  data-aos-delay="1000"
                >
                  Menciptakan Website Yang Inovatif, Fungsional, dan
                  User-Friendly untuk Solusi Digital.
                </p>

                {/* Tech Stack */}
                <div
                  className="flex flex-wrap justify-start gap-3"
                  data-aos="fade-up"
                  data-aos-delay="1200"
                >
                  {TECH_STACK.map((tech, index) => (
                    <TechStack key={index} tech={tech} />
                  ))}
                </div>

                {/* CTA Buttons */}
                <div
                  className="flex flex-row justify-start w-full gap-3"
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
                  className="justify-start hidden gap-4 sm:flex"
                  data-aos="fade-up"
                  data-aos-delay="1600"
                >
                  {SOCIAL_LINKS.map((social, index) => (
                    <SocialLink key={index} {...social} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Enhanced Space Animation with Black Hole */}
            <div
              className="w-full py-[10%] sm:py-0 lg:w-1/2 h-auto lg:h-[600px] xl:h-[750px] relative flex items-center justify-center order-2 lg:order-2 mt-8 lg:mt-0"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onMouseMove={handleMouseMove}
              data-aos="fade-left"
              data-aos-delay="600"
            >
              <div className="relative w-full h-full">
                {/* Wave Animations Container */}
                <div className="absolute inset-0 overflow-hidden z-5">
                  {/* Sine Wave Lines */}
                  <div className="absolute inset-0">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 800 600"
                      preserveAspectRatio="none"
                    >
                      {/* Horizontal Sine Waves */}
                      {[...Array(8)].map((_, i) => (
                        <path
                          key={`h-wave-${i}`}
                          d={`M 0 ${150 + i * 40} Q 200 ${130 + i * 40} 400 ${
                            150 + i * 40
                          } T 800 ${150 + i * 40}`}
                          fill="none"
                          stroke={`rgba(${99 + i * 20}, ${130 + i * 15}, 246, ${
                            0.3 - i * 0.03
                          })`}
                          strokeWidth="2"
                          className="animate-[sineWave_8s_ease-in-out_infinite]"
                          style={{
                            animationDelay: `${i * 0.5}s`,
                            filter: "blur(0.5px)",
                          }}
                        />
                      ))}

                      {/* Vertical Sine Waves */}
                      {[...Array(6)].map((_, i) => (
                        <path
                          key={`v-wave-${i}`}
                          d={`M ${150 + i * 80} 0 Q ${130 + i * 80} 150 ${
                            150 + i * 80
                          } 300 T ${150 + i * 80} 600`}
                          fill="none"
                          stroke={`rgba(${139 + i * 15}, ${92 + i * 20}, 246, ${
                            0.25 - i * 0.03
                          })`}
                          strokeWidth="1.5"
                          className="animate-[verticalSineWave_10s_ease-in-out_infinite]"
                          style={{
                            animationDelay: `${i * 0.7}s`,
                            filter: "blur(0.5px)",
                          }}
                        />
                      ))}
                    </svg>
                  </div>

                  {/* Circular Wave Ripples */}
                  <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={`wave-ripple-${i}`}
                        className="absolute border rounded-full animate-[waveRipple_6s_ease-out_infinite]"
                        style={{
                          width: `${80 + i * 60}px`,
                          height: `${80 + i * 60}px`,
                          marginLeft: `-${40 + i * 30}px`,
                          marginTop: `-${40 + i * 30}px`,
                          borderColor: `rgba(${99 + i * 30}, ${
                            130 + i * 20
                          }, 246, ${0.4 - i * 0.05})`,
                          borderWidth: `${3 - i * 0.3}px`,
                          animationDelay: `${i * 0.8}s`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Wave Particles */}
                  <div className="absolute inset-0">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={`wave-particle-${i}`}
                        className="absolute w-2 h-2 rounded-full animate-[waveParticle_12s_ease-in-out_infinite]"
                        style={{
                          left: `${5 + i * 4.5}%`,
                          top: "50%",
                          animationDelay: `${i * 0.3}s`,
                        }}
                      >
                        <div
                          className={`w-full h-full rounded-full ${
                            i % 4 === 0
                              ? "bg-blue-400/70"
                              : i % 4 === 1
                              ? "bg-purple-400/70"
                              : i % 4 === 2
                              ? "bg-cyan-400/70"
                              : "bg-indigo-400/70"
                          } animate-[particlePulse_2s_ease-in-out_infinite]`}
                          style={{
                            animationDelay: `${i * 0.2}s`,
                            filter: "blur(0.5px)",
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Flowing Wave Lines */}
                  <div className="absolute inset-0">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={`flow-wave-${i}`}
                        className="absolute w-full h-[2px] animate-[flowingWave_15s_linear_infinite]"
                        style={{
                          top: `${20 + i * 20}%`,
                          background: `linear-gradient(90deg, 
                            transparent, 
                            rgba(${99 + i * 40}, ${130 + i * 30}, 246, 0.6), 
                            transparent)`,
                          animationDelay: `${i * 2}s`,
                          filter: "blur(0.5px)",
                        }}
                      />
                    ))}
                  </div>

                  {/* Radial Wave Distortion */}
                  <div
                    className={`absolute inset-0 transition-all duration-1000 ${
                      isHovering
                        ? "opacity-70 scale-105"
                        : "opacity-40 scale-100"
                    }`}
                  >
                    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={`radial-wave-${i}`}
                          className="absolute w-1 h-16 animate-[radialWave_8s_ease-in-out_infinite]"
                          style={{
                            background: `linear-gradient(180deg, 
                              transparent, 
                              rgba(${59 + i * 15}, ${130 + i * 10}, 246, ${
                              0.5 - i * 0.03
                            }), 
                              transparent)`,
                            transformOrigin: "bottom center",
                            transform: `rotate(${i * 30}deg) translateY(-40px)`,
                            animationDelay: `${i * 0.3}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Interactive Wave Response */}
                  <div
                    className={`absolute inset-0 transition-all duration-500 ${
                      isHovering ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={`interactive-wave-${i}`}
                          className="absolute w-32 h-[1px] animate-[interactiveWave_4s_ease-in-out_infinite]"
                          style={{
                            background: `linear-gradient(90deg, 
                              transparent, 
                              rgba(${139 + i * 20}, ${92 + i * 15}, 246, 0.8), 
                              transparent)`,
                            transformOrigin: "center",
                            transform: `rotate(${i * 45}deg)`,
                            animationDelay: `${i * 0.2}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Wave Echo Effect */}
                  <div className="absolute inset-0">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={`wave-echo-${i}`}
                        className="absolute w-full h-full animate-[waveEcho_10s_ease-in-out_infinite]"
                        style={{
                          animationDelay: `${i * 2}s`,
                        }}
                      >
                        <div
                          className="absolute w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2"
                          style={{
                            background: `radial-gradient(circle, 
                              transparent 40%, 
                              rgba(${99 + i * 50}, ${130 + i * 40}, 246, ${
                              0.1 - i * 0.02
                            }) 50%, 
                              transparent 60%)`,
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Spiral Wave Pattern */}
                  <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                    <svg
                      width="400"
                      height="400"
                      viewBox="0 0 400 400"
                      className="animate-[spiralWave_20s_linear_infinite]"
                    >
                      <path
                        d="M 200,200 m -50,0 A 50,50 0 1,1 -50,0 A 100,100 0 1,1 50,0 A 150,150 0 1,1 -50,0"
                        fill="none"
                        stroke="rgba(99, 130, 246, 0.3)"
                        strokeWidth="2"
                        className="animate-[spiralPulse_8s_ease-in-out_infinite]"
                      />
                      <path
                        d="M 200,200 m -75,0 A 75,75 0 1,0 75,0 A 125,125 0 1,0 -75,0 A 175,175 0 1,0 75,0"
                        fill="none"
                        stroke="rgba(139, 92, 246, 0.25)"
                        strokeWidth="1.5"
                        className="animate-[spiralPulse_10s_ease-in-out_infinite]"
                        style={{ animationDelay: "2s" }}
                      />
                    </svg>
                  </div>
                </div>

                {/* Programming Logo Spreading Animation */}
                <div
                  className={`absolute inset-0 z-15 transition-all duration-1000 ${
                    isHovering ? "opacity-0 scale-90" : "opacity-100 scale-100"
                  }`}
                >
                  <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                    {/* React Logo - Sequential movement */}
                    {[...Array(1)].map((_, i) => (
                      <div
                        key={`react-${i}`}
                        className="absolute w-10 h-10 animate-[logoSpreadSequential_6s_ease-out_infinite]"
                        style={{
                          animationDelay: `${logoWave * 6}s`,
                        }}
                      >
                        <div className="w-full h-full bg-blue-600/90 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg animate-[logoRotate_4s_ease-in-out_infinite]">
                          React
                        </div>
                      </div>
                    ))}

                    {/* JavaScript Logo */}
                    {[...Array(1)].map((_, i) => (
                      <div
                        key={`js-${i}`}
                        className="absolute w-10 h-10 animate-[logoSpreadSequential_6s_ease-out_infinite]"
                        style={{
                          animationDelay: `${logoWave * 6 + 1}s`,
                        }}
                      >
                        <div className="w-full h-full bg-yellow-600/90 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg animate-[logoRotate_4s_ease-in-out_infinite]">
                          JS
                        </div>
                      </div>
                    ))}

                    {/* Node.js Logo */}
                    {[...Array(1)].map((_, i) => (
                      <div
                        key={`node-${i}`}
                        className="absolute w-10 h-10 animate-[logoSpreadSequential_6s_ease-out_infinite]"
                        style={{
                          animationDelay: `${logoWave * 6 + 2}s`,
                        }}
                      >
                        <div className="w-full h-full bg-green-700/90 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg animate-[logoRotate_4s_ease-in-out_infinite]">
                          Node
                        </div>
                      </div>
                    ))}

                    {/* Tailwind Logo */}
                    {[...Array(1)].map((_, i) => (
                      <div
                        key={`tailwind-${i}`}
                        className="absolute w-10 h-10 animate-[logoSpreadSequential_6s_ease-out_infinite]"
                        style={{
                          animationDelay: `${logoWave * 6 + 3}s`,
                        }}
                      >
                        <div className="w-full h-full bg-cyan-700/90 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg animate-[logoRotate_4s_ease-in-out_infinite]">
                          TW
                        </div>
                      </div>
                    ))}

                    {/* HTML Logo */}
                    {[...Array(1)].map((_, i) => (
                      <div
                        key={`html-${i}`}
                        className="absolute w-10 h-10 animate-[logoSpreadSequential_6s_ease-out_infinite]"
                        style={{
                          animationDelay: `${logoWave * 6 + 4}s`,
                        }}
                      >
                        <div className="w-full h-full bg-orange-700/90 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg animate-[logoRotate_4s_ease-in-out_infinite]">
                          HTML
                        </div>
                      </div>
                    ))}

                    {/* CSS Logo */}
                    {[...Array(1)].map((_, i) => (
                      <div
                        key={`css-${i}`}
                        className="absolute w-10 h-10 animate-[logoSpreadSequential_6s_ease-out_infinite]"
                        style={{
                          animationDelay: `${logoWave * 6 + 5}s`,
                        }}
                      >
                        <div className="w-full h-full bg-blue-800/90 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg animate-[logoRotate_4s_ease-in-out_infinite]">
                          CSS
                        </div>
                      </div>
                    ))}

                    {/* Git Logo */}
                    {[...Array(1)].map((_, i) => (
                      <div
                        key={`git-${i}`}
                        className="absolute w-10 h-10 animate-[logoSpreadSequential_6s_ease-out_infinite]"
                        style={{
                          animationDelay: `${logoWave * 6 + 6}s`,
                        }}
                      >
                        <div className="w-full h-full bg-red-700/90 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg animate-[logoRotate_4s_ease-in-out_infinite]">
                          Git
                        </div>
                      </div>
                    ))}

                    {/* Sequential ripple effect */}
                    {[...Array(1)].map((_, i) => (
                      <div
                        key={`logo-ripple-${i}`}
                        className="absolute border-2 border-blue-500/40 rounded-full animate-[logoRippleSequential_6s_ease-out_infinite]"
                        style={{
                          width: "80px",
                          height: "80px",
                          marginLeft: "-40px",
                          marginTop: "-40px",
                          animationDelay: `${logoWave * 6}s`,
                        }}
                      ></div>
                    ))}
                  </div>

                  {/* Sequential connection lines */}
                  <div className="absolute inset-0">
                    <svg
                      className="w-full h-full opacity-40"
                      viewBox="0 0 400 400"
                    >
                      {[...Array(7)].map((_, i) => (
                        <g key={`logo-constellation-${i}`}>
                          <line
                            x1="50%"
                            y1="50%"
                            x2={`${50 + Math.cos((i * Math.PI * 2) / 7) * 25}%`}
                            y2={`${50 + Math.sin((i * Math.PI * 2) / 7) * 25}%`}
                            stroke="rgba(59, 130, 246, 0.6)"
                            strokeWidth="2"
                            className="animate-[logoConnectionSequential_6s_ease-in-out_infinite]"
                            style={{
                              animationDelay: `${logoWave * 6 + i}s`,
                            }}
                          />
                        </g>
                      ))}
                    </svg>
                  </div>
                </div>

                {/* Additional Icons on Hover */}
                <div
                  className={`absolute inset-0 z-15 transition-all duration-1000 ${
                    isHovering ? "opacity-100 scale-100" : "opacity-0 scale-90"
                  }`}
                >
                  <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                    {/* React Icon */}
                    {[...Array(1)].map((_, i) => (
                      <div
                        key={`react-hover-${i}`}
                        className="absolute w-12 h-12 animate-[hoverIconSpread_4s_ease-out_infinite]"
                        style={{
                          animationDelay: `0s`,
                        }}
                      >
                        <div className="w-full h-full bg-blue-600/90 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg animate-[hoverIconRotate_3s_ease-in-out_infinite]">
                          React
                        </div>
                      </div>
                    ))}

                    {/* JavaScript Icon */}
                    {[...Array(1)].map((_, i) => (
                      <div
                        key={`js-hover-${i}`}
                        className="absolute w-12 h-12 animate-[hoverIconSpread_4s_ease-out_infinite]"
                        style={{
                          animationDelay: `0.3s`,
                        }}
                      >
                        <div className="w-full h-full bg-yellow-600/90 rounded-lg flex items-center justify-center text-black font-bold text-xs shadow-lg animate-[hoverIconRotate_3s_ease-in-out_infinite]">
                          JS
                        </div>
                      </div>
                    ))}

                    {/* Node.js Icon */}
                    {[...Array(1)].map((_, i) => (
                      <div
                        key={`node-hover-${i}`}
                        className="absolute w-12 h-12 animate-[hoverIconSpread_4s_ease-out_infinite]"
                        style={{
                          animationDelay: `0.6s`,
                        }}
                      >
                        <div className="w-full h-full bg-green-700/90 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg animate-[hoverIconRotate_3s_ease-in-out_infinite]">
                          Node
                        </div>
                      </div>
                    ))}

                    {/* MongoDB Icon */}
                    {[...Array(1)].map((_, i) => (
                      <div
                        key={`mongo-hover-${i}`}
                        className="absolute w-12 h-12 animate-[hoverIconSpread_4s_ease-out_infinite]"
                        style={{
                          animationDelay: `0.9s`,
                        }}
                      >
                        <div className="w-full h-full bg-green-800/90 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg animate-[hoverIconRotate_3s_ease-in-out_infinite]">
                          Mongo
                        </div>
                      </div>
                    ))}

                    {/* Java Icon */}
                    {[...Array(1)].map((_, i) => (
                      <div
                        key={`java-hover-${i}`}
                        className="absolute w-12 h-12 animate-[hoverIconSpread_4s_ease-out_infinite]"
                        style={{
                          animationDelay: `1.2s`,
                        }}
                      >
                        <div className="w-full h-full bg-red-700/90 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg animate-[hoverIconRotate_3s_ease-in-out_infinite]">
                          Java
                        </div>
                      </div>
                    ))}

                    {/* Python Icon */}
                    {[...Array(1)].map((_, i) => (
                      <div
                        key={`python-hover-${i}`}
                        className="absolute w-12 h-12 animate-[hoverIconSpread_4s_ease-out_infinite]"
                        style={{
                          animationDelay: `1.5s`,
                        }}
                      >
                        <div className="w-full h-full bg-blue-800/90 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg animate-[hoverIconRotate_3s_ease-in-out_infinite]">
                          Python
                        </div>
                      </div>
                    ))}

                    {/* TypeScript Icon */}
                    {[...Array(1)].map((_, i) => (
                      <div
                        key={`ts-hover-${i}`}
                        className="absolute w-12 h-12 animate-[hoverIconSpread_4s_ease-out_infinite]"
                        style={{
                          animationDelay: `1.8s`,
                        }}
                      >
                        <div className="w-full h-full bg-blue-700/90 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg animate-[hoverIconRotate_3s_ease-in-out_infinite]">
                          TS
                        </div>
                      </div>
                    ))}

                    {/* Express Icon */}
                    {[...Array(1)].map((_, i) => (
                      <div
                        key={`express-hover-${i}`}
                        className="absolute w-12 h-12 animate-[hoverIconSpread_4s_ease-out_infinite]"
                        style={{
                          animationDelay: `2.1s`,
                        }}
                      >
                        <div className="w-full h-full bg-gray-800/90 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg animate-[hoverIconRotate_3s_ease-in-out_infinite]">
                          Express
                        </div>
                      </div>
                    ))}

                    {/* MySQL Icon */}
                    {[...Array(1)].map((_, i) => (
                      <div
                        key={`mysql-hover-${i}`}
                        className="absolute w-12 h-12 animate-[hoverIconSpread_4s_ease-out_infinite]"
                        style={{
                          animationDelay: `2.4s`,
                        }}
                      >
                        <div className="w-full h-full bg-orange-600/90 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg animate-[hoverIconRotate_3s_ease-in-out_infinite]">
                          MySQL
                        </div>
                      </div>
                    ))}

                    {/* Docker Icon */}
                    {[...Array(1)].map((_, i) => (
                      <div
                        key={`docker-hover-${i}`}
                        className="absolute w-12 h-12 animate-[hoverIconSpread_4s_ease-out_infinite]"
                        style={{
                          animationDelay: `2.7s`,
                        }}
                      >
                        <div className="w-full h-full bg-cyan-600/90 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg animate-[hoverIconRotate_3s_ease-in-out_infinite]">
                          Docker
                        </div>
                      </div>
                    ))}

                    {/* AWS Icon */}
                    {[...Array(1)].map((_, i) => (
                      <div
                        key={`aws-hover-${i}`}
                        className="absolute w-12 h-12 animate-[hoverIconSpread_4s_ease-out_infinite]"
                        style={{
                          animationDelay: `3s`,
                        }}
                      >
                        <div className="w-full h-full bg-orange-800/90 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg animate-[hoverIconRotate_3s_ease-in-out_infinite]">
                          AWS
                        </div>
                      </div>
                    ))}

                    {/* Redis Icon */}
                    {[...Array(1)].map((_, i) => (
                      <div
                        key={`redis-hover-${i}`}
                        className="absolute w-12 h-12 animate-[hoverIconSpread_4s_ease-out_infinite]"
                        style={{
                          animationDelay: `3.3s`,
                        }}
                      >
                        <div className="w-full h-full bg-red-600/90 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg animate-[hoverIconRotate_3s_ease-in-out_infinite]">
                          Redis
                        </div>
                      </div>
                    ))}

                    {/* Hover ripple effect */}
                    {[...Array(1)].map((_, i) => (
                      <div
                        key={`hover-ripple-${i}`}
                        className="absolute border-2 border-blue-400/40 rounded-full animate-[hoverRipple_4s_ease-out_infinite]"
                        style={{
                          width: "120px",
                          height: "120px",
                          marginLeft: "-60px",
                          marginTop: "-60px",
                          animationDelay: `0s`,
                        }}
                      ></div>
                    ))}

                    {/* Additional ripple waves */}
                    {[...Array(2)].map((_, i) => (
                      <div
                        key={`extra-ripple-${i}`}
                        className="absolute border border-purple-400/30 rounded-full animate-[hoverRipple_6s_ease-out_infinite]"
                        style={{
                          width: `${160 + i * 40}px`,
                          height: `${160 + i * 40}px`,
                          marginLeft: `-${80 + i * 20}px`,
                          marginTop: `-${80 + i * 20}px`,
                          animationDelay: `${i * 1}s`,
                        }}
                      ></div>
                    ))}
                  </div>

                  {/* Enhanced hover connection lines */}
                  <div className="absolute inset-0">
                    <svg
                      className="w-full h-full opacity-50"
                      viewBox="0 0 400 400"
                    >
                      {[...Array(12)].map((_, i) => (
                        <g key={`hover-constellation-${i}`}>
                          <line
                            x1="50%"
                            y1="50%"
                            x2={`${
                              50 + Math.cos((i * Math.PI * 2) / 12) * 35
                            }%`}
                            y2={`${
                              50 + Math.sin((i * Math.PI * 2) / 12) * 35
                            }%`}
                            stroke="rgba(99, 102, 241, 0.3)"
                            strokeWidth="2"
                            className="animate-[hoverConnection_4s_ease-in-out_infinite]"
                            style={{
                              animationDelay: `${i * 0.25}s`,
                            }}
                          />
                        </g>
                      ))}
                    </svg>
                  </div>

                  {/* Tech stack constellation */}
                  <div className="absolute inset-0">
                    <svg
                      className="w-full h-full opacity-30"
                      viewBox="0 0 400 400"
                    >
                      {/* Create interconnected lines between tech icons */}
                      <circle
                        cx="50%"
                        cy="30%"
                        r="2"
                        fill="rgba(59, 130, 246, 0.8)"
                        className="animate-pulse"
                      />
                      <circle
                        cx="70%"
                        cy="40%"
                        r="2"
                        fill="rgba(139, 92, 246, 0.8)"
                        className="animate-pulse"
                      />
                      <circle
                        cx="60%"
                        cy="60%"
                        r="2"
                        fill="rgba(34, 197, 94, 0.8)"
                        className="animate-pulse"
                      />
                      <circle
                        cx="40%"
                        cy="70%"
                        r="2"
                        fill="rgba(239, 68, 68, 0.8)"
                        className="animate-pulse"
                      />
                      <circle
                        cx="30%"
                        cy="50%"
                        r="2"
                        fill="rgba(245, 158, 11, 0.8)"
                        className="animate-pulse"
                      />

                      <line
                        x1="50%"
                        y1="30%"
                        x2="70%"
                        y2="40%"
                        stroke="rgba(59, 130, 246, 0.3)"
                        strokeWidth="1"
                        className="animate-[drawLine_8s_ease-in-out_infinite]"
                      />
                      <line
                        x1="70%"
                        y1="40%"
                        x2="60%"
                        y2="60%"
                        stroke="rgba(139, 92, 246, 0.3)"
                        strokeWidth="1"
                        className="animate-[drawLine_8s_ease-in-out_infinite]"
                        style={{ animationDelay: "1s" }}
                      />
                      <line
                        x1="60%"
                        y1="60%"
                        x2="40%"
                        y2="70%"
                        stroke="rgba(34, 197, 94, 0.3)"
                        strokeWidth="1"
                        className="animate-[drawLine_8s_ease-in-out_infinite]"
                        style={{ animationDelay: "2s" }}
                      />
                      <line
                        x1="40%"
                        y1="70%"
                        x2="30%"
                        y2="50%"
                        stroke="rgba(239, 68, 68, 0.3)"
                        strokeWidth="1"
                        className="animate-[drawLine_8s_ease-in-out_infinite]"
                        style={{ animationDelay: "3s" }}
                      />
                      <line
                        x1="30%"
                        y1="50%"
                        x2="50%"
                        y2="30%"
                        stroke="rgba(245, 158, 11, 0.3)"
                        strokeWidth="1"
                        className="animate-[drawLine_8s_ease-in-out_infinite]"
                        style={{ animationDelay: "4s" }}
                      />
                    </svg>
                  </div>
                </div>

                {/* Crowd Spreading Animation */}
                <div className="absolute inset-0 z-10">
                  {/* Central cluster point */}
                  <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                    {/* Wave 1 - Inner crowd */}
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={`wave1-${i}`}
                        className="absolute w-2 h-2 rounded-full animate-[crowdSpread1_6s_ease-out_infinite]"
                        style={{
                          animationDelay: `${i * 0.2 + crowdWave * 6}s`,
                        }}
                      >
                        <div
                          className={`w-full h-full rounded-full ${
                            i % 4 === 0
                              ? "bg-blue-400/60"
                              : i % 4 === 1
                              ? "bg-purple-400/60"
                              : i % 4 === 2
                              ? "bg-cyan-400/60"
                              : "bg-pink-400/60"
                          } animate-[crowdPulse_2s_ease-in-out_infinite]`}
                          style={{
                            animationDelay: `${i * 0.3}s`,
                          }}
                        ></div>
                      </div>
                    ))}

                    {/* Wave 2 - Middle crowd */}
                    {[...Array(16)].map((_, i) => (
                      <div
                        key={`wave2-${i}`}
                        className="absolute w-1.5 h-1.5 rounded-full animate-[crowdSpread2_7s_ease-out_infinite]"
                        style={{
                          animationDelay: `${i * 0.15 + crowdWave * 6 + 1}s`,
                        }}
                      >
                        <div
                          className={`w-full h-full rounded-full ${
                            i % 5 === 0
                              ? "bg-indigo-400/50"
                              : i % 5 === 1
                              ? "bg-violet-400/50"
                              : i % 5 === 2
                              ? "bg-emerald-400/50"
                              : i % 5 === 3
                              ? "bg-orange-400/50"
                              : "bg-teal-400/50"
                          } animate-[crowdPulse_2.5s_ease-in-out_infinite]`}
                          style={{
                            animationDelay: `${i * 0.25}s`,
                          }}
                        ></div>
                      </div>
                    ))}

                    {/* Wave 3 - Outer crowd */}
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={`wave3-${i}`}
                        className="absolute w-1 h-1 rounded-full animate-[crowdSpread3_8s_ease-out_infinite]"
                        style={{
                          animationDelay: `${i * 0.1 + crowdWave * 6 + 2}s`,
                        }}
                      >
                        <div
                          className={`w-full h-full rounded-full ${
                            i % 6 === 0
                              ? "bg-rose-400/40"
                              : i % 6 === 1
                              ? "bg-amber-400/40"
                              : i % 6 === 2
                              ? "bg-lime-400/40"
                              : i % 6 === 3
                              ? "bg-sky-400/40"
                              : i % 6 === 4
                              ? "bg-fuchsia-400/40"
                              : "bg-emerald-400/40"
                          } animate-[crowdPulse_3s_ease-in-out_infinite]`}
                          style={{
                            animationDelay: `${i * 0.2}s`,
                          }}
                        ></div>
                      </div>
                    ))}

                    {/* Ripple effect */}
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={`ripple-${i}`}
                        className="absolute border border-white/10 rounded-full animate-[crowdRipple_4s_ease-out_infinite]"
                        style={{
                          width: `${40 + i * 60}px`,
                          height: `${40 + i * 60}px`,
                          marginLeft: `-${20 + i * 30}px`,
                          marginTop: `-${20 + i * 30}px`,
                          animationDelay: `${i * 0.8 + crowdWave * 4}s`,
                        }}
                      ></div>
                    ))}
                  </div>

                  {/* Directional spreads */}
                  <div className="absolute inset-0">
                    {/* Horizontal spreads */}
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={`horizontal-${i}`}
                        className="absolute w-1 h-1 rounded-full animate-[horizontalSpread_5s_ease-out_infinite]"
                        style={{
                          top: `${20 + i * 10}%`,
                          left: "50%",
                          animationDelay: `${i * 0.3 + crowdWave * 5}s`,
                        }}
                      >
                        <div className="w-full h-full rounded-full bg-blue-300/50 animate-pulse"></div>
                      </div>
                    ))}

                    {/* Vertical spreads */}
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={`vertical-${i}`}
                        className="absolute w-1 h-1 rounded-full animate-[verticalSpread_5s_ease-out_infinite]"
                        style={{
                          left: `${20 + i * 10}%`,
                          top: "50%",
                          animationDelay: `${i * 0.3 + crowdWave * 5 + 1}s`,
                        }}
                      >
                        <div className="w-full h-full rounded-full bg-purple-300/50 animate-pulse"></div>
                      </div>
                    ))}

                    {/* Diagonal spreads */}
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={`diagonal-${i}`}
                        className="absolute w-1 h-1 rounded-full animate-[diagonalSpread_6s_ease-out_infinite]"
                        style={{
                          top: "50%",
                          left: "50%",
                          animationDelay: `${i * 0.4 + crowdWave * 6 + 1.5}s`,
                          transform: `rotate(${i * 60}deg)`,
                        }}
                      >
                        <div className="w-full h-full rounded-full bg-cyan-300/50 animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Black Hole Animation - Now triggered by hover */}
                <div
                  className={`absolute inset-0 z-20 transition-all duration-1000 ${
                    isHovering ? "opacity-100 scale-100" : "opacity-0 scale-90"
                  }`}
                >
                  {/* Event Horizon */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-black rounded-full shadow-2xl animate-[blackHoleCore_8s_ease-in-out_infinite]">
                    <div className="absolute inset-0 bg-black rounded-full shadow-[0_0_40px_rgba(0,0,0,0.9)]"></div>
                  </div>

                  {/* Accretion Disk */}
                  <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute border-2 rounded-full animate-[accretionDisk_3s_linear_infinite]"
                        style={{
                          width: `${60 + i * 25}px`,
                          height: `${60 + i * 25}px`,
                          marginLeft: `-${30 + i * 12.5}px`,
                          marginTop: `-${30 + i * 12.5}px`,
                          borderColor: `rgba(${255 - i * 40}, ${
                            120 + i * 30
                          }, ${50 + i * 50}, ${0.7 - i * 0.15})`,
                          animationDelay: `${i * 0.5}s`,
                          animationDirection:
                            i % 2 === 0 ? "normal" : "reverse",
                        }}
                      ></div>
                    ))}
                  </div>

                  {/* Matter Being Absorbed */}
                  <div className="absolute inset-0">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full animate-[matterAbsorption_4s_ease-in_infinite]"
                        style={{
                          left: `${30 + Math.cos((i * Math.PI * 2) / 8) * 30}%`,
                          top: `${30 + Math.sin((i * Math.PI * 2) / 8) * 30}%`,
                          animationDelay: `${i * 0.5}s`,
                        }}
                      >
                        <div
                          className={`w-full h-full rounded-full ${
                            i % 3 === 0
                              ? "bg-orange-400"
                              : i % 3 === 1
                              ? "bg-red-400"
                              : "bg-yellow-400"
                          }`}
                        ></div>
                      </div>
                    ))}
                  </div>

                  {/* Gravitational Distortion Rings */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-orange-400/20 rounded-full animate-[gravitationalLens_6s_ease-in-out_infinite]"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 border border-red-400/15 rounded-full animate-[gravitationalLens_8s_ease-in-out_infinite_reverse]"></div>
                </div>

                {/* Starfield Background */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(50)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-[1px] h-[1px] bg-white rounded-full transition-all duration-1000 ${
                        isHovering
                          ? "animate-[starAbsorption_4s_ease-in_infinite]"
                          : ""
                      }`}
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.8 + 0.2,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${Math.random() * 2 + 2}s`,
                      }}
                    >
                      <div className="w-full h-full bg-gradient-to-r from-blue-200 to-purple-200 rounded-full animate-[twinkle_3s_ease-in-out_infinite]"></div>
                    </div>
                  ))}
                </div>

                {/* Main animated container */}
                <div
                  className={`relative flex items-center justify-center w-full h-full transition-all duration-1000 ${
                    isHovering ? "opacity-40 scale-95" : "opacity-100 scale-100"
                  }`}
                >
                  {/* Central core with magnetic field effect */}
                  <div
                    className={`relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 transition-all duration-700 ${
                      isHovering ? "scale-110" : "scale-100"
                    } ${
                      isHovering
                        ? "animate-[gravityPull_8s_ease-in-out_infinite]"
                        : ""
                    }`}
                    style={{
                      transform: `scale(${isHovering ? 1.1 : 1}) translate(${
                        mousePosition.x * (isHovering ? 10 : 0)
                      }px, ${mousePosition.y * (isHovering ? 10 : 0)}px)`,
                    }}
                  >
                    {/* Energy core layers */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full blur-3xl opacity-20 animate-[pulse_4s_ease-in-out_infinite]"></div>
                    <div className="absolute inset-1 bg-gradient-to-r from-[#4f46e5] to-[#9333ea] rounded-full blur-2xl opacity-40 animate-[spin_20s_linear_infinite]"></div>
                    <div className="absolute inset-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full blur-xl opacity-60 animate-[reverseSpin_15s_linear_infinite]"></div>
                    <div className="absolute inset-5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full opacity-80"></div>
                    <div className="absolute inset-7 bg-gradient-to-r from-white to-blue-100 rounded-full opacity-80 animate-[pulse_3s_ease-in-out_infinite]"></div>

                    {/* Inner energy pulse */}
                    <div className="absolute inset-9 bg-gradient-to-r from-cyan-200 to-blue-200 rounded-full opacity-90 animate-[energyPulse_2s_ease-in-out_infinite]"></div>
                  </div>

                  {/* Magnetic field lines */}
                  <div
                    className={`absolute inset-0 transition-all duration-1000 ${
                      isHovering
                        ? "opacity-70 scale-105"
                        : "opacity-30 scale-100"
                    }`}
                  >
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute top-1/2 left-1/2 border border-blue-300/20 rounded-full animate-[magneticField_8s_ease-in-out_infinite]"
                        style={{
                          width: `${120 + i * 40}px`,
                          height: `${120 + i * 40}px`,
                          marginLeft: `-${60 + i * 20}px`,
                          marginTop: `-${60 + i * 20}px`,
                          animationDelay: `${i * 0.5}s`,
                          transform: `rotate(${i * 30}deg)`,
                        }}
                      ></div>
                    ))}
                  </div>

                  {/* Orbiting asteroids with gravity effect */}
                  <div
                    className={`absolute inset-0 animate-[spin_30s_linear_infinite] ${
                      isHovering
                        ? "animate-[gravitationalSpin_10s_ease-in-out_infinite]"
                        : ""
                    }`}
                  >
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className={`absolute w-2 h-2 rounded-full animate-[float_3s_ease-in-out_infinite] ${
                          isHovering
                            ? "animate-[orbitDecay_8s_ease-in_infinite]"
                            : ""
                        }`}
                        style={{
                          left: `${25 + Math.cos((i * Math.PI * 2) / 8) * 35}%`,
                          top: `${25 + Math.sin((i * Math.PI * 2) / 8) * 35}%`,
                          animationDelay: `${i * 0.4}s`,
                        }}
                      >
                        <div
                          className={`w-full h-full rounded-full blur-sm animate-pulse ${
                            i % 4 === 0
                              ? "bg-blue-400"
                              : i % 4 === 1
                              ? "bg-purple-400"
                              : i % 4 === 2
                              ? "bg-cyan-400"
                              : "bg-pink-400"
                          }`}
                        ></div>

                        {/* Particle trail */}
                        <div
                          className="absolute w-8 h-[1px] bg-gradient-to-r from-transparent via-current to-transparent opacity-50"
                          style={{
                            left: "-16px",
                            top: "50%",
                            transform: `rotate(${i * 45}deg)`,
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>

                  {/* Secondary orbit ring */}
                  <div className="absolute inset-0 animate-[reverseSpin_25s_linear_infinite]">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-3 h-3 rounded-full animate-[float_4s_ease-in-out_infinite]"
                        style={{
                          left: `${15 + Math.cos((i * Math.PI * 2) / 6) * 45}%`,
                          top: `${15 + Math.sin((i * Math.PI * 2) / 6) * 45}%`,
                          animationDelay: `${i * 0.6}s`,
                        }}
                      >
                        <div
                          className={`w-full h-full rounded-full blur-sm animate-[energyPulse_2s_ease-in-out_infinite] ${
                            i % 3 === 0
                              ? "bg-violet-400"
                              : i % 3 === 1
                              ? "bg-indigo-400"
                              : "bg-emerald-400"
                          }`}
                        ></div>
                      </div>
                    ))}
                  </div>

                  {/* Dynamic constellation lines */}
                  <div
                    className={`absolute inset-0 transition-all duration-1000 ${
                      isHovering ? "opacity-60" : "opacity-20"
                    }`}
                  >
                    <svg className="w-full h-full" viewBox="0 0 400 400">
                      {[...Array(5)].map((_, i) => (
                        <line
                          key={i}
                          x1={`${20 + i * 15}%`}
                          y1={`${30 + i * 10}%`}
                          x2={`${60 + i * 8}%`}
                          y2={`${50 + i * 12}%`}
                          stroke="rgba(99, 102, 241, 0.3)"
                          strokeWidth="1"
                          className="animate-[drawLine_4s_ease-in-out_infinite]"
                          style={{ animationDelay: `${i * 0.8}s` }}
                        />
                      ))}
                    </svg>
                  </div>

                  {/* Enhanced floating particles with physics */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 3}s`,
                        }}
                      >
                        <div
                          className={`w-full h-full rounded-full animate-[particleFloat_${
                            3 + Math.random() * 2
                          }s_ease-in-out_infinite] ${
                            i % 5 === 0
                              ? "bg-blue-300"
                              : i % 5 === 1
                              ? "bg-purple-300"
                              : i % 5 === 2
                              ? "bg-cyan-300"
                              : i % 5 === 3
                              ? "bg-pink-300"
                              : "bg-indigo-300"
                          }`}
                          style={{
                            filter: "blur(0.5px)",
                            opacity: 0.6 + Math.random() * 0.4,
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>

                  {/* Energy rings with better physics */}
                  <div
                    className={`absolute inset-0 transition-all duration-1000 ${
                      isHovering ? "scale-110 rotate-12" : "scale-100 rotate-0"
                    }`}
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-blue-400/20 rounded-full animate-[energyRing_40s_linear_infinite]"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-purple-400/20 rounded-full animate-[energyRing_35s_linear_infinite_reverse]"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-indigo-400/10 rounded-full animate-[energyRing_50s_linear_infinite]"></div>
                  </div>

                  {/* Enhanced background effects */}
                  <div
                    className={`absolute inset-0 pointer-events-none transition-all duration-1000 ${
                      isHovering ? "opacity-80" : "opacity-40"
                    }`}
                  >
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-[nebulaFloat_8s_ease-in-out_infinite]"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-[nebulaFloat_10s_ease-in-out_infinite_reverse]"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 blur-3xl animate-[cosmicPulse_12s_ease-in-out_infinite]"></div>
                    <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl animate-[nebulaFloat_6s_ease-in-out_infinite]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blackHoleCore {
          0%,
          100% {
            transform: scale(1);
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
          }
          50% {
            transform: scale(1.1);
            box-shadow: 0 0 40px rgba(0, 0, 0, 1);
          }
        }
        @keyframes accretionDisk {
          0% {
            transform: rotate(0deg) scaleY(0.3);
            opacity: 0.6;
          }
          50% {
            transform: rotate(180deg) scaleY(0.2);
            opacity: 1;
          }
          100% {
            transform: rotate(360deg) scaleY(0.3);
            opacity: 0.6;
          }
        }
        @keyframes matterAbsorption {
          0% {
            transform: scale(1) translateX(0) translateY(0);
            opacity: 1;
          }
          80% {
            transform: scale(0.5) translateX(-25px) translateY(-25px);
            opacity: 0.7;
          }
          100% {
            transform: scale(0) translateX(-50px) translateY(-50px);
            opacity: 0;
          }
        }
        @keyframes gravitationalLens {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.1) rotate(180deg);
            opacity: 0.4;
          }
        }
        @keyframes starAbsorption {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          80% {
            transform: scale(0.3) translateX(-50px) translateY(-50px);
            opacity: 0.5;
          }
          100% {
            transform: scale(0) translateX(-100px) translateY(-100px);
            opacity: 0;
          }
        }
        @keyframes gravityPull {
          0%,
          100% {
            transform: scale(1) translateX(0) translateY(0);
          }
          50% {
            transform: scale(0.95) translateX(-5px) translateY(-5px);
          }
        }
        @keyframes gravitationalSpin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(720deg);
          }
        }
        @keyframes orbitDecay {
          0% {
            transform: translateX(0) translateY(0) scale(1);
          }
          100% {
            transform: translateX(-30px) translateY(-30px) scale(0.5);
          }
        }
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-8px) translateX(4px);
          }
          50% {
            transform: translateY(-4px) translateX(-2px);
          }
          75% {
            transform: translateY(-12px) translateX(6px);
          }
        }
        @keyframes energyPulse {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.1) rotate(180deg);
            opacity: 1;
          }
        }
        @keyframes magneticField {
          0%,
          100% {
            transform: rotate(0deg) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: rotate(180deg) scale(1.05);
            opacity: 0.6;
          }
        }
        @keyframes reverseSpin {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        @keyframes particleFloat {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          25% {
            transform: translateY(-15px) translateX(8px) scale(1.1);
          }
          50% {
            transform: translateY(-8px) translateX(-5px) scale(0.9);
          }
          75% {
            transform: translateY(-20px) translateX(12px) scale(1.05);
          }
        }
        @keyframes energyRing {
          0% {
            transform: rotate(0deg) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: rotate(180deg) scale(1.02);
            opacity: 0.4;
          }
          100% {
            transform: rotate(360deg) scale(1);
            opacity: 0.2;
          }
        }
        @keyframes nebulaFloat {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) translateX(15px) rotate(120deg);
          }
          66% {
            transform: translateY(10px) translateX(-10px) rotate(240deg);
          }
        }
        @keyframes cosmicPulse {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 0.1;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1) rotate(180deg);
            opacity: 0.3;
          }
        }
        @keyframes drawLine {
          0% {
            stroke-dasharray: 0 100;
            opacity: 0;
          }
          50% {
            stroke-dasharray: 50 50;
            opacity: 0.6;
          }
          100% {
            stroke-dasharray: 100 0;
            opacity: 0;
          }
        }
        @keyframes crowdSpread1 {
          0% {
            transform: translate(0, 0) scale(0);
            opacity: 0;
          }
          10% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(
                ${Math.cos(Math.PI * 2 * Math.random()) * 120}px,
                ${Math.sin(Math.PI * 2 * Math.random()) * 120}px
              )
              scale(0.3);
            opacity: 0;
          }
        }
        @keyframes crowdSpread2 {
          0% {
            transform: translate(0, 0) scale(0);
            opacity: 0;
          }
          15% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(
                ${Math.cos(Math.PI * 2 * Math.random()) * 160}px,
                ${Math.sin(Math.PI * 2 * Math.random()) * 160}px
              )
              scale(0.2);
            opacity: 0;
          }
        }
        @keyframes crowdSpread3 {
          0% {
            transform: translate(0, 0) scale(0);
            opacity: 0;
          }
          20% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(
                ${Math.cos(Math.PI * 2 * Math.random()) * 200}px,
                ${Math.sin(Math.PI * 2 * Math.random()) * 200}px
              )
              scale(0.1);
            opacity: 0;
          }
        }
        @keyframes crowdPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
        }
        @keyframes crowdRipple {
          0% {
            transform: scale(0);
            opacity: 0.8;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            transform: scale(3);
            opacity: 0;
          }
        }
        @keyframes horizontalSpread {
          0% {
            transform: translateX(0) scale(0);
            opacity: 0;
          }
          20% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateX(150px) scale(0.2);
            opacity: 0;
          }
        }
        @keyframes verticalSpread {
          0% {
            transform: translateY(0) scale(0);
            opacity: 0;
          }
          20% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(150px) scale(0.2);
            opacity: 0;
          }
        }
        @keyframes diagonalSpread {
          0% {
            transform: translateY(0) scale(0);
            opacity: 0;
          }
          25% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(200px) scale(0.1);
            opacity: 0;
          }
        }
        @keyframes logoSpread {
          0% {
            transform: translate(0, 0) scale(0) rotate(0deg);
            opacity: 0;
          }
          15% {
            transform: translate(0, 0) scale(1) rotate(90deg);
            opacity: 1;
          }

          85% {
            transform: translate(
                ${Math.cos(Math.PI * 2 * Math.random()) * 180}px,
                ${Math.sin(Math.PI * 2 * Math.random()) * 180}px
              )
              scale(0.8) rotate(360deg);
            opacity: 0.8;
          }
          100% {
            transform: translate(
                ${Math.cos(Math.PI * 2 * Math.random()) * 220}px,
                ${Math.sin(Math.PI * 2 * Math.random()) * 220}px
              )
              scale(0.3) rotate(450deg);
            opacity: 0;
          }
        }
        @keyframes logoRotate {
          0%,
          100% {
            transform: rotate(0deg) scale(1);
          }
          25% {
            transform: rotate(90deg) scale(1.1);
          }
          50% {
            transform: rotate(180deg) scale(1);
          }
          75% {
            transform: rotate(270deg) scale(1.1);
          }
        }
        @keyframes logoRipple {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0.8;
            border-width: 3px;
          }
          50% {
            opacity: 0.4;
            border-width: 2px;
          }
          100% {
            transform: scale(2.5) rotate(180deg);
            opacity: 0;
            border-width: 1px;
          }
        }
        @keyframes logoConnection {
          0%,
          100% {
            stroke-dasharray: 0 100;
            opacity: 0;
          }
          50% {
            stroke-dasharray: 50 50;
            opacity: 0.6;
          }
        }
        @keyframes logoSpreadSequential {
          0% {
            transform: translate(0, 0) scale(0) rotate(0deg);
            opacity: 0;
          }
          20% {
            transform: translate(0, 0) scale(1.2) rotate(180deg);
            opacity: 1;
          }
          40% {
            transform: translate(
                ${Math.cos(Math.PI * 0.5) * 100}px,
                ${Math.sin(Math.PI * 0.5) * 100}px
              )
              scale(1) rotate(270deg);
            opacity: 0.9;
          }
          60% {
            transform: translate(
                ${Math.cos(Math.PI * 1) * 150}px,
                ${Math.sin(Math.PI * 1) * 150}px
              )
              scale(0.8) rotate(360deg);
            opacity: 0.7;
          }
          80% {
            transform: translate(
                ${Math.cos(Math.PI * 1.5) * 180}px,
                ${Math.sin(Math.PI * 1.5) * 180}px
              )
              scale(0.6) rotate(450deg);
            opacity: 0.4;
          }
          100% {
            transform: translate(
                ${Math.cos(Math.PI * 2) * 220}px,
                ${Math.sin(Math.PI * 2) * 220}px
              )
              scale(0.3) rotate(540deg);
            opacity: 0;
          }
        }
        @keyframes logoRippleSequential {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0.8;
            border-width: 3px;
          }
          30% {
            transform: scale(1) rotate(90deg);
            opacity: 0.6;
            border-width: 2px;
          }
          60% {
            transform: scale(2) rotate(180deg);
            opacity: 0.3;
            border-width: 1px;
          }
          100% {
            transform: scale(3) rotate(360deg);
            opacity: 0;
            border-width: 1px;
          }
        }
        @keyframes logoConnectionSequential {
          0%,
          100% {
            stroke-dasharray: 0 100;
            opacity: 0;
          }
          30% {
            stroke-dasharray: 30 70;
            opacity: 0.8;
          }
          60% {
            stroke-dasharray: 70 30;
            opacity: 0.6;
          }
          80% {
            stroke-dasharray: 100 0;
            opacity: 0.3;
          }
        }
        @keyframes hoverIconSpread {
          0% {
            transform: translate(0, 0) scale(0) rotate(0deg);
            opacity: 0;
          }
          25% {
            transform: translate(0, 0) scale(1.1) rotate(90deg);
            opacity: 1;
          }
          50% {
            transform: translate(0, 0) scale(1) rotate(180deg);
            opacity: 0.9;
          }
          75% {
            transform: translate(0, 0) scale(0.8) rotate(270deg);
            opacity: 0.7;
          }
          100% {
            transform: translate(0, 0) scale(0.5) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes hoverIconRotate {
          0%,
          100% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.05);
          }
        }
        @keyframes hoverRipple {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0.6;
            border-width: 3px;
          }
          50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 0.3;
            border-width: 2px;
          }
          100% {
            transform: scale(2.5) rotate(360deg);
            opacity: 0;
            border-width: 1px;
          }
        }
        @keyframes hoverConnection {
          0%,
          100% {
            stroke-dasharray: 0 100;
            opacity: 0;
          }
          50% {
            stroke-dasharray: 50 50;
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

export default memo(Home);
