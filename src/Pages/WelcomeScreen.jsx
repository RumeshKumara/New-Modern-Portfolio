import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Github, Globe, User } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const TypewriterEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 260);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 blur-3xl animate-pulse" />
    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/10 via-transparent to-purple-600/10 blur-2xl animate-float" />
  </div>
);

const IconButton = ({ Icon }) => (
  <div className="relative transition-transform duration-300 group hover:scale-110">
    <div className="absolute transition duration-300 rounded-full -inset-2 bg-gradient-to-r from-indigo-600 to-purple-600 blur opacity-30 group-hover:opacity-75" />
    <div className="relative p-2 border rounded-full sm:p-3 bg-black/50 backdrop-blur-sm border-white/10">
      <Icon className="w-5 h-5 text-white sm:w-6 sm:h-6 md:w-8 md:h-8" />
    </div>
  </div>
);

const WelcomeScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: false,
    });

    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        onLoadingComplete?.();
      }, 1000);
    }, 4000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 1.1,
      filter: "blur(10px)",
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-[#030014]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit="exit"
          variants={containerVariants}
        >
          <BackgroundEffect />

          <div className="relative flex items-center justify-center min-h-screen px-4">
            <div className="w-full max-w-4xl mx-auto">
              {/* Icons */}
              <motion.div
                className="flex justify-center gap-3 mb-6 sm:gap-4 md:gap-8 sm:mb-8 md:mb-12"
                variants={childVariants}
              >
                {[Code2, User, Github].map((Icon, index) => (
                  <div
                    key={index}
                    data-aos="fade-down"
                    data-aos-delay={index * 200}
                  >
                    <IconButton Icon={Icon} />
                  </div>
                ))}
              </motion.div>

              {/* Welcome Text */}
              <motion.div
                className="mb-6 text-center sm:mb-8 md:mb-12"
                variants={childVariants}
              >
                <h1 className="space-y-2 text-3xl font-bold sm:text-4xl md:text-6xl sm:space-y-4">
                  <div className="mb-2 sm:mb-4">
                    <span
                      data-aos="fade-right"
                      data-aos-delay="200"
                      className="inline-block px-2 text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text"
                    >
                      Welcome
                    </span>{" "}
                    <span
                      data-aos="fade-right"
                      data-aos-delay="400"
                      className="inline-block px-2 text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text"
                    >
                      To
                    </span>{" "}
                    <span
                      data-aos="fade-right"
                      data-aos-delay="600"
                      className="inline-block px-2 text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text"
                    >
                      My
                    </span>
                  </div>
                  <div>
                    <span
                      data-aos="fade-up"
                      data-aos-delay="800"
                      className="inline-block px-2 text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text"
                    >
                      Portfolio
                    </span>{" "}
                    <span
                      data-aos="fade-up"
                      data-aos-delay="1000"
                      className="inline-block px-2 text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text"
                    >
                      Website
                    </span>
                  </div>
                </h1>
              </motion.div>

              {/* Website Link */}
              <motion.div
                className="text-center"
                variants={childVariants}
                data-aos="fade-up"
                data-aos-delay="1200"
              >
                <a
                  href="https://www.rumesh.me"
                  className="relative inline-flex items-center gap-2 px-4 py-2 transition-transform duration-300 rounded-full sm:px-6 sm:py-3 group hover:scale-105"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="absolute inset-0 transition-all duration-300 rounded-full bg-gradient-to-r from-indigo-600/20 to-purple-600/20 blur-md group-hover:blur-lg" />
                  <div className="relative flex items-center gap-2 text-lg sm:text-xl md:text-2xl">
                    <Globe className="w-4 h-4 text-indigo-600 sm:w-5 sm:h-5" />
                    <span className="text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text">
                      <TypewriterEffect text="www.rumesh.me" />
                    </span>
                  </div>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
