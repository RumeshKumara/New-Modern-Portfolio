import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id }) => {
  // Handle kasus ketika ProjectLink kosong
  const handleLiveDemo = (e) => {
    if (!ProjectLink) {
      console.log("ProjectLink kosong");
      e.preventDefault();
      alert("Live demo link is not available");
    }
  };

  const handleDetails = (e) => {
    if (!id) {
      console.log("ID kosong");
      e.preventDefault();
      alert("Project details are not available");
    }
  };

  return (
    <div className="relative w-full group">
      <div className="relative overflow-hidden transition-all duration-300 border shadow-2xl rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg border-white/10 hover:shadow-purple-500/20">
        <div className="absolute inset-0 transition-opacity duration-300 opacity-50 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 group-hover:opacity-70"></div>

        <div className="relative z-10 p-5">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={Img}
              alt={Title}
              className="object-cover w-full h-full transition-transform duration-500 transform group-hover:scale-105"
            />
          </div>

          <div className="mt-4 space-y-3">
            <h3 className="text-xl font-semibold text-transparent bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text">
              {Title}
            </h3>

            <p className="text-sm leading-relaxed text-gray-300/80 line-clamp-2">
              {Description}
            </p>

            <div className="flex items-center justify-between pt-4">
              {ProjectLink ? (
                <a
                  href={ProjectLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLiveDemo}
                  className="inline-flex items-center space-x-2 text-blue-400 transition-colors duration-200 hover:text-blue-300"
                >
                  <span className="text-sm font-medium">Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <span className="text-sm text-gray-500">
                  Demo Not Available
                </span>
              )}

              {id ? (
                <Link
                  to={`/project/${id}`}
                  onClick={handleDetails}
                  className="inline-flex items-center px-4 py-2 space-x-2 transition-all duration-200 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  <span className="text-sm font-medium">Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="text-sm text-gray-500">
                  Details Not Available
                </span>
              )}
            </div>
          </div>

          <div className="absolute inset-0 transition-colors duration-300 border border-white/0 group-hover:border-purple-500/50 rounded-xl -z-50"></div>
        </div>
      </div>
    </div>
  );
};

export default CardProject;
